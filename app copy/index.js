// アプリ起動時まずはこのファイルが呼び出される

// 各行できるだけ詳細にコメントアウトで解説してください。

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./loading";

const Index = () => {

  const navigation = useNavigation();
  
  useEffect(() => {

    console.log("useEffect started");
    
    const timer = setTimeout(() => {

      const checkLoginStatus = async () => {
        try {

          // AsyncStorageからユーザー情報を取得
          const userInfoString = await AsyncStorage.getItem("userInfo");
          console.log("userInfoString:", userInfoString);

          // ユーザー情報があれば'select'画面に遷移
          if (userInfoString) {
            navigation.navigate("select");
          } else {
            // ユーザー情報がなければ'signUpOrLogin'画面に遷移
            navigation.navigate("signUpOrLogin");
          }
        } catch (error) {
          console.error("Error...", error);
          // エラーが発生した場合は適切に処理
        }
      };

      // ログイン状態の確認を実行
      checkLoginStatus();
      
      // navigation.navigate('select'); // select画面へ遷移(通常)

      // navigation.navigate('start/signUpOrLogin');

      // sqliteファイル呼び出し用
      // navigation.navigate('sqlite/create'); // テーブル作成用ファイルへ遷移
      // navigation.navigate('sqlite/insert'); // データ挿入用ファイルへ遷移
      // navigation.navigate('sqlite/select'); // テーブルデータ確認用ファイルへ遷移
      // navigation.navigate('sqlite/update'); // ログインアカウント変更の仮画面
      // navigation.navigate('sqlite/delete'); // テーブル内データ削除用ファイルへ遷移
      // navigation.navigate('sqlite/drop'); // テーブル削除用ファイルへ遷移
      // navigation.navigate('sqlite/bpm');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  // index.js呼び出すのと同時にloading.jsを呼び出して表示
  return (
    <Loading />
  );
};

export default Index;
