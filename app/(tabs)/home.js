import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {

  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      delay: 500,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [anim]);
  const animStyle = {
    opacity: anim
  };

  return (
    <LinearGradient
      colors={['#444444', '#222222', '#000000']}
      style={styles.container}
    >
      <Animated.ScrollView style={[animStyle]}>
        <View style={[styles.mainvisual]}>
          <Link href='/contents'>
            <Image
              source={require('../../image/home/mainvisualDemo.webp')}
              style={[styles.mainvisualImage]}
            />
          </Link>
          <Text style={[styles.mainvisualTitle]}>"音と熱の世界"</Text>
          <Text style={[styles.mainvisualUser]}>@KanatoEndo</Text>
          <Text style={[styles.mainvisualDeadline]}>17日後有料コンテンツ</Text>
        </View>
        <View style={[styles.contents]}>
          <Text style={[styles.contentsText_1]}>文化と芸術, フェスティバル</Text>
          <View style={[styles.contentsContents_1]}>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_1Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_1ContentsImage]}
              />
            </Link>
          </View>
          <Text style={[styles.contentsText_1]}>フォローユーザーの最新投稿</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.contentsContents_2]}
          >
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
          </ScrollView>
          <Text style={[styles.contentsText_1]}>最近人気上昇中の投稿</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.contentsContents_2]}
          >
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
          </ScrollView>
          <Text style={[styles.contentsText_2]}>一部有料コンテンツ</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.contentsContents_2]}
          >
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.contentsContents_2Contents]}>
              <Image
                source={require('../../image/home/contentsDemo.webp')}
                style={[styles.contentsContents_2ContentsImage]}
              />
            </Link>
          </ScrollView>
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  mainvisual: {
    width: '100%',
    borderRadius: 15,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center'
  },
  mainvisualImage: {
    width: 300,
    height: 400,
    borderRadius: 15
  },
  mainvisualTitle: {
    marginTop: 10,
    fontSize: 21,
    color: '#FFFFFF'
  },
  mainvisualUser: {
    marginTop: 2.5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  mainvisualDeadline: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000'
  },
  contents: {
    width: '100%',
    marginBottom: 30
  },
  contentsText_1: {
    marginTop: 60,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  contentsText_2: {
    marginTop: 60,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FF0000'
  },
  contentsContents_1: {
    width: '100%',
    display: 'flex',
    marginTop: 10,
    marginLeft: 27.5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentsContents_1Contents: {
    width: 150,
    height: 112.5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  contentsContents_1ContentsImage: {
    width: 150,
    height: 112.5,
    borderRadius: 5
  },
  contentsContents_2: {
    width: '100%',
    display: 'flex',
    marginTop: 10,
    marginLeft: 27.5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentsContents_2Contents: {
    width: 150,
    height: 112.5,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  contentsContents_2ContentsImage: {
    width: 150,
    height: 112.5,
    borderRadius: 5
  }
});
