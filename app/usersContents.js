import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

const UserContents = () => {

  const [items, setItems] = useState([]);
  const [contentsData, setContentsData] = useState(null);
  const [contentsId, setContentsId] = useState(null);
  const [contentsUserId, setContentsUserId] = useState(null);
  const [contentsUserName, setContentsUserName] = useState(null);
  const [contentsSelectId, setContentsSelectId] = useState(null);
  const [loginId, setLoginId] = useState(null);
  // フォロー状態を管理する state
  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({
    mode: "text",
    textColor: '#FFFFFF',
    buttonColor: "transparent",
    contentStyle: { width: 90 },
    labelStyle: { fontSize: 14, fontWeight: '400', lineHeight: 14 },
  });
  // マイリスト状態を管理する state
  const [isMylisting, setIsMylisting] = useState(false);
  const [buttonStyle2, setButtonStyle2] = useState({
    mode: "text",
    textColor: '#FFFFFF',
    buttonColor: "transparent",
    // contentStyle: { paddingLeft: 10, paddingRight: 10 },
    labelStyle: { fontSize: 14, fontWeight: '400', lineHeight: 14 },
  });

  useEffect(() => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id FROM login WHERE flg = 1;',
        [],
        (_, result) => {
          const loginId = result.rows._array;
          const loginId_2 = loginId[0].id;
          setLoginId(loginId_2);
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      tx.executeSql(
        'SELECT id FROM contentsSelect WHERE flg = 1;',
        [],
        (_, result) => {
          const items = result.rows._array;
          setItems(items);
          if (items.length > 0) {
            const contentsSelectId = items[0].id;
            setContentsSelectId(contentsSelectId);

            tx.executeSql(
              'SELECT id, user_id, thumbnail, title, count, good FROM contents WHERE id = ?',
              [contentsSelectId],
              (_, { rows }) => {
                const contentsData = rows.item(0);
                setContentsData(contentsData);
                setContentsUserId(contentsData.id);
                setContentsUserId(contentsData.user_id)

                tx.executeSql(
                  'SELECT user_name FROM user WHERE id = ?',
                  [contentsData.user_id],
                  (_, { rows }) => {
                    const userName = rows.item(0).user_name;
                    setContentsUserName(userName);
                  },
                  (tx, error) => {
                    console.error(error);
                  }
                );

                // フォロー状態を確認して setIsFollowing を更新
                tx.executeSql(
                  'SELECT * FROM follow WHERE login_id = ? AND contents_id = ?;',
                  [loginId, contentsSelectId],
                  (_, followResult) => {
                    const isFollowing = followResult.rows.length > 0;
                    setIsFollowing(isFollowing);
                  },
                  (_, error) => {
                    console.log('Error...', error);
                  }
                );

                // マイリスト状態を確認して setIsMylisting を更新
                tx.executeSql(
                  'SELECT * FROM mylist WHERE login_id = ? AND contents_id = ?;',
                  [loginId, contentsSelectId],
                  (_, mylistResult) => {
                    const isMylisting = mylistResult.rows.length > 0;
                    setIsMylisting(isMylisting);
                  },
                  (_, error) => {
                    console.log('Error...', error);
                  }
                );
              },
              (tx, error) => {
                console.error(error);
              }
            );
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );
    });
  }, [loginId]); // loginId が変更されたときに再実行

  useEffect(() => {
    // フォロー状態に応じてボタンのスタイルを変更
    if (isFollowing) {
      setButtonStyle({
        mode: "text",
        textColor: '#000000',
        buttonColor: "#FFFFFF",
        contentStyle: { width: 90 },
        labelStyle: { fontSize: 14, fontWeight: 'bold', lineHeight: 14 },
      });
    } else {
      setButtonStyle({
        mode: "text",
        textColor: '#FFFFFF',
        buttonColor: "transparent",
        contentStyle: { width: 90 },
        labelStyle: { fontSize: 14, fontWeight: '400', lineHeight: 14 },
      });
    }
  }, [isFollowing]); // isFollowing が変更されたときに再実行

  useEffect(() => {
    // フォロー状態に応じてボタンのスタイルを変更
    if (isMylisting) {
      setButtonStyle2({
        mode: "text",
        textColor: '#000000',
        buttonColor: "#FFFFFF",
        contentStyle: { width: 300 },
        labelStyle: { fontSize: 14, fontWeight: 'bold', lineHeight: 14 },
      });
    } else {
      setButtonStyle2({
        mode: "text",
        textColor: '#FFFFFF',
        buttonColor: "transparent",
        contentStyle: { width: 300 },
        labelStyle: { fontSize: 14, fontWeight: '400', lineHeight: 14 },
      });
    }
  }, [isMylisting]); // isMylisting が変更されたときに再実行

  const navigation = useNavigation();
  const handleOpenOtherApp = () => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE contents SET count = count + 1 WHERE id = ?;',
        [contentsSelectId],
        (_, result) => {
          console.log('Update success!');
        },
        (_, error) => {
          console.log('Update error: ', error);
        }
      );
    });
    navigation.navigate('contentsLoading');
  };

  const fetchData = async () => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT id, user_id, thumbnail, title, count, good FROM contents WHERE id = ?',
        [contentsSelectId],
        (_, { rows }) => {
          const contentsData = rows.item(0);
          setContentsData(rows.item(0));
        },
        (_, error) => {
          console.log('Error...');
        }
      );
    });
  };

  const handleScroll = async (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // ここで必要なスクロール位置や条件を確認して、リフレッシュのトリガーを設定

    // 例: スクロールが最上部に達したらリフレッシュ
    if (offsetY <= -75) {
      await fetchData();
    }
  };

  if (!contentsData) {
    return null;
  }

  let contentsImageSource = '';
  // loginIdに基づいてプロファイル画像のソースを選択
  switch (contentsSelectId) {
    case 1:
      contentsImageSource = require('../image/contents/thumbnail_1.webp');
      profileImageSource = require('../image/profile/profileImage_1.webp');
      break;
    case 2:
      contentsImageSource = require('../image/contents/thumbnail_2.webp');
      profileImageSource = require('../image/profile/profileImage_2.webp');
      break;
    case 3:
      contentsImageSource = require('../image/contents/thumbnail_3.webp');
      profileImageSource = require('../image/profile/profileImage_3.webp');
      break;
    case 4:
      contentsImageSource = require('../image/contents/thumbnail_4.webp');
      profileImageSource = require('../image/profile/profileImage_4.webp');
      break;
    case 5:
      contentsImageSource = require('../image/contents/thumbnail_5.webp');
      profileImageSource = require('../image/profile/profileImage_5.webp');
      break;
    case 6:
      contentsImageSource = require('../image/contents/thumbnail_6.webp');
      profileImageSource = require('../image/profile/profileImage_6.webp');
      break;
    case 7:
      contentsImageSource = require('../image/contents/thumbnail_7.webp');
      profileImageSource = require('../image/profile/profileImage_7.webp');
      break;
    case 8:
      contentsImageSource = require('../image/contents/thumbnail_8.webp');
      profileImageSource = require('../image/profile/profileImage_8.webp');
      break;
    case 9:
      contentsImageSource = require('../image/contents/thumbnail_9.webp');
      profileImageSource = require('../image/profile/profileImage_8.webp');
      break;
    case 10:
      contentsImageSource = require('../image/contents/thumbnail_10.webp');
      profileImageSource = require('../image/profile/profileImage_7.webp');
      break;
    case 11:
      contentsImageSource = require('../image/contents/thumbnail_11.webp');
      profileImageSource = require('../image/profile/profileImage_6.webp');
      break;
    case 12:
      contentsImageSource = require('../image/contents/thumbnail_12.webp');
      profileImageSource = require('../image/profile/profileImage_5.webp');
      break;
    case 13:
      contentsImageSource = require('../image/contents/thumbnail_13.webp');
      profileImageSource = require('../image/profile/profileImage_4.webp');
      break;
    case 14:
      contentsImageSource = require('../image/contents/thumbnail_14.webp');
      profileImageSource = require('../image/profile/profileImage_3.webp');
      break;
    case 15:
      contentsImageSource = require('../image/contents/thumbnail_15.webp');
      profileImageSource = require('../image/profile/profileImage_2.webp');
      break;
    case 16:
      contentsImageSource = require('../image/contents/thumbnail_16.webp');
      profileImageSource = require('../image/profile/profileImage_1.webp');
      break;
    default:
      contentsImageSource = require('../image/contents/thumbnail_1.webp');
      profileImageSource = require('../image/profile/profileImage_1.webp');
  }

  const handlePress = () => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM follow WHERE login_id = ? AND contents_id = ?;',
        [loginId, contentsSelectId],
        (_, result) => {
          if (result.rows.length > 0) {
            tx.executeSql(
              'DELETE FROM follow WHERE login_id = ? AND contents_id = ?;',
              [loginId, contentsSelectId],
              (_, deleteResult) => {
                console.log('Delete success!');
                setIsFollowing(false); // フォロー解除時に状態更新
              },
              (_, deleteError) => {
                console.log('Delete error: ', deleteError);
              }
            );
          } else {
            tx.executeSql(
              'INSERT INTO follow(login_id, contents_id) VALUES(?, ?);',
              [loginId, contentsSelectId],
              (_, insertResult) => {
                console.log('Insert success!');
                setIsFollowing(true); // フォロー時に状態更新
              },
              (_, insertError) => {
                console.log('Insert error: ', insertError);
              }
            );
          }
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
    });
  };

  const handlePress2 = () => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM mylist WHERE login_id = ? AND contents_id = ?;',
        [loginId, contentsSelectId],
        (_, result) => {
          if (result.rows.length > 0) {
            tx.executeSql(
              'DELETE FROM mylist WHERE login_id = ? AND contents_id = ?;',
              [loginId, contentsSelectId],
              (_, deleteResult) => {
                console.log('Delete success!');
                setIsMylisting(false); // マイリストから削除時に状態更新
              },
              (_, deleteError) => {
                console.log('Delete error: ', deleteError);
              }
            );
          } else {
            tx.executeSql(
              'INSERT INTO mylist(login_id, contents_id) VALUES(?, ?);',
              [loginId, contentsSelectId],
              (_, insertResult) => {
                console.log('Insert success!');
                setIsMylisting(true); // マイリストに追加時に状態更新
              },
              (_, insertError) => {
                console.log('Insert error: ', insertError);
              }
            );
          }
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
    });
  };

  let usersContentsImageSource = '';
  // loginIdに基づいてプロファイル画像のソースを選択
  switch (contentsUserId) {
    case 1:
      usersContentsImageSource = require('../image/contents/thumbnail_1.webp');
      break;
    case 2:
      usersContentsImageSource = require('../image/contents/thumbnail_2.webp');
      break;
    case 3:
      usersContentsImageSource = require('../image/contents/thumbnail_3.webp');
      break;
    case 4:
      usersContentsImageSource = require('../image/contents/thumbnail_4.webp');
      break;
    case 5:
      usersContentsImageSource = require('../image/contents/thumbnail_5.webp');
      break;
    case 6:
      usersContentsImageSource = require('../image/contents/thumbnail_6.webp');
      break;
    case 7:
      usersContentsImageSource = require('../image/contents/thumbnail_7.webp');
      break;
    case 8:
      usersContentsImageSource = require('../image/contents/thumbnail_8.webp');
      break;
    case 9:
      usersContentsImageSource = require('../image/contents/thumbnail_9.webp');
      break;
    case 10:
      usersContentsImageSource = require('../image/contents/thumbnail_10.webp');
      break;
    case 11:
      usersContentsImageSource = require('../image/contents/thumbnail_11.webp');
      break;
    case 12:
      usersContentsImageSource = require('../image/contents/thumbnail_12.webp');
      break;
    case 13:
      usersContentsImageSource = require('../image/contents/thumbnail_13.webp');
      break;
    case 14:
      usersContentsImageSource = require('../image/contents/thumbnail_14.webp');
      break;
    case 15:
      usersContentsImageSource = require('../image/contents/thumbnail_15.webp');
      break;
    case 16:
      usersContentsImageSource = require('../image/contents/thumbnail_16.webp');
      break;
    default:
      usersContentsImageSource = require('../image/contents/thumbnail_1.webp');
  }

  return (
    <LinearGradient
      colors={['#444444', '#222222', '#000000']}
      style={styles.container}
    >
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16} // イベントをどれくらいの頻度で発生させるかを設定
      >
        <View style={[styles.contents]}>
          <View style={[styles.contentsImage]}>
            <Image
              source={contentsImageSource}
              style={[styles.contentsImageContents]}
            />
            <View style={[styles.contentsImageBright]}></View>
            <View style={[styles.contentsImageButton]}>
              <TouchableOpacity onPress={handleOpenOtherApp}>
                <AntDesign name="caretright" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.contentsTitle]}>"{contentsData.title}"</Text>
          <View style={[styles.contentsInteger]}>
            <Text style={[styles.contentsIntegerText]}>再生数</Text>
            <Text style={[styles.contentsIntegerText]}>{contentsData.count}</Text>
          </View>
          <View style={[styles.contentsInteger]}>
            <Text style={[styles.contentsIntegerText]}>いいね数</Text>
            <Text style={[styles.contentsIntegerText]}>{contentsData.good}</Text>
          </View>
          <View style={[styles.contentsUserContainer]}>
            <View style={[styles.contentsUser]}>
              <Image
                source={profileImageSource}
                style={[styles.contentsUserImage]}
              />
              <Text style={[styles.contentsUserName]}>@{contentsUserName}</Text>
            </View>
            <Button
              mode={buttonStyle.mode}
              textColor={buttonStyle.textColor}
              buttonColor={buttonStyle.buttonColor}
              contentStyle={buttonStyle.contentStyle}
              labelStyle={buttonStyle.labelStyle}
              style={styles.contentsFollowButton}
              onPress={handlePress}
            >
              {isFollowing ? "フォロー中" : "フォロー"}
            </Button>
          </View>
          <Button
            mode={buttonStyle2.mode}
            textColor={buttonStyle2.textColor}
            buttonColor={buttonStyle2.buttonColor}
            contentStyle={buttonStyle2.contentStyle}
            labelStyle={buttonStyle2.labelStyle}
            style={styles.contentsMylistButton}
            onPress={handlePress2}
          >
            {isMylisting ? "この体験をマイリストから削除する" : "この体験をマイリストに追加する"}
          </Button>
        </View>
        <View style={[styles.usersList]}>
          <LinearGradient
            colors={['#444444', '#222222', '#000000']}
            style={styles.usersListContainer}
          >
            <Text style={[styles.usersListText]}>"@{contentsUserName}"さんの他の投稿</Text>
            <View style={[styles.usersListContents]}>
              <Link
                href='/usersContents'
                style={[styles.usersListContentsContents]}
              >
                <Image
                  source={usersContentsImageSource}
                  style={[styles.usersListContentsContentsImage]}
                />
              </Link>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default UserContents;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  contents: {
    width: '100%',
    borderRadius: 15,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center'
  },
  contentsImage: {
    width: '100%',
    height: 282.5,
    marginTop: 30,
    position: 'relative'
  },
  contentsImageBright: {
    width: '100%',
    height: 282.5,
    backgroundColor: 'rgba(000, 000, 000, .5)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2
  },
  contentsImageButton: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderRadius: 42,
    borderColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -28 }, { translateY: -28 }],
    zIndex: 3
  },
  contentsImageContents: {
    width: '100%',
    height: '100%'
  },
  contentsTitle: {
    marginTop: 7.5,
    fontSize: 28,
    color: '#FFFFFF'
  },
  contentsInteger: {
    width: 180,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentsIntegerText: {
    fontSize: 14,
    color: '#FFFFFF'
  },
  contentsUserContainer: {
    width: 300,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentsUser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentsUserImage: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .25)',
    borderRadius: 28,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentsUserName: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  contentsFollowButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, .5)'
  },
  contentsMylistButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, .5)',
    marginTop: 10
  },
  usersList: {
    width: '100%',
    height: 325,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 45,
    paddingBottom: 30
  },
  usersListContainer: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  usersListText: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  usersListContents: {
    width: '100%',
    marginTop: 15,
    marginLeft: 3.75,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  usersListContentsContents: {
    width: 117.5,
    height: 88.125,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 2.5,
    marginRight: 2.5
  },
  usersListContentsContentsImage: {
    width: 117.5,
    height: 88.125,
    borderRadius: 5
  }
});
