import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation, useRoute } from "expo-router";
import { Link } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Select = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  const [borderStyle, setBorderStyle] = useState({
    relaxation: {
      borderWidth: 0.25,
    },
    exciting: {
      borderWidth: 0.25,
    },
  });

  const handleLinkPress = (type) => {
    setBorderStyle((prevStyles) => ({
      ...prevStyles,
      [type]: {
        borderWidth: 1,
        borderColor: '#FFFFFF'
      },
    }));
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 从AsyncStorage中获取用户信息
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          const user = JSON.parse(storedUserInfo);
          console.log("用户已登录:", user);
          console.log("用户名:", user.firstName); // 假设用户信息中有一个名为 name 的字段
          setUserInfo(user);
          // 在这里执行您需要在页面聚焦时进行的操作
        } else {
          console.log("用户未登录");
          // 在这里执行其他逻辑（例如，重置表单字段）
        }
      } catch (error) {
        console.error('获取用户信息时发生错误:', error);
      }
    };

    if (isFocused) {
      console.log("页面处于焦点状态");
      checkLoginStatus();
    }
  }, [isFocused]); // 只需关注 isFocused

  return (
    <View style={styles.container}>
      <Link href='/relaxation' onPress={() => handleLinkPress('relaxation')}>
        <Image
          source={require('../img/select/relaxationIcon.webp')}
          style={[styles.relaxationIcon, borderStyle.relaxation]}
        />
      </Link>
      <Link href='/relaxation' onPress={() => handleLinkPress('exciting')}>
        <Image
          source={require('../img/select/excitingIcon.webp')}
          style={[styles.excitingIcon, borderStyle.exciting]}
        />
      </Link>
      <Text style={[styles.text]}>どちらを体験しますか？</Text>
      <Link style={[styles.login]} href={"/logout"}><Text>logout</Text></Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  relaxationIcon: {
    width: 200,
    height: 150,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, .5)',
    backgroundColor: '#F5F5F5',
    transform: [{ translateX: -50 }, { translateY: 0 }]
  },
  excitingIcon: {
    width: 200,
    height: 150,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, .5)',
    backgroundColor: '#F5F5F5',
    transform: [{ translateX: 50 }, { translateY: 12.5 }]
  },
  text: {
    fontSize: 21,
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 125,
    left: '50%',
    transform: [{ translateX: -101.25 }, { translateY: 0 }]
  },
  login:{
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 50,
    left: '50%',
  }
});

export default Select;
