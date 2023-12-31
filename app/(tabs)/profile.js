import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loginId, setLoginId] = useState(null);
  const [contentsId, setContentsId] = useState(null);
  const [mylistImageSources, setMylistImageSources] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [loginId2, setLoginId2] = useState(null);
  const [mylistContentsIds, setMylistContentsIds] = useState(null);
  const [drawerMenuOpacity] = useState(new Animated.Value(0));
  const [drawerMenuTransform] = useState(new Animated.Value(250));

  const toggleDrawerMenu = () => {
    const isOpen = drawerMenuOpacity._value === 0; // drawerMenuが表示されているかどうかを判定

    Animated.parallel([
      Animated.timing(drawerMenuOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(drawerMenuTransform, {
        toValue: isOpen ? 0 : 250,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const fetchData = async () => {
    const db = SQLite.openDatabase('inu.db');
    try {
      const result = await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM login WHERE flg = 1;',
            [],
            (_, result) => {
              resolve(result);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });

      const items = result.rows._array;
      setItems(items);

      if (items.length > 0) {
        const loginId = items[0].id;
        setLoginId(loginId);

        const userDataResult = await new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT id, user_name, name, image, pass FROM user WHERE id = ?',
              [loginId],
              (_, result) => {
                resolve(result);
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });

        const userData = userDataResult.rows.item(0);
        setUserData(userData);

        const mylistResult = await new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM mylist WHERE login_id = ?;',
              [loginId],
              (_, result) => {
                resolve(result);
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });

        const mylistItems = mylistResult.rows._array;
        const mylistSources = mylistItems.map(item => {
          let source = require('../../image/contents/thumbnail_1.webp');
          switch (item.contents_id) {
            case 1:
              return require(`../../image/contents/thumbnail_1.webp`);
            case 2:
              return require(`../../image/contents/thumbnail_2.webp`);
            case 3:
              return require(`../../image/contents/thumbnail_3.webp`);
            case 4:
              return require(`../../image/contents/thumbnail_4.webp`);
            case 5:
              return require(`../../image/contents/thumbnail_5.webp`);
            case 6:
              return require(`../../image/contents/thumbnail_6.webp`);
            case 7:
              return require(`../../image/contents/thumbnail_7.webp`);
            case 8:
              return require(`../../image/contents/thumbnail_8.webp`);
            case 9:
              return require(`../../image/contents/thumbnail_9.webp`);
            case 10:
              return require(`../../image/contents/thumbnail_10.webp`);
            case 11:
              return require(`../../image/contents/thumbnail_11.webp`);
            case 12:
              return require(`../../image/contents/thumbnail_12.webp`);
            case 13:
              return require(`../../image/contents/thumbnail_13.webp`);
            case 14:
              return require(`../../image/contents/thumbnail_14.webp`);
            case 15:
              return require(`../../image/contents/thumbnail_15.webp`);
            case 16:
              return require(`../../image/contents/thumbnail_16.webp`);
            default:
              source = require('../../image/contents/thumbnail_1.webp');
          }
          return source;
        });
        setMylistImageSources(mylistSources);
      }
    } catch (error) {
      console.error('Fetch data error:', error);
      // エラーの適切な処理を行う（例: ユーザーにエラーメッセージを表示する）
    }

    db.transaction(tx => {
      
      tx.executeSql(
        'SELECT id FROM login WHERE flg = ?;',
        [1],
        (_, result) => {
          const loginId2 = result.rows._array;
          if(loginId2.length > 0) {
            setLoginId2(loginId2[0].id);

            tx.executeSql(
              'SELECT * FROM mylist WHERE login_id = ?;',
              [loginId2[0].id],
              (_, mylistResult) => {
                const mylistContents = mylistResult.rows._array;
                if(mylistContents.length > 0) {
                  // followContents から contents_id を取得して新しい配列を作成
                  const mylistContentsIds = mylistContents.map(item => item.contents_id);
                  // setFollowContentsId に新しい配列をセット
                  setMylistContentsIds(mylistContentsIds);
                }
              },
              (_, error) => {
                console.log('Error...', error);
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

  useEffect(() => {
    fetchData();
  }, []);

  if (!userData) {
    return null;
  }

  let profileImageSource = '';
  // loginIdに基づいてプロファイル画像のソースを選択
  switch (userData.id) {
    case 1:
      profileImageSource = require('../../image/profile/profileImage_1.webp');
      break;
    case 2:
      profileImageSource = require('../../image/profile/profileImage_2.webp');
      break;
    case 3:
      profileImageSource = require('../../image/profile/profileImage_3.webp');
      break;
    case 4:
      profileImageSource = require('../../image/profile/profileImage_4.webp');
      break;
    case 5:
      profileImageSource = require('../../image/profile/profileImage_5.webp');
      break;
    case 6:
      profileImageSource = require('../../image/profile/profileImage_6.webp');
      break;
    case 7:
      profileImageSource = require('../../image/profile/profileImage_7.webp');
      break;
    case 8:
      profileImageSource = require('../../image/profile/profileImage_8.webp');
      break;
    // 他のケースも同様に追加
    default:
      // デフォルトの画像ソースを設定
      profileImageSource = require('../../image/profile/profileImage_1.webp');
  }

  const handleScroll = async (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // ここで必要なスクロール位置や条件を確認して、リフレッシュのトリガーを設定

    // 例: スクロールが最上部に達したらリフレッシュ
    if (offsetY <= -75) {
      await fetchData();
    }
  };

  const handlePress = (mylistContentsIds) => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction((tx) => {
      // contentsSelectテーブルを更新
      tx.executeSql(
        'UPDATE contentsSelect SET flg = 0 WHERE flg = 1;',
        [],
        (_, updateResult) => {
        },
        (_, updateError) => {
          console.log('Error...');
        }
      );
  
      // 選択されたコンテンツを更新
      tx.executeSql(
        'UPDATE contentsSelect SET flg = 1 WHERE id = ?;',
        [mylistContentsIds],
        (_, updateResult) => {
        },
        (_, updateError) => {
          console.log('Error...');
        }
      );
    });
  }

  const logOut = async () => {
    const db = SQLite.openDatabase('inu.db');
    try {
      const result = await new Promise((resolve, reject) => {
        // AsyncStorage を使用して保存されているユーザー情報を削除
        AsyncStorage.removeItem("userInfo");
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE login SET flg = 0 WHERE flg = 1;',
            [],
            (_, updateResult) => {
              resolve(updateResult);
              console.log('Update success!');
            },
            (_, updateError) => {
              reject(updateError);
              console.log('Error...', error);
            }
          );
        });
      });
      console.log('Log out success!');
    } catch (error) {
      console.error('Error...', error);
    }
  };

  return (
    <LinearGradient
    colors={['#444444', '#222222', '#000000']}
    style={styles.container}
    >
      <TouchableOpacity onPress={toggleDrawerMenu} style={styles.drawerButton} />
      <Animated.View
        style={[
          styles.drawerMenuBg,
          {
            opacity: drawerMenuOpacity,
            zIndex: drawerMenuOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-1, 2],
            }),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.drawerMenuContents,
            {
              transform: [
                {
                  translateY: drawerMenuTransform,
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#444444', '#222222', '#000000']}
            style={styles.drawerMenuContentsBg}
            >
            <Text style={[styles.drawerMenuLi_1]}>
              <Link
                href='/creater'
                style={{marginRight: 30}}
                onPress={toggleDrawerMenu}
              >
                クリエイターページへ
              </Link>
            </Text>
            <Text style={[styles.drawerMenuLi_2]}>
              <Link
                href='logOut'
                onPress={logOut}
                style={[styles.logOut]}
              >
                ログアウト
              </Link>
            </Text>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16} // イベントをどれくらいの頻度で発生させるかを設定
      >
        <View style={[styles.profileImageContainer]}>
          <Image
            source={profileImageSource}
            style={[styles.profileImage]}
          />
          <Image
            source={require('../../image/profile/profileImageBackground.webp')}
            style={[styles.profileImageBackground]}
          />
        </View>
        <View style={[styles.profileNameContainer]}>
          <Text style={[styles.profileName]}>{userData.name}</Text>
          <Text style={[styles.profileNameUser]}>@{userData.user_name}</Text>
        </View>
        <View style={[styles.myList]}>
          <LinearGradient
            colors={['#444444', '#222222', '#000000']}
            style={styles.mylistContainer}
          >
            <Text style={[styles.myListText]}>マイリスト</Text>
            <View style={[styles.myListContents]}>
              {mylistImageSources.map((source, index) => (
                <Link
                  key={index}
                  href='/contents'
                  style={[styles.myListContentsContents]}
                  onPress={() => handlePress(mylistContentsIds[index])}
                >
                  <Image
                    source={source}
                    style={[styles.myListContentsContentsImage]}
                  />
                </Link>
              ))}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  drawerButton: {
    width: 85,
    height: 27.5,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 3
  },
  drawerMenuBg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(000, 000, 000, .75)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2
  },
  drawerMenuContents: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 3
  },
  drawerMenuContentsBg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  drawerMenuLi_1: {
    marginTop: 30,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  drawerMenuLi_2: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  profileImageContainer: {
    width: '100%',
    marginTop: 30,
    display: 'flex',
    alignItems: 'center'
  },
  profileImage: {
    width: 200,
    height: 200,
    borderWidth: .5,
    borderColor: 'rgba(255, 255, 255, .5)',
    borderRadius: 200,
    backgroundColor: 'lightgrey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  profileImageBackground: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -125 }, { translateY: -125 }],
    zIndex: -1
  },
  profileNameContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  profileName: {
    marginTop: 10,
    fontSize: 28,
    color: '#FFFFFF'
  },
  profileNameUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  myList: {
    width: '100%',
    height: 375,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 30,
    paddingBottom: 30
  },
  mylistContainer: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  myListText: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  myListContents: {
    width: '100%',
    marginTop: 15,
    marginLeft: 3.75,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  myListContentsContents: {
    width: 117.5,
    height: 88.125,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 2.5,
    marginRight: 2.5
  },
  myListContentsContentsImage: {
    width: 117.5,
    height: 88.125,
    borderRadius: 5,
  }
});
