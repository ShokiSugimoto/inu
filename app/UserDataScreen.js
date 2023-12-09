// UserDataScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, Image, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('inu.db');

const UserDataScreen = ({ navigation }) => {
  const [userData, setUserData] = useState([]);

  const clearUserData = () => {
    // 清空 user 表中的数据
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM user',
        [],
        () => {
          console.log('リセット済み');
          setUserData([]); // 清空本地状态中的用户数据
        },
        (_, error) => {
          console.error('エラー:', error);
          Alert.alert('Error', 'エラー');
        }
      );
    });
  };

  useEffect(() => {
    // 从数据库中获取数据
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user',
        [],
        (_, { rows }) => {
          setUserData(rows._array);
        },
        (_, error) => {
          console.error('エラー:', error);
        }
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button title="リセット" onPress={clearUserData} />
      <Text style={styles.title}>ユーザーリスト</Text>
      {userData.map((user) => (
        <View key={user.id} style={styles.userContainer}>
          <Text>{`名前: ${user.user_name}`}</Text>
          <Text>{`フリガナ: ${user.name}`}</Text>
          <Text>{`性别: ${user.pass}`}</Text>
          {user.image && (
            <Image
              source={{ uri: user.image }}
              style={styles.userImage}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  userContainer: {
    marginBottom: 16,
  },
  userImage: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
});

export default UserDataScreen;
