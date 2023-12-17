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
      // /*
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
      // */

      // loginテーブルにg04メンバー8人用のデータがいるため一括挿入
      // /*
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
      // */

      // contentsテーブルに挿入
      // /*
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [1, 'thumbnail_1', null, '森林散歩', 're', 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [2, 'thumbnail_2', null, '色と形の対話', 'ex', 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [3, 'thumbnail_3', null, 'デジタルキャンバス', 're', 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [4, 'thumbnail_4', null, 'サファリの冒険', 'ex', 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [5, 'thumbnail_5', null, 'たわむれわんこ', 're', 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [6, 'thumbnail_6', null, '私たちは鳥だ', 'ex', 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [7, 'thumbnail_7', null, '大気の詩', 're', 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [8, 'thumbnail_8', null, '無音の楽園', 'ex', 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [8, 'thumbnail_9', null, 'ネオン都市', 'ex', 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [7, 'thumbnail_10', null, '白の儚さ', 're', 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [6, 'thumbnail_11', null, '地中海の街並み', 'ex', 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [5, 'thumbnail_12', null, '鏡の世界', 're', 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [4, 'thumbnail_13', null, '音と熱の世界', 'ex', 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [3, 'thumbnail_14', null, '星と光の詩', 're', 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [2, 'thumbnail_15', null, 'レッツTOKYOライフ！', 'ex', 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      tx.executeSql(
        'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, good) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [1, 'thumbnail_16', null, '自然の景観', 're', 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        (_, result) => {
          console.log('Insert success!');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
      // */

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
      // /*
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
      // */
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
