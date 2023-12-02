import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";

const Creater = () => {

  return (
    <LinearGradient
    colors={['#444444', '#222222', '#000000']}
    style={styles.container}
    >
      <ScrollView>
        <View style={[styles.nftContainer]}>
          <View style={[styles.nftBackground]}>
            <Text style={[styles.nftBackgroundText_1]}>¥3,980</Text>
            <Text style={[styles.nftBackgroundText_2]}>+¥480</Text>
          </View>
        </View>
        <View style={[styles.nftText]}>
          <View style={[styles.nftTextText]}>
            <Text style={[styles.nftTextTextText_1]}>フォロワー　50</Text>
            <Text style={[styles.nftTextTextText_2]}>+25</Text>
          </View>
          <View style={[styles.nftTextText, styles.nftTextText_2]}>
            <Text style={[styles.nftTextTextText_1]}>総再生回数　150</Text>
            <Text style={[styles.nftTextTextText_2]}>+50</Text>
          </View>
        </View>
        <View style={[styles.nftContents]}>
          <Text style={[styles.nftContentsText]}>評価が高い順</Text>
          <View style={[styles.nftContentsContents, styles.nftContentsContents_1]}>
            <Image
              source={require('../image/home/contentsDemo.webp')}
              style={[styles.nftContentsContentsImage]}
            />
            <Text style={[styles.nftContentsContentsTitle]}>"音と熱の世界"</Text>
            <View style={[styles.nftContentsContentsText]}>
              <Text style={[styles.nftContentsContentsTextText]}>NFT額　　　　  ¥1,980</Text>
              <Text style={[styles.nftContentsContentsTextText]}>再生回数　　　　75回</Text>
              <Text style={[styles.nftContentsContentsTextText]}>ジャンル別人気　5位</Text>
            </View>
          </View>
          <View style={[styles.nftContentsContents]}>
            <Image
              source={require('../image/home/contentsDemo.webp')}
              style={[styles.nftContentsContentsImage]}
            />
            <Text style={[styles.nftContentsContentsTitle]}>"音と熱の世界"</Text>
            <View style={[styles.nftContentsContentsText]}>
              <Text style={[styles.nftContentsContentsTextText]}>NFT額　　　　  ¥1,980</Text>
              <Text style={[styles.nftContentsContentsTextText]}>再生回数　　　　75回</Text>
              <Text style={[styles.nftContentsContentsTextText]}>ジャンル別人気　5位</Text>
            </View>
          </View>
          <View style={[styles.nftContentsContents]}>
            <Image
              source={require('../image/home/contentsDemo.webp')}
              style={[styles.nftContentsContentsImage]}
            />
            <Text style={[styles.nftContentsContentsTitle]}>"音と熱の世界"</Text>
            <View style={[styles.nftContentsContentsText]}>
              <Text style={[styles.nftContentsContentsTextText]}>NFT額　　　　  ¥1,980</Text>
              <Text style={[styles.nftContentsContentsTextText]}>再生回数　　　　75回</Text>
              <Text style={[styles.nftContentsContentsTextText]}>ジャンル別人気　5位</Text>
            </View>
          </View>
          <View style={[styles.nftContentsContents]}>
            <Image
              source={require('../image/home/contentsDemo.webp')}
              style={[styles.nftContentsContentsImage]}
            />
            <Text style={[styles.nftContentsContentsTitle]}>"音と熱の世界"</Text>
            <View style={[styles.nftContentsContentsText]}>
              <Text style={[styles.nftContentsContentsTextText]}>NFT額　　　　  ¥1,980</Text>
              <Text style={[styles.nftContentsContentsTextText]}>再生回数　　　　75回</Text>
              <Text style={[styles.nftContentsContentsTextText]}>ジャンル別人気　5位</Text>
            </View>
          </View>
          <View style={[styles.nftContentsContents]}>
            <Image
              source={require('../image/home/contentsDemo.webp')}
              style={[styles.nftContentsContentsImage]}
            />
            <Text style={[styles.nftContentsContentsTitle]}>"音と熱の世界"</Text>
            <View style={[styles.nftContentsContentsText]}>
              <Text style={[styles.nftContentsContentsTextText]}>NFT額　　　　  ¥1,980</Text>
              <Text style={[styles.nftContentsContentsTextText]}>再生回数　　　　75回</Text>
              <Text style={[styles.nftContentsContentsTextText]}>ジャンル別人気　5位</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Creater;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  nftContainer: {
    width: '100%',
    marginTop: 30,
    display: 'flex',
    alignItems: 'center'
  },
  nftBackground: {
    width: 300,
    height: 168.75,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, .25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  nftBackgroundText_1: {
    fontSize: 28,
    color: '#FFFFFF'
  },
  nftBackgroundText_2: {
    fontSize: 14,
    color: '#FF0000',
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    transform: [{ translateX: 30 }, { translateY: -15 }]
  },
  nftText: {
    width: '100%',
    marginTop: 50,
    display: 'flex',
    alignItems: 'center'
  },
  nftTextText: {
    width: 225,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nftTextTextText_1: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  nftTextTextText_2: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FF0000'
  },
  nftTextText_2: {
    marginTop: 5
  },
  nftContents: {
    width: '100%',
    marginTop: 50
  },
  nftContentsText: {
    marginLeft: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  nftContentsContents: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  nftContentsContents_1: {
    marginTop: 10,
  },
  nftContentsContentsImage: {
    width: 100,
    height: 75,
    marginLeft: 15,
    borderRadius: 5
  },
  nftContentsContentsTitle: {
    marginTop: 5,
    marginLeft: 7.5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  nftContentsContentsText: {
    marginLeft: 12.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  nftContentsContentsTextText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});
