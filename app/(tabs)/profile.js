import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';

const Profile = () => {

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction(tx => {

      // flg=1のデータを呼び出す。
      tx.executeSql(
        'SELECT * FROM login WHERE flg = 1;',
        [],
        (_, result) => {
          const items = result.rows._array;
          setItems(items);
          if (items.length > 0) {
            const loginId = items[0].id;
            tx.executeSql(
              'SELECT id, user_name, name, image, pass FROM user WHERE id = ?',
              [loginId],
              (_, { rows }) => {
                setUserData(rows.item(0));
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

  return (
    <LinearGradient
    colors={['#444444', '#222222', '#000000']}
    style={styles.container}
    >
      <ScrollView>
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
          <Text style={[styles.myListText]}>マイリスト</Text>
          <View style={[styles.myListContents]}>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
          </View>
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#000000',
    marginTop: 30,
    paddingBottom: 30
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
