import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';

const Contents = () => {
  
  return(
    <LinearGradient
    colors={['#444444', '#222222', '#000000']}
    style={styles.container}
    >
      <ScrollView>
        <View style={[styles.contents]}>
          <View style={[styles.contentsImage]}>
            <Image
              source={require('../image/home/contentsDemo.webp')}
              style={[styles.contentsImageContents]}
            />
            <View style={[styles.contentsImageBright]}></View>
            <View style={[styles.contentsImageButton]}>
              <AntDesign name="caretright" size={28} color="#FFFFFF" />
            </View>
          </View>
          <Text style={[styles.contentsTitle]}>"音と熱の世界"</Text>
          <View style={[styles.contentsUserContainer]}>
            <View style={[styles.contentsUser]}>
              <Image
                source={require('../image/profile/profileImage_1.webp')}
                style={[styles.contentsUserImage]}
              />
              <Text style={[styles.contentsUserName]}>@KanatoEndo</Text>
            </View>
            <Button
              mode="text"
              textColor={'#FFFFFF'}
              buttonColor="transparent"
              contentStyle={{paddingLeft: 10, paddingRight: 10}}
              labelStyle={{fontSize: 14, fontWeight: '400', lineHeight: 14}}
              style={[styles.contentsFollowButton]}
            >
              フォロー
            </Button>
          </View>
          <Button
            mode="text"
            textColor={'#FFFFFF'}
            buttonColor="transparent"
            contentStyle={{width: 300, paddingLeft: 10, paddingRight: 10}}
            labelStyle={{fontSize: 14, fontWeight: '400', lineHeight: 14}}
            style={[styles.contentsMylistButton]}
          >
            この体験をマイリストに追加する
          </Button>
        </View>
        <View style={[styles.usersList]}>
          <Text style={[styles.usersListText]}>"@KanatoEndo"さんの他の投稿</Text>
          <View style={[styles.usersListContents]}>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
            <Link href='/usersContents' style={[styles.usersListContentsContents]}>
              <Image
                source={require('../image/home/contentsDemo.webp')}
                style={[styles.usersListContentsContentsImage]}
              />
            </Link>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Contents;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  contents: {
    width: '100%',
    borderRadius: 15,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center'
  },
  contentsImage: {
    width: '100%',
    height: 282.5,
    marginTop: 30,
    position: 'relative'
  },
  contentsImageBright: {
    width: '100%',
    height: 282.5,
    backgroundColor: 'rgba(000, 000, 000, .5)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2
  },
  contentsImageButton: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderRadius: 42,
    borderColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -28 }, { translateY: -28 }],
    zIndex: 3
  },
  contentsImageContents: {
    width: '100%',
    height: '100%'
  },
  contentsTitle: {
    marginTop: 7.5,
    fontSize: 28,
    color: '#FFFFFF'
  },
  contentsUserContainer: {
    width: 300,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentsUser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentsUserImage: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .25)',
    borderRadius: 28,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentsUserName: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  contentsFollowButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, .5)'
  },
  contentsMylistButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, .5)',
    marginTop: 15
  },
  usersList: {
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#000000',
    marginTop: 45,
    paddingBottom: 30
  },
  usersListText: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  usersListContents: {
    width: '100%',
    marginTop: 15,
    marginLeft: 3.75,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  usersListContentsContents: {
    width: 117.5,
    height: 88.125,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 2.5,
    marginRight: 2.5
  },
  usersListContentsContentsImage: {
    width: 117.5,
    height: 88.125,
    borderRadius: 5
  }
});
