import React, { useEffect, useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const GetBpm = () => {

  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const [heartrateValue, setHeartrateValue] = useState(null);
  const [contentsId, setContentsId] = useState(null);

  const db = SQLite.openDatabase('inu.db');
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT id FROM contentsSelect WHERE flg = 1;',
      [],
      (_, result) => {
        const items = result.rows._array;
        if (items.length > 0) {
          const contentsId = items[0].id;
          setContentsId(contentsId);
        }
      },
      (_, error) => {
        console.log('Error...', error);
      }
    );
  });
  
  // WebView内のデータを取得する関数
  const handleMessage = event => {
    const receivedHeartrateValue = event.nativeEvent.data;
    // 取得した値を state にセット
    setHeartrateValue(receivedHeartrateValue);
  };

  const injectJavaScript = `
    // WebView内の<p class='heartrate'>の値を取得してReact Nativeに送信
    const heartrateElement = document.querySelector('.heartrate');
    const heartrateValue = heartrateElement ? heartrateElement.textContent : null;
    window.ReactNativeWebView.postMessage(heartrateValue);
  `;

  // WebViewコンポーネントが読み込まれた後に実行される処理
  const onWebViewLoad = () => {
    // 5秒待ってから値を取得する
    setTimeout(() => {
      webViewRef.current && webViewRef.current.injectJavaScript(injectJavaScript);
    }, 3000);
  };

  useEffect(() => {
    // heartrateValue の変化を監視し、ログに出力
    console.log('Heart rate:', heartrateValue);
    
    // heartrateValueが取得されたら、contentsに遷移する
    if (heartrateValue !== null) {
      const db = SQLite.openDatabase('inu.db');
      db.transaction(tx => {
        // heartrateValueが65以下または75以上の場合に条件分岐
        if (heartrateValue <= 65 || heartrateValue >= 75) {
          tx.executeSql(
            'UPDATE contents SET good = good + 1 WHERE id = ?;',
            [contentsId],
            (_, result) => {
              console.log('Update success!');
            },
            (_, error) => {
              console.log('Update error: ', error);
            }
          );
        } else {
          console.log('heartrateValue does not meet the conditions for update.');
        }
      });
      alert('平均心拍数'+heartrateValue+'リラクサイティング成功です。');
      navigation.navigate('contents'); // 'contents'は適切な画面名に置き換えてください
    }
  }, [heartrateValue, navigation]);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://app.hyperate.io/78B8' }}
      onMessage={handleMessage}
      onLoad={onWebViewLoad}
    />
  );
};

export default GetBpm;
