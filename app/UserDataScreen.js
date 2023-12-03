// UserDataScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('inu.db');

const UserDataScreen = ({ navigation }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // データベースからデータを取得
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user',
        [],
        (_, { rows }) => {
          setUserData(rows._array);
        },
        (_, error) => {
          console.error('データの取得中にエラーが発生しました:', error);
        }
      );
    });
  }, []);

  return (
    <View>
      <Text>ユーザーデータ一覧</Text>
      {userData.map((user) => (
        <View key={user.id}>
          <Text>{`名前: ${user.firstName} ${user.lastName}`}</Text>
          <Text>{`フリガナ: ${user.furigana}`}</Text>
          <Text>{`性別: ${user.gender}`}</Text>
          <Text>{`Email: ${user.email}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserDataScreen;
