import React, { useState, useEffect } from "react";
import { Stack, Link } from "expo-router";
import { StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

export default function Layout() {

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const db = SQLite.openDatabase('inu.db');
    db.transaction(tx => {

      // flg=1のデータを呼び出す。
      tx.executeSql(
        'SELECT * FROM login WHERE flg = 1;',
        [],
        (_, result) => {
          const items = result.rows._array;
          setItems(items);
          if (items.length > 0) {
            const loginId = items[0].id;
            tx.executeSql(
              'SELECT id, user_name, name, image, pass FROM user WHERE id = ?',
              [loginId],
              (_, { rows }) => {
                setUserData(rows.item(0));
              },
              (tx, error) => {
                console.error(error);
              }
            );
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );
    });
  }, []); 

  if (!userData) {
    return null;
  }

  const fadeIn = ({ current }) => ({
    cardStyle: {
      opacity: current.progress
    }
  });

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#444444' }
      }}
    >
      <Stack.Screen name='index' options={{headerShown: false}} />
      <Stack.Screen name='loading' options={{headerShown: false}} />
      <Stack.Screen
        name='select'
        options={{
          animation: fadeIn,
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen name='relaxation' options={{headerShown: false}} />
      <Stack.Screen
        name='homeLoading'
        options={{
          animation: fadeIn,
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name='(tabs)'
        options={{
          animation: fadeIn,
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name='contents'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='usersContents'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='creater'
        options={{
          headerShown: true,
          headerTitle: () => false,
          headerLeft: () => (
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 15}}>@{userData.user_name}</Text>
          ),
          headerRight: () => (
            <View style={[styles.headerRight]}>
              <Feather name="plus-square" size={27.5} color="#FFFFFF" style={[styles.upload]} />
              <Link href='/profile'>
                <Octicons name="three-bars" size={27.5} color="#FFFFFF" />
              </Link>
            </View>
          )
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  upload: {
    marginRight: 12.5
  }
});
