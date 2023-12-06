import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';

const Select = () => {

  const [borderStyle, setBorderStyle] = useState({
    relaxation: {
      borderWidth: 0.25,
    },
    exciting: {
      borderWidth: 0.25,
    },
  });

    // リンクが押された時の処理
    const handleLinkPress = (type) => {
    // データベース更新
    const db = SQLite.openDatabase('inu.db');
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE genre SET ${type === 'relaxation' ? 're' : 'ex'} = 1, ${type === 'relaxation' ? 'ex' : 're'} = 0;`,
        [],
        (_, result) => {
          console.log('Update success');
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
    });
    setBorderStyle((prevStyles) => ({
      ...prevStyles,
      [type]: {
        borderWidth: 1,
        borderColor: '#FFFFFF'
      },
    }));
  };

  return (
    <View style={styles.container}>
      <Link href='/relaxation' onPress={() => handleLinkPress('relaxation')}>
        <Image
          source={require('../image/select/relaxationIcon.webp')}
          style={[styles.relaxationIcon, borderStyle.relaxation]}
        />
      </Link>
      <Link href='/relaxation' onPress={() => handleLinkPress('exciting')}>
        <Image
          source={require('../image/select/excitingIcon.webp')}
          style={[styles.excitingIcon, borderStyle.exciting]}
        />
      </Link>
      <Text style={[styles.text]}>どちらを体験しますか？</Text>
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
  }
});

export default Select;
