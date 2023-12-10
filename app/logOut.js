import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Index from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogOut = () => {
  const [showIndex, setShowIndex] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log("Before setShowIndex:", showIndex);
    const timer = setTimeout(async () => {
      setShowIndex(true); // 3秒後にIndexを表示
      console.log("After setShowIndex:", showIndex);
  
      // 非同期処理が終わるのを待ってから非表示にする
      await someAsyncFunction(); // 非同期処理の完了を待つ関数を追加
  
      setIsVisible(false); // 3秒後にLogOutを非表示にする
    }, 3000);
  
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isVisible ? (
    <View style={styles.container}>
      <Text style={styles.text}>
        ログアウトしました。
      </Text>
      {showIndex && <Index />}
    </View>
  ) : null;
};

export default LogOut;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 28,
    color: '#FFFFFF'
  }
});
