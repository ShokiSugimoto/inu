// アプリ起動時まずはこのファイルが呼び出される

import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Loading from "./loading";

const Index = () => {

  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      
      navigation.navigate('(tabs)'); // select画面へ遷移(通常)

      // sqliteファイル呼び出し用
      // navigation.navigate('sqlite/create'); // テーブル作成用ファイルへ遷移
      // navigation.navigate('sqlite/insert'); // データ挿入用ファイルへ遷移
      // navigation.navigate('sqlite/select'); // テーブルデータ確認用ファイルへ遷移
      // navigation.navigate('sqlite/update'); // ログインアカウント変更の仮画面
      // navigation.navigate('sqlite/drop'); // テーブル削除用ファイルへ遷移
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  // index.js呼び出すのと同時にloading.jsを呼び出して表示
  return (
    <Loading />
  );
};

export default Index;
