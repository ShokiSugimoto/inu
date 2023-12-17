import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Linking, AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const ContentsLoading = () => {

  const [contentsId, setContentsId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await fetchContentsId();
        console.log('データ取得成功:', id);
      } catch (error) {
        console.error('データ取得に失敗しました。', error);
      }
    };

    fetchData();
  }, []); // 依存関係配列は空にする

  useEffect(() => {
    if (contentsId !== null) {
      // contentsIdが更新されたらここで処理を行う
      console.log('contentsId:', contentsId);
    }
  }, [contentsId]);

  const fetchContentsId = async () => {
    const db = SQLite.openDatabase('inu.db');
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT id FROM contentsSelect WHERE flg = ?;',
          [1],
          (_, results) => {
            const items = results.rows._array;
            if (items.length > 0) {
              const contentsId = items[0].id;
              console.log(contentsId);
              setContentsId(contentsId);
              resolve(contentsId);
            } else {
              console.error('無効な id です。');
              reject(new Error('無効な id です。'));
            }
          },
          (_, error) => {
            console.error('データ取得に失敗しました。', error);
            reject(error);
          }
        );
      });
    });
  };

  let appURL = '';
  switch (contentsId) {
    case 1:
      appURL = 'inuvr://';
      break;
    case 2:
      appURL = 'inuvr://';
      break;
    case 3:
      appURL = 'inuvr://';
      break;
    case 4:
      appURL = 'inuvr://';
      break;
    case 5:
      appURL = 'inuvr://';
      break;
    case 6:
      appURL = 'inuvr://';
      break;
    case 7:
      appURL = 'inuvr://';
      break;
    case 8:
      appURL = 'inuvr://';
      break;
    case 9:
      appURL = 'inuvr://';
      break;
    case 10:
      appURL = 'inuvr://';
      break;
    case 11:
      appURL = 'inuvr://';
      break;
    case 12:
      appURL = 'inuvr://';
      break;
    case 13:
      appURL = 'inuvr://';
      break;
    case 14:
      appURL = 'inuvr://';
      break;
    case 15:
      appURL = 'inuvr://';
      break;
    case 16:
      appURL = 'inuvr://';
      break;
    default:
      console.log(contentsId);
      console.error('無効な id です。');
      break;
  }

  setTimeout(() => {
    // 3秒後にUnityに遷移
    if (appURL) {
      Linking.openURL(appURL).catch((err) => console.error('アプリを開けませんでした。', err));
    }
  }, 3000);

  const navigation = useNavigation();
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        console.log("アプリがフォアグラウンドに切り替わりました。");
        navigation.navigate('getBpm');
      }
    };

    // AppStateの変更を監視
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      // コンポーネントがアンマウントされたときにリスナーを解除
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default ContentsLoading;
