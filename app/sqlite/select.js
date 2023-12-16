// テーブルデータ確認用(LOGで確認)

import React, { useState } from "react";
import * as SQLite from 'expo-sqlite';
import { View } from 'react-native';
import { Button } from "react-native-paper";

const Sqlite = () => {

  const db = SQLite.openDatabase('inu.db');
  const [user, setItems] = useState([]);
  const handlePress = () => {
    db.transaction((tx) => {

      // userテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM user;',
        [],
        (_, result) => {
          const items = result.rows._array;
          setItems(items);
          console.log('\n');
          console.log(`[user]:${items.length}件`);
          for (let i = 0; i < items.length; i++) {
            const { id, user_name, name, image, pass } = items[i];
            console.log(`ID:${id}, ユーザー名:@${user_name}, 名前:${name}, プロフィール画像パス:${image}, パスワード:${pass}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      // loginテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM login;',
        [],
        (_, result) => {
          const items2 = result.rows._array;
          setItems(items2);
          console.log('\n');
          console.log(`[login(flg確認用)]:${items2.length}件`);
          for (let i = 0; i < items2.length; i++) {
            const { id, flg } = items2[i];
            console.log(`ID:${id}, flg:${flg}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      // contentsテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM contents;',
        [],
        (_, result) => {
          const items3 = result.rows._array;
          setItems(items3);
          console.log('\n');
          console.log(`[contents]:${items3.length}件`);
          for (let i = 0; i < items3.length; i++) {
            const { id, user_id, thumbnail, movie, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, title, nft, count, good } = items3[i];
            console.log(`ID:${id}, 投稿者ID:${user_id}, サムネイル画像パス:${thumbnail}, 動画パス:${movie}, タイトル:${title}, ジャンル:${genre}, タグ1:${tag_1}, タグ2:${tag_2}, タグ3:${tag_3}, タグ4:${tag_4}, タグ5:${tag_5}, タグ6:${tag_6}, タグ7:${tag_7}, タグ8:${tag_8}, タグ9:${tag_9}, タグ10:${tag_10}, NFT額:${nft}, 再生数:${count} いいね数:${good}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      // genreテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM genre;',
        [],
        (_, result) => {
          const items7 = result.rows._array;
          setItems(items7);
          console.log('\n');
          console.log(`[genre]:${items7.length}件`);
          for (let i = 0; i < items7.length; i++) {
            const { id, re, ex } = items7[i];
            console.log(`ID:${id}, リラクゼーション:${re}, エキサイティング:${ex}`);
          }
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );

      // tagテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM tag;',
        [],
        (_, result) => {
          const items8 = result.rows._array;
          setItems(items8);
          console.log('\n');
          console.log(`[tag]:${items8.length}件`);
          for (let i = 0; i < items8.length; i++) {
            const { id, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10 } = items8[i];
            console.log(`ID:${id}, タグ1:${tag_1}, タグ2:${tag_2}, タグ3:${tag_3}, タグ4:${tag_4}, タグ5:${tag_5}, タグ6:${tag_6}, タグ7:${tag_7}, タグ8:${tag_8}, タグ9:${tag_9}, タグ10:${tag_10}`);
          }
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );

      // contentsSelectテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM contentsSelect;',
        [],
        (_, result) => {
          const items4 = result.rows._array;
          setItems(items4);
          console.log('\n');
          console.log(`[contentsSelect]:${items4.length}件`);
          for (let i = 0; i < items4.length; i++) {
            const { id, flg } = items4[i];
            console.log(`ID:${id}, flg:${flg}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      // followテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM follow;',
        [],
        (_, result) => {
          const items5 = result.rows._array;
          setItems(items5);
          console.log('\n');
          console.log(`[follow]:${items5.length}件`);
          for (let i = 0; i < items5.length; i++) {
            const { id, login_id, contents_id } = items5[i];
            console.log(`ID:${id}, ログインユーザーID:${login_id}, 投稿者ID:${contents_id}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );

      // followテーブルデータ確認用
      tx.executeSql(
        'SELECT * FROM mylist;',
        [],
        (_, result) => {
          const items6 = result.rows._array;
          setItems(items6);
          console.log('\n');
          console.log(`[mylist]:${items6.length}件`);
          for (let i = 0; i < items6.length; i++) {
            const { id, login_id, contents_id } = items6[i];
            console.log(`ID:${id}, ログインユーザーID:${login_id}, 投稿者ID:${contents_id}`);
          }
        },
        (_, error) => {
          console.log('Error...');
        }
      );      
    });
  };

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={handlePress}
        style={{ width: 40, height: 30, backgroundColor: 'rgba(255, 255, 255, .5)', marginBottom: 50 }}
      />
    </View>
  );
}

export default Sqlite;
