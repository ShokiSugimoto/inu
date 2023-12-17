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
  const [selectContentsId, setSelectContentsId] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loginId, setLoginId] = useState([]);
  const [followContentsIds, setFollowContentsIds] = useState([]);
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

        // genreテーブルからre=1かex=1のモノを取得
        tx.executeSql(
          'SELECT * FROM genre WHERE re = 1 OR ex = 1;',
          [],
          (_, genreResult) => {
            const genreData = genreResult.rows._array;
            if (genreData.length > 0) {
              // 取得したジャンルのreとexの値が1であるカラム名を格納
              const selectedColumns = [];
              for (let i = 0; i < genreData.length; i++) {
                if (genreData[i].re === 1) {
                  selectedColumns.push('re');
                }
                if (genreData[i].ex === 1) {
                  selectedColumns.push('ex');
                }
              }
              setSelectedColumns(selectedColumns);

              // tagテーブルからtag_1~tag_10が1のモノを取得
              tx.executeSql(
                'SELECT * FROM tag WHERE tag_1 = 1 OR tag_2 = 1 OR tag_3 = 1 OR tag_4 = 1 OR tag_5 = 1 OR tag_6 = 1 OR tag_7 = 1 OR tag_8 = 1 OR tag_9 = 1 OR tag_10 = 1;',
                [],
                (_, tagResult) => {
                  const tagData = tagResult.rows._array;
                  if (tagData.length > 0) {
                    // 値が1であるtagのカラム名を配列に格納
                    const selectedTags = [];
                    for (let i = 1; i <= 10; i++) {
                      const tagFieldName = `tag_${i}`;
                      const matchingTags = tagData.filter(tag => tag[tagFieldName] === 1);
                      if (matchingTags.length > 0) {
                        selectedTags.push(tagFieldName);
                      }
                    }
                    setSelectedTags(selectedTags);

                    // ここで tx.executeSql を呼び出す
                    db.transaction(innerTx => {
                      innerTx.executeSql(
                        'SELECT * FROM contents WHERE genre = ? AND ' +
                        selectedTags.map(tag => `${tag} = 1`).join(' AND ') + ';',
                        [...selectedColumns],
                        (_, contentsResult) => {
                          const selectContents = contentsResult.rows._array.map(item => item.id);
                          setSelectContentsId(selectContents);
                        },
                        (_, error) => {
                          console.log('Error in contents query:', error);
                        }
                      );
                    });
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

        tx.executeSql(
          'SELECT id FROM login WHERE flg = ?;',
          [1],
          (_, result) => {
            const loginId = result.rows._array;
            if(loginId.length > 0) {
              setLoginId(loginId[0].id);

              tx.executeSql(
                'SELECT * FROM follow WHERE login_id = ?;',
                [loginId[0].id],
                (_, followResult) => {
                  const followContents = followResult.rows._array;
                  if(followContents.length > 0) {
                    // followContents から contents_id を取得して新しい配列を作成
                    const followContentsIds = followContents.map(item => item.contents_id);
                    // setFollowContentsId に新しい配列をセット
                    setFollowContentsIds(followContentsIds);
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

  console.log('selectedTags '+selectedTags);

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

  const handlePress2 = (selectedContentId) => {
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
        [selectedContentId],
        (_, updateResult) => {
          console.log(selectedContentId);
        },
        (_, updateError) => {
          console.log('Error...');
        }
      );
    });
  }

  console.log(followContentsIds);
  const handlePress3 = (followContentsIds) => {
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
        [followContentsIds],
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
    case 5:
      mainvisualImageSource = require('../../image/contents/thumbnail_5.webp');
      break;
    case 6:
      mainvisualImageSource = require('../../image/contents/thumbnail_6.webp');
      break;
    case 7:
      mainvisualImageSource = require('../../image/contents/thumbnail_7.webp');
      break;
    case 8:
      mainvisualImageSource = require('../../image/contents/thumbnail_8.webp');
      break;
    case 9:
      mainvisualImageSource = require('../../image/contents/thumbnail_9.webp');
      break;
    case 10:
      mainvisualImageSource = require('../../image/contents/thumbnail_10.webp');
      break;
    case 11:
      mainvisualImageSource = require('../../image/contents/thumbnail_11.webp');
      break;
    case 12:
      mainvisualImageSource = require('../../image/contents/thumbnail_12.webp');
      break;
    case 13:
      mainvisualImageSource = require('../../image/contents/thumbnail_13.webp');
      break;
    case 14:
      mainvisualImageSource = require('../../image/contents/thumbnail_14.webp');
      break;
    case 15:
      mainvisualImageSource = require('../../image/contents/thumbnail_15.webp');
      break;
    case 16:
      mainvisualImageSource = require('../../image/contents/thumbnail_16.webp');
      break;  
    default:
      mainvisualImageSource = require('../../image/contents/thumbnail_1.webp');
  }

  let selectContentsImageSources = selectContentsId.map((id) => {
    switch (id) {
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
        return require(`../../image/contents/thumbnail_1.webp`);
    }
  });

  // selectedTags 配列が空でない場合、各タグに対応する selectContentsTag を生成
  const selectContentsTags = selectedTags.map(tag => {
  switch (tag) {
    case 'tag_1':
      return '自然と景観';
    case 'tag_2':
      return 'ヨガと瞑想';
    case 'tag_3':
      return '癒しの音楽';
    case 'tag_4':
      return 'アートとクリエイティブ';
    case 'tag_5':
      return 'ペットと動物';
    case 'tag_6':
      return '料理と食べ物';
    case 'tag_7':
      return 'アクティブな冒険';
    case 'tag_8':
      return 'エンターテインメント';
    case 'tag_9':
      return '科学とテクノロジー';
    case 'tag_10':
      return 'スポーツとアクション';
    default:
      return '';
    }
  });

  let followContentsImageSources = followContentsIds.map((contents_id) => {
    switch (contents_id) {
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
        return require(`../../image/contents/thumbnail_1.webp`);
    }
  });

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
          <Text style={[styles.contentsText_1]}>
            {selectContentsTags.join(', ')}
          </Text>
          <View style={[styles.contentsContents_1]}>
            {selectContentsImageSources.map((selectContentsImageSources, index) => (
              <Link
                key={index}
                href='/contents'
                style={[styles.contentsContents_1Contents]}
                onPress={() => handlePress2(selectContentsId[index])}
              >
                <Image
                  source={selectContentsImageSources}
                  style={[styles.contentsContents_1ContentsImage]}
                />
              </Link>
            ))}
          </View>
          <Text style={[styles.contentsText_1]}>フォローユーザーの最新投稿</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.contentsContents_2]}
          >
            {followContentsImageSources.map((followContentsImageSource, index2) => (
              <Link
                key={index2}
                href='/contents'
                style={[styles.contentsContents_1Contents]}
                onPress={() => handlePress3(followContentsIds[index2])}
              >
                <Image
                  source={followContentsImageSource}
                  style={[styles.contentsContents_1ContentsImage]}
                />
              </Link>
            ))}
          </ScrollView>
          <Text style={[styles.contentsText_1]}>最近人気上昇中の投稿</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.contentsContents_2]}
          >
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/contents/thumbnail_1.webp')}
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
                source={require('../../image/contents/thumbnail_2.webp')}
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
