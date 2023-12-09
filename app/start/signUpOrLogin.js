import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { Link } from "expo-router";

const signUpOrLogin = () => {

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 30000,
      useNativeDriver: false, // 必要に応じてNative Driverを有効にする
    });

    const resetAnimation = Animated.timing(animatedValue, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false, // 必要に応じてNative Driverを有効にする
    });

    Animated.loop(Animated.sequence([animation, resetAnimation])).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1175], // heightの分だけ上に動かす
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.containerBg, { transform: [{ translateY }] }]}>
        <Image
          source={require('../../image/start/containerBgImage.webp')}
          style={[styles.containerBgImage]}
        />
      </Animated.View>
      <View style={styles.contents}>
        <Image
            source={require('../../image/start/contentsBgImage.webp')}
            style={[styles.contentsBgImage]}
          />
      </View>
    </View>
  );
};

export default signUpOrLogin;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  containerBg: {
    width: 375,
    height: 1703,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  },
  containerBgImage: {
    width: '100%',
    height: '100%',
  },
  contents: {
    width: '100%',
    height: 300,
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  contentsBgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  }
});
