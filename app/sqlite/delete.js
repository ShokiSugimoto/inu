// テーブル内データ削除用

import React, { useState } from "react";
import * as SQLite from 'expo-sqlite';
import { View } from 'react-native';
import { Button } from "react-native-paper";

const Sqlite = () => {

  const db = SQLite.openDatabase('inu.db');
  const [user, setItems] = useState([]);
  const handlePress = () => {
    db.transaction((tx) => {

      // 〇〇テーブル内データ削除
      /*
      tx.executeSql(
        'DELETE FROM ○○;',
        [],
        (_, result) => {
          console.log('Delete success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */
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
