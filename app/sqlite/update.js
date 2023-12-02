// loginテーブルflgデータ更新用

import React, { useState } from "react";
import * as SQLite from 'expo-sqlite';
import { View } from 'react-native';
import { Button } from "react-native-paper";


const Sqlite = () => {

  const db = SQLite.openDatabase('inu.db');
  const [user, setItems] = useState([]);
  const handlePress = (id) => {
    db.transaction((tx) => {

      // flg=1のデータをflg=0にし、押されたボタンのidのflg=1にする。
      tx.executeSql(
        'UPDATE login SET flg = (CASE WHEN id = ? THEN 1 ELSE 0 END) WHERE flg = 1 OR id = ?;',
        [id, id],
        (_, updateResult) => {
          console.log('Update success!');
        },
        (_, updateError) => {
          console.log('Error...');
        }
      );
    });
  };

  // Button[1]がid[1]アカウント用, Button[2]がid[2]アカウント用, etc...
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
        <Button
          key={id}
          onPress={() => handlePress(id)}
          style={{ width: 40, height: 30, backgroundColor: 'rgba(255, 255, 255, .5)', marginBottom: 10 }}
        >
          {id}
        </Button>
      ))}
    </View>
  );
}

export default Sqlite;
