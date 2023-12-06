import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';

const Profile = () => {

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loginId, setLoginId] = useState(null);
  const [contentsId, setContentsId] = useState(null);
  const [mylistImageSources, setMylistImageSources] = useState([]);
  const [scrollY, setScrollY] = useState(0);

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
              source = require('../../image/contents/thumbnail_1.webp');
              break;
            case 2:
              source = require('../../image/contents/thumbnail_2.webp');
              break;
            case 3:
              source = require('../../image/contents/thumbnail_3.webp');
              break;
            case 4:
              source = require('../../image/contents/thumbnail_4.webp');
              break;
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

  return (
    <LinearGradient
    colors={['#444444', '#222222', '#000000']}
    style={styles.container}
    >
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
                <Link key={index} href='/contents' style={[styles.myListContentsContents]}>
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
    height: '100%'
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
