// データ挿入用

import React from "react";
import * as SQLite from 'expo-sqlite';
import { View } from 'react-native';
import { Button } from "react-native-paper";

const Sqlite = () => {

  const db = SQLite.openDatabase('inu.db');
  const handlePress = () => {
    db.transaction((tx) => {

      // g04メンバー8人のアカウントデータ一括挿入
      /*
      tx.executeSql(
        'INSERT INTO user(user_name, name, image, pass) VALUES(?, ?, ?, ?);',
        ['kanatoendo', '叶翔', 'profileImage_1', 'ke'],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO user(user_name, name, image, pass) VALUES(?, ?, ?, ?);',
        ['shokisugimoto', '祥希', 'profileImage_2', 'ss'],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO user(user_name, name, image, pass) VALUES(?, ?, ?, ?);',
        ['hiroyukitakada', '寛之', 'profileImage_3', 'ht'],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO user(user_name, name, image, pass) VALUES(?, ?, ?, ?);',
        ['chenpochun', '柏均', 'profileImage_4', 'cpc'],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO user(user_name, name, image, pass) VALUES(?, ?, ?, ?);',
        ['ibukimatsuda', '尉吹', 'profileImage_5', 'im'],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO user(user_name, name, image, pass) VALUES(?, ?, ?, ?);',
        ['shomiyagawa', '翔', 'profileImage_6', 'sm'],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO user(user_name, name, image, pass) VALUES(?, ?, ?, ?);',
        ['tomoakimurayama', '智章', 'profileImage_7', 'tm'],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO user(user_name, name, image, pass) VALUES(?, ?, ?, ?);',
        ['manteklam', '文迪', 'profileImage_8', 'mtl'],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */

      // loginテーブルにg04メンバー8人用のデータがいるため一括挿入
      /*
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      // 祥希でログイン
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */

      // contentsテーブルに挿入
      /*
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, ranking) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [1, 'thumbnail_1', null, '音と熱の世界', 're', 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 375, 10, 8],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, ranking) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [2, 'thumbnail_2', null, '色と光の詩', 'ex', 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 750, 20, 7],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, ranking) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [3, 'thumbnail_3', null, '私たちは鳥だ。', 're', 1, 0, 1, 0, 1, 0, , 0, 0, 0, 1125, 30, 6],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, ranking) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [4, 'thumbnail_4', null, 'なんだって叶うと錯覚するほどの。', 'ex', 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1500, 40, 5],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      */

      // genreテーブルに挿入
      /*
      tx.executeSql(
        'INSERT INTO genre(re, ex) VALUES(?, ?);',
        [1, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */

      // tagテーブルに挿入
      /*
      tx.executeSql(
        'INSERT INTO tag(tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */

      // contentsSelectテーブルに挿入
      /*
      tx.executeSql(
        'INSERT INTO contentsSelect(flg) VALUES(?);',
        [1],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO contentsSelect(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO contentsSelect(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      tx.executeSql(
        'INSERT INTO contentsSelect(flg) VALUES(?);',
        [0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */
    });
  };

  return(
    <View style={{width: '100%', height: '100%', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button
        onPress={handlePress}
        style={{width: 40, height: 30, backgroundColor: 'rgba(255, 255, 255, .5)', marginBottom: 50}}
      />
    </View>
  );
}

export default Sqlite;
