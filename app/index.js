import React, { useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./loading";

const Index = () => {
  const navigation = useNavigation();
  const [animationKey, setAnimationKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          const loadingTime = 6000;
          const userInfoString = await AsyncStorage.getItem("userInfo");

          await new Promise(resolve => setTimeout(resolve, loadingTime));

          if (userInfoString) {
            // 如果用戶已經登錄，導航到 'select' 畫面
            navigation.navigate("select");
          } else {
            // 如果用戶未登錄，導航到 'login_toroku' 畫面
            navigation.navigate("login_toroku");
          }
        } catch (error) {
          console.error("確認登錄狀態時出錯:", error);
          // 根據需要處理錯誤
        }
      };

      const unsubscribe = navigation.addListener('beforeRemove', () => {
        requestAnimationFrame(() => {
          // 在畫面即將被刪除前設置 key 以重新渲染動畫
          setAnimationKey(prevKey => prevKey + 1);
        });
      });

      checkLoginStatus();

      return () => {
        unsubscribe();
      };
    }, [navigation])
  );

  return <Loading key={animationKey} />;
};

export default Index;

