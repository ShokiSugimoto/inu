// テーブルデータ確認用

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
          console.log('Select success!');
          const items = result.rows._array;
          setItems(items);
          console.log(`件数:${items.length}件`);
          for (let i = 0; i < items.length; i++) {
            const { id, user_name, name, image, pass } = items[i];
            console.log(`${id}:${user_name}:${name}:${image}:${pass}`);
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
          console.log('Select success!');
          const items2 = result.rows._array;
          setItems(items2);
          console.log(`件数:${items2.length}件`);
          for (let i = 0; i < items2.length; i++) {
            const { id, flg } = items2[i];
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
