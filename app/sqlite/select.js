// テーブルデータ確認用(LOGで確認)

import React, { useState } from "react";
import * as SQLite from 'expo-sqlite';
import { View } from 'react-native';
import { Button } from "react-native-paper";

const Sqlite = () => {

  const db = SQLite.openDatabase('inu.db');
  const [user, setItems] = useState([]);
  const handlePress = () => {
    db.transaction((tx) => {

      // userテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM user;',
        [],
        (_, result) => {
          const items = result.rows._array;
          setItems(items);
          console.log('\n');
          console.log(`[user]:${items.length}件`);
          for (let i = 0; i < items.length; i++) {
            const { id, user_name, name, image, pass } = items[i];
            console.log(`id:${id}, ユーザー名:@${user_name}, 名前:${name}, プロフィール画像パス:${image}, パスワード:${pass}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      // loginテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM login;',
        [],
        (_, result) => {
          const items2 = result.rows._array;
          setItems(items2);
          console.log('\n');
          console.log(`[login(flg確認用)]:${items2.length}件`);
          for (let i = 0; i < items2.length; i++) {
            const { id, flg } = items2[i];
            console.log(`id:${id}, flg:${flg}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      // contentsテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM contents;',
        [],
        (_, result) => {
          const items3 = result.rows._array;
          setItems(items3);
          console.log('\n');
          console.log(`[contents]:${items3.length}件`);
          for (let i = 0; i < items3.length; i++) {
            const { id, user_id, thumbnail, title, nft, count, ranking } = items3[i];
            console.log(`id:${id}, user_id:${user_id}, thumbnail:${thumbnail}, title:${title}, nft:${nft}, count:${count} ranking:${ranking}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      // contentsSelectテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM contentsSelect;',
        [],
        (_, result) => {
          const items4 = result.rows._array;
          setItems(items4);
          console.log('\n');
          console.log(`[contentsSelect(flg確認用)]:${items4.length}件`);
          for (let i = 0; i < items4.length; i++) {
            const { id, flg } = items4[i];
            console.log(`${id}:${flg}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );
    });
  };

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={handlePress}
        style={{ width: 40, height: 30, backgroundColor: 'rgba(255, 255, 255, .5)', marginBottom: 50 }}
      />
    </View>
  );
}

export default Sqlite;
