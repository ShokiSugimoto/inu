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
      // マンテクを仮ログイン
      tx.executeSql(
        'INSERT INTO login(flg) VALUES(?);',
        [1],
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
        'INSERT INTO contents (user_id, thumbnail, title, nft, count, ranking) VALUES(?, ?, ?, ?, ?, ?);',
        [1, 'thumbnail_1', '音と熱の世界', 375, 10, 8],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, title, nft, count, ranking) VALUES(?, ?, ?, ?, ?, ?);',
        [2, 'thumbnail_2', '色と光の詩', 750, 20, 7],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, title, nft, count, ranking) VALUES(?, ?, ?, ?, ?, ?);',
        [3, 'thumbnail_3', '私たちは鳥だ。', 1125, 30, 6],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, title, nft, count, ranking) VALUES(?, ?, ?, ?, ?, ?);',
        [4, 'thumbnail_4', 'なんだって叶うと錯覚するほどの。', 1500, 40, 5],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      */

      // contentsSelectテーブルに挿入
      /*
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
