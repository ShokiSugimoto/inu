// Expo RouterからLinkをインポート
import { Link } from 'expo-router';
// ReactおよびReact Nativeから必要な要素をインポート
import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions, Text, Linking } from 'react-native';

// デバイスのウィンドウの高さと幅を取得
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// マーキーのコンポーネントを定義
const Marquee = () => {
  // アニメーション用の変数を初期化
  const scrollY = useRef(new Animated.Value(0)).current;

  // コンポーネントがマウントされたときに実行されるuseEffect
  useEffect(() => {
    // アニメーションの定義
    const animation = Animated.loop(
      Animated.timing(scrollY, {
        toValue: windowHeight,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    // アニメーションを開始
    animation.start();

    // コンポーネントがアンマウントされたときにアニメーションを停止
    return () => {
      animation.stop();
    };
  }, [scrollY]);

  // JSXを返す
  return (
    <View style={styles.marqueeContainer}>
      {/* マーキーのアニメーション対象となるView */}
      <Animated.View
        style={[
          styles.marquee,
          {
            transform: [{ translateY: scrollY }],
          },
        ]}
      >
        {/* マーキーに表示される画像 */}
        {/* <Image style={styles.image} source={require('../../image/start/startDemo.webp')} /> */}
      </Animated.View>
      {/* ログインコンポーネントを含むView */}
      <View style={styles.loginContainer}>
        <Login />
      </View>
    </View>
  );
};

// ログインコンポーネントを定義
const Login = () => {
  // JSXを返す
  return (
    <View style={styles.container}>
      {/* 会員登録へのリンク */}
      <View style={styles.bottomButtonContainer}>
        <Link href="/toroku" style={styles.buttonText}>
          <Text style={styles.buttonText}>
            会員登録
          </Text>
        </Link>
        {/* ログインへのリンク */}
        <Link href="/login" style={styles.buttonText}>
          <Text style={styles.buttonText}>
            ログイン
          </Text>
        </Link>
      </View>
    </View>
  );
};

// スタイルを定義
const styles = StyleSheet.create({
  marqueeContainer: {
    flex: 1,
    position: 'relative',
  },
  marquee: {
    flexDirection: 'column-reverse',
    overflow: 'hidden',
    position: 'relative',
    bottom: -2000,
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
  },
  image: {
    width: windowWidth,
    marginBottom: -5,
  },
  container: {
    flex: 1,
    width: windowWidth,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  bottomButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 50,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 30,
    width: "60%",
  },
});

// Marqueeコンポーネントをエクスポート
export default Marquee;
