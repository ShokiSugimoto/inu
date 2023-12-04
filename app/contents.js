import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

const Contents = () => {
  const [items, setItems] = useState([]);
  const [contentsData, setContentsData] = useState(null);
  const [contentsUserName, setContentsUserName] = useState(null);
  const [contentsId, setContentsId] = useState(null);
  const [loginId, setLoginId] = useState(null);
  // フォロー状態を管理する state
  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({
    mode: "text",
    textColor: '#FFFFFF',
    buttonColor: "transparent",
    contentStyle: { paddingLeft: 10, paddingRight: 10 },
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
            const contentsId = items[0].id;
            setContentsId(contentsId);

            tx.executeSql(
              'SELECT id, user_id, thumbnail, title FROM contents WHERE id = ?',
              [contentsId],
              (_, { rows }) => {
                const contentsData = rows.item(0);
                setContentsData(rows.item(0));

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
                  [loginId, contentsId],
                  (_, followResult) => {
                    const isFollowing = followResult.rows.length > 0;
                    setIsFollowing(isFollowing);
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

  if (!contentsData) {
    return null;
  }

  let contentsImageSource = '';
  // loginIdに基づいてプロファイル画像のソースを選択
  switch (contentsData.id) {
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
    // 他のケースも同様に追加
    default:
      // デフォルトの画像ソースを設定
      contentsImageSource = require('../image/contents/thumbnail_1.webp');
      profileImageSource = require('../image/profile/profileImage_1.webp');
  }

  const handlePress = () => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM follow WHERE login_id = ? AND contents_id = ?;',
        [loginId, contentsId],
        (_, result) => {
          if (result.rows.length > 0) {
            tx.executeSql(
              'DELETE FROM follow WHERE login_id = ? AND contents_id = ?;',
              [loginId, contentsId],
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
              [loginId, contentsId],
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

  return (
    <LinearGradient
      colors={['#444444', '#222222', '#000000']}
      style={styles.container}
    >
      <ScrollView>
        <View style={[styles.contents]}>
          <View style={[styles.contentsImage]}>
            <Image
              source={contentsImageSource}
              style={[styles.contentsImageContents]}
            />
            <View style={[styles.contentsImageBright]}></View>
            <View style={[styles.contentsImageButton]}>
              <AntDesign name="caretright" size={28} color="#FFFFFF" />
            </View>
          </View>
          <Text style={[styles.contentsTitle]}>"{contentsData.title}"</Text>
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
            mode="text"
            textColor={'#FFFFFF'}
            buttonColor="transparent"
            contentStyle={{ width: 300 }}
            labelStyle={{ fontSize: 14, fontWeight: '400', lineHeight: 14 }}
            style={[styles.contentsMylistButton]}
          >
            この体験をマイリストに追加する
          </Button>
        </View>
        <View style={[styles.usersList]}>
          <Text style={[styles.usersListText]}>"@{contentsUserName}"さんの他の投稿</Text>
          <View style={[styles.usersListContents]}>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Contents;

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
    marginTop: 15
  },
  usersList: {
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#000000',
    marginTop: 45,
    paddingBottom: 30
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
