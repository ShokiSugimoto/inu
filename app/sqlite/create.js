// テーブル作成用

import React from "react";
import * as SQLite from 'expo-sqlite';
import { View } from 'react-native';
import { Button } from "react-native-paper";

const Sqlite = () => {

  const db = SQLite.openDatabase('inu.db');
  const handlePress = () => {
    db.transaction((tx) => {

      // userテーブル作成
      /*
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, name TEXT, image TEXT, pass TEXT);',
        [],
        (_, result) => {
          console.log('Create success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */

      // loginテーブル(session等ではなく、flgが1か0かでログイン、ログアウト状態の判定)作成
      /*
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY AUTOINCREMENT, flg INTEGER);',
        [],
        (_, result) => {
          console.log('Create success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */

      // contentsテーブル作成
      /*
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contents (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, thumbnail TEXT, title TEXT, nft INTEGER, count INTEGER, ranking INTEGER);',
        [],
        (_, result) => {
          console.log('Create success!');
        },
        (_, error) => {
          console.log('Error...');
        }
      );
      */

      // contentsSelectテーブル(選択したコンテンツにflg=1を付け詳細表示)作成
      /*
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contentsSelect (id INTEGER PRIMARY KEY AUTOINCREMENT, flg INTEGER);',
        [],
        (_, result) => {
          console.log('Create success!');
        },
        (_, error) => {
          console.log('Error!');
        }
      );
      */

      // followテーブル作成
      /*
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS follow (id INTEGER PRIMARY KEY AUTOINCREMENT, login_id INTEGER, contents_id INTEGER);',
        [],
        (_, result) => {
          console.log('Create success!');
        },
        (_, error) => {
          console.log('Error!');
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
