import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';

const Creater = ({ route }) => {

  const [refresh, setRefresh] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [contentsData, setContentsData] = useState(null);
  const [totalPlayCount, setTotalPlayCount] = useState(0);
  const [totalNFTAmount, setTotalNFTAmount] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  
  const db = SQLite.openDatabase('inu.db');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResult = await new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT id FROM login WHERE flg = 1;',
              [],
              (_, result) => resolve(result),
              (_, error) => reject(error)
            );
          });
        });

        if (loginResult.rows.length > 0) {
          const loginId = loginResult.rows._array[0].id;
          setLoginId(loginId);

          const contentsResult = await new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT id, user_id, thumbnail, title, nft, count, good FROM contents WHERE user_id = ?',
                [loginId],
                (_, result) => resolve(result),
                (_, error) => reject(error)
              );
            });
          });

          if (contentsResult.rows.length > 0) {
            const contentsDataArray = contentsResult.rows._array; // 結果を配列に変換
            setContentsData(contentsDataArray);
            const totalPlayCount = contentsDataArray.reduce((total, content) => total + content.count, 0);
            setTotalPlayCount(totalPlayCount);
            const totalNFTAmount = contentsDataArray.reduce((total, content) => total + content.nft, 0);
            setTotalNFTAmount(totalNFTAmount);
          } else {
            console.log('No matching data found for user_id:', loginId);
          }
        } else {
          console.log('No matching data found for user_id:', loginId);
        }

        const followResult = await new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT COUNT(*) AS followerCount FROM follow WHERE contents_id = ?;',
              [loginId],
              (_, result) => resolve(result),
              (_, error) => reject(error)
            );
          });
        });
  
        if (followResult.rows.length > 0) {
          const followerCount = followResult.rows._array[0].followerCount;
          // フォロワーの数を更新
          setFollowerCount(followerCount);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      // ここで再描画をトリガー
      setRefresh(prevRefresh => !prevRefresh);
    };

    fetchData();
  }, [loginId, route, refresh]);

  const getContentsImageSource = (contentId) => {
    switch (contentId) {
      case 1:
        return require('../image/contents/thumbnail_1.webp');
      case 2:
        return require('../image/contents/thumbnail_2.webp');
      case 3:
        return require('../image/contents/thumbnail_3.webp');
      case 4:
        return require('../image/contents/thumbnail_4.webp');
      case 5:
        return require('../image/contents/thumbnail_5.webp');
      case 6:
        return require('../image/contents/thumbnail_6.webp');
      case 7:
        return require('../image/contents/thumbnail_7.webp');
      case 8:
        return require('../image/contents/thumbnail_8.webp');
      case 9:
        return require('../image/contents/thumbnail_9.webp');
      case 10:
        return require('../image/contents/thumbnail_10.webp');
      case 11:
        return require('../image/contents/thumbnail_11.webp');
      case 12:
        return require('../image/contents/thumbnail_12.webp');
      case 13:
        return require('../image/contents/thumbnail_13.webp');
      case 14:
        return require('../image/contents/thumbnail_14.webp');
      case 15:
        return require('../image/contents/thumbnail_15.webp');
      case 16:
        return require('../image/contents/thumbnail_16.webp');
      default:
        return require('../image/contents/thumbnail_1.webp');
    }
  };

  const nftImageSource = (totalNFTAmount) => {
    if (totalNFTAmount <= 500) {
      return require('../image/profile/silverCard.webp');
    } else if (totalNFTAmount <= 1000) {
      return require('../image/profile/goldCard.webp');
    } else {
      return require('../image/profile/platinumCard.webp');
    }
  };

  return (
    <LinearGradient
    colors={['#444444', '#222222', '#000000']}
    style={styles.container}
    >
      <ScrollView>
        <View style={[styles.nftContainer]}>
          <View style={[styles.nftBackground]}>
            <Image
              source={nftImageSource(totalNFTAmount)} // 画像の取得方法を変更
              style={[styles.nftBackgroundImage]}
            />
            <Text style={[styles.nftBackgroundText_1]}>¥{totalNFTAmount}</Text>
            <Text style={[styles.nftBackgroundText_2]}>+¥480</Text>
          </View>
        </View>
        <View style={[styles.nftText]}>
          <View style={[styles.nftTextText]}>
            <Text style={[styles.nftTextTextText_1]}>フォロワー　{followerCount}</Text>
            <Text style={[styles.nftTextTextText_2]}>+25</Text>
          </View>
          <View style={[styles.nftTextText, styles.nftTextText_2]}>
            <Text style={[styles.nftTextTextText_1]}>総再生回数　{totalPlayCount}</Text>
            <Text style={[styles.nftTextTextText_2]}>+50</Text>
          </View>
        </View>
        <View style={[styles.nftContents]}>
          <Text style={[styles.nftContentsText]}>評価が高い順</Text>
        {contentsData && contentsData.map(content => (
          <View key={content.id} style={[styles.nftContentsContents, styles.nftContentsContents_1]}>
            <Image
              source={getContentsImageSource(content.id)} // 画像の取得方法を変更
              style={[styles.nftContentsContentsImage]}
            />
            <Text style={[styles.nftContentsContentsTitle]}>"{content.title}"</Text>
            <View style={[styles.nftContentsContentsText]}>
              <Text style={[styles.nftContentsContentsTextText]}>NFT額　　　　  ¥{content.nft}</Text>
              <Text style={[styles.nftContentsContentsTextText]}>再生回数　　　　{content.count}回</Text>
              <Text style={[styles.nftContentsContentsTextText]}>いいね数　　　　{content.good}回</Text>
            </View>
          </View>
        ))}
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
    height: 187.5,
    borderRadius: 15,
    position: 'relative'
  },
  nftBackgroundImage: {
    width: 300,
    height: 187.5,
    borderRadius: 15,
    position: 'absolute',
    top: 0,
    left: 0
  },
  nftBackgroundText_1: {
    fontSize: 21,
    color: '#444444',
    position: 'absolute',
    bottom: 12.5,
    left: 22,
    zIndex: 2
  },
  nftBackgroundText_2: {
    fontSize: 14,
    color: '#FF0000',
    position: 'absolute',
    bottom: 12.5,
    left: 22,
    transform: [{ translateX: 45 }, { translateY: -25 }]
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
