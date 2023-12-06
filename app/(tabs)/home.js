import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import * as SQLite from 'expo-sqlite';

const Home = () => {

  const [contentsData, setContentsData] = useState(null);
  const [contents_2Data, setContents_2Data] = useState(null);
  const [userData, setUserData] = useState(null);
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fetchData = async () => {
      const db = SQLite.openDatabase('inu.db');
      // コンテンツデータを取得
      db.transaction(tx => {

        tx.executeSql(

          // ランダムな1つのコンテンツを取得するSQLクエリ
          'SELECT * FROM contents ORDER BY RANDOM() LIMIT 1;',
          [],
          (_, result) => {
            const itemsData = result.rows._array;
            if (itemsData.length > 0) {
              setContentsData({ title: itemsData[0].title });
              setContents_2Data({ id: itemsData[0].id });

              tx.executeSql(
                'SELECT * FROM user WHERE id = ?;',
                [itemsData[0].user_id],
                (_, result) => {
                  const userData = result.rows._array;
                  if (userData.length > 0) {
                    setUserData({ user_name: userData[0].user_name });
                  }
                },
                (_, error) => {
                  console.log('Error...', error);
                }
              );
            }
          },
          (_, error) => {
            console.log('Error...');
          }
        );
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      delay: 500,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [anim]);

  const animStyle = {
    opacity: anim
  };

  const handlePress = () => {
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
        'UPDATE contentsSelect SET flg = 1 WHERE id = (SELECT id FROM contents WHERE title = ?);',
        [contentsData.title],
        (_, updateResult) => {
        },
        (_, updateError) => {
          console.log('Error...');
        }
      );
    });
  }

  if (!contentsData || !userData) {
    return null;
  }

  let mainvisualImageSource = '';
  // loginIdに基づいてプロファイル画像のソースを選択
  switch (contents_2Data.id) {
    case 1:
      mainvisualImageSource = require('../../image/contents/thumbnail_1.webp');
      break;
    case 2:
      mainvisualImageSource = require('../../image/contents/thumbnail_2.webp');
      break;
    case 3:
      mainvisualImageSource = require('../../image/contents/thumbnail_3.webp');
      break;
    case 4:
      mainvisualImageSource = require('../../image/contents/thumbnail_4.webp');
      break;
    // 他のケースも同様に追加
    default:
      // デフォルトの画像ソースを設定
      mainvisualImageSource = require('../../image/contents/thumbnail_1.webp');
  }

  return (
    <LinearGradient
      colors={['#444444', '#222222', '#000000']}
      style={styles.container}
    >
      <Animated.ScrollView style={[animStyle]}>
        <View style={[styles.mainvisual]}>
          <Link
            href='/contents'
            onPress={() => handlePress()}
          >
            <Image
              source={mainvisualImageSource}
              style={[styles.mainvisualImage]}
            />
          </Link>
          <Text style={[styles.mainvisualTitle]}>"{contentsData.title}"</Text>
          <Text style={[styles.mainvisualUser]}>@{userData.user_name}</Text>
          <Text style={[styles.mainvisualDeadline]}>17日後有料コンテンツ</Text>
        </View>
        <View style={[styles.contents]}>
          <Text style={[styles.contentsText_1]}>文化と芸術, フェスティバル</Text>
          <View style={[styles.contentsContents_1]}>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
          </View>
          <Text style={[styles.contentsText_1]}>フォローユーザーの最新投稿</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.contentsContents_2]}
          >
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
          </ScrollView>
          <Text style={[styles.contentsText_1]}>最近人気上昇中の投稿</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.contentsContents_2]}
          >
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
          </ScrollView>
          <Text style={[styles.contentsText_2]}>一部有料コンテンツ</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.contentsContents_2]}
          >
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
          </ScrollView>
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  mainvisual: {
    width: '100%',
    borderRadius: 15,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center'
  },
  mainvisualImage: {
    width: 300,
    height: 400,
    borderRadius: 15
  },
  mainvisualTitle: {
    marginTop: 10,
    fontSize: 21,
    color: '#FFFFFF'
  },
  mainvisualUser: {
    marginTop: 2.5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  mainvisualDeadline: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000'
  },
  contents: {
    width: '100%',
    marginBottom: 30
  },
  contentsText_1: {
    marginTop: 60,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  contentsText_2: {
    marginTop: 60,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FF0000'
  },
  contentsContents_1: {
    width: '100%',
    display: 'flex',
    marginTop: 10,
    marginLeft: 27.5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentsContents_1Contents: {
    width: 150,
    height: 112.5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  contentsContents_1ContentsImage: {
    width: 150,
    height: 112.5,
    borderRadius: 5
  },
  contentsContents_2: {
    width: '100%',
    display: 'flex',
    marginTop: 10,
    marginLeft: 27.5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentsContents_2Contents: {
    width: 150,
    height: 112.5,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  contentsContents_2ContentsImage: {
    width: 150,
    height: 112.5,
    borderRadius: 5
  }
});
