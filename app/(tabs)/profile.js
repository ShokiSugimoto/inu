import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';

const Profile = () => {

  const [user, setItems] = useState([]);
  const db = SQLite.openDatabase('inu.db');

  return (
    <LinearGradient
    colors={['#444444', '#222222', '#000000']}
    style={styles.container}
    >
      <ScrollView>
        <View style={[styles.profileImageContainer]}>
          <Image
            source={require('../../img/profile/profileImageDemo.webp')}
            style={[styles.profileImage]}
          />
          <Image
            source={require('../../img/profile/profileImageBackground.webp')}
            style={[styles.profileImageBackground]}
          />
        </View>
        <View style={[styles.profileNameContainer]}>
          <Text style={[styles.profileName]}>遠藤叶翔</Text>
          <Text style={[styles.profileNameUser]}>@KanatoEndo</Text>
        </View>
        <View style={[styles.myList]}>
          <Text style={[styles.myListText]}>マイリスト</Text>
          <View style={[styles.myListContents]}>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
            <Link href='/contents' style={[styles.myListContentsContents]}>
              <Image
                source={require('../../img/home/contentsDemo.webp')}
                style={[styles.myListContentsContentsImage]}
              />
            </Link>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  profileImageContainer: {
    width: '100%',
    marginTop: 30,
    display: 'flex',
    alignItems: 'center'
  },
  profileImage: {
    width: 200,
    height: 200,
    borderWidth: .5,
    borderColor: 'rgba(255, 255, 255, .5)',
    borderRadius: 200,
    backgroundColor: 'lightgrey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  profileImageBackground: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -125 }, { translateY: -125 }],
    zIndex: -1
  },
  profileNameContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  profileName: {
    marginTop: 10,
    fontSize: 28,
    color: '#FFFFFF'
  },
  profileNameUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  myList: {
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#000000',
    marginTop: 30,
    paddingBottom: 30
  },
  myListText: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  myListContents: {
    width: '100%',
    marginTop: 15,
    marginLeft: 3.75,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  myListContentsContents: {
    width: 117.5,
    height: 88.125,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 2.5,
    marginRight: 2.5
  },
  myListContentsContentsImage: {
    width: 117.5,
    height: 88.125,
    borderRadius: 5,
  }
});
