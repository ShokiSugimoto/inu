import { Link } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions, Text, Linking } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Marquee = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(scrollY, {
        toValue: windowHeight,
        duration: 25000,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [scrollY]);

  return (
    <View style={styles.marqueeContainer}>
      <Animated.View
        style={[
          styles.marquee,
          {
            transform: [{ translateY: scrollY }],
          },
        ]}
      >
        <Image style={styles.image} source={require('../img/home/mainvisualDemo.webp')} />
        <Image style={styles.image} source={require('../img/home/mainvisualDemo.webp')} />
        <Image style={styles.image} source={require('../img/home/mainvisualDemo.webp')} />
        <Image style={styles.image} source={require('../img/home/mainvisualDemo.webp')} />
        <Image style={styles.image} source={require('../img/home/mainvisualDemo.webp')} />
        <Image style={styles.image} source={require('../img/home/mainvisualDemo.webp')} />
        <Image style={styles.image} source={require('../img/home/mainvisualDemo.webp')} />
        <Image style={styles.image} source={require('../img/home/mainvisualDemo.webp')} />
      </Animated.View>
      <View style={styles.loginContainer}>
        <Login />
      </View>
    </View>
  );
};

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bottomButtonContainer}>
        <Link href="/toroku" style={styles.buttonText}>
          <Text style={styles.buttonText}>
              会員登録
            </Text>
        </Link>
        <Link href="/login" style={styles.buttonText}>
          <Text style={styles.buttonText}>
              ログイン
            </Text>
        </Link>
      </View>
    </View>
  );
};

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

export default Marquee;