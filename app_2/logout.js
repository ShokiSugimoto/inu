import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text } from "react-native";

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // 清除存儲的用戶信息
      await AsyncStorage.removeItem("userInfo");

      // 將應用程序導航至登入頁面（或其他未授權的頁面）
      // navigation.navigate("loading_2");

      navigation.reset({
        index: 0,
        routes: [{ name: 'loading_2' }],
      });
    } catch (error) {
      console.error("登出時發生錯誤:", error);
      // 根據需要處理錯誤
    }
  };

  useEffect(() => {
    // 在組件卸載前進行清理
    return () => {
      // 可以在這裡執行其他登出時的清理操作
    };
  }, []);

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;