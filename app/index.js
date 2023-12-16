// アプリ起動時まずはこのファイルが呼び出される

// 各行できるだけ詳細にコメントアウトで解説してください。

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./loading";

const Index = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkLoginStatus = async () => {
        try {
          const userInfoString = await AsyncStorage.getItem("userInfo");
          console.log("userInfoString:", userInfoString);
      
          if (userInfoString) {
            navigation.navigate("select");
          } else {
            navigation.navigate("start/signUpOrLogin");
          }
        } catch (error) {
          console.error("Error in checkLoginStatus:", error);
        }
      };

      checkLoginStatus();

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

  return <Loading />;
};

export default Index;

