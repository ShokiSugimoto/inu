import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, ScrollView, Modal, TouchableOpacity, Link } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import Video from 'react-native-video';
import { useNavigation } from "@react-navigation/native";

// SQLiteデータベースのインスタンスを作成
const db = SQLite.openDatabase('inu.db');

// VideoUploadScreen コンポーネントの定義
const Upload = () => {

  const navigation = useNavigation();
  // 状態変数の定義
  const [videoUri, setVideoUri] = useState(null);
  const [loginId, setLoginId] = useState(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [tag_1, setTag_1] = useState(0);
  const [tag_2, setTag_2] = useState(0);
  const [tag_3, setTag_3] = useState(0);
  const [tag_4, setTag_4] = useState(0);
  const [tag_5, setTag_5] = useState(0);
  const [tag_6, setTag_6] = useState(0);
  const [tag_7, setTag_7] = useState(0);
  const [tag_8, setTag_8] = useState(0);
  const [tag_9, setTag_9] = useState(0);
  const [tag_10, setTag_10] = useState(0);
  const [selectedTags, setSelectedTags] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [genreModalVisible, setGenreModalVisible] = useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [firstAsset,setFirstAsset] = useState(false);
  const [assetId,setAssetId] = useState(false);
  // アップロードが完了したかどうかを管理する状態変数
  const [uploadComplete, setUploadComplete] = useState(false);

  // コンポーネントがマウントされたときの処理
  useEffect(() => {

    db.transaction(tx => {
      tx.executeSql(
        'SELECT id FROM login WHERE flg = 1;',
        [],
        (_, result) => {
          const items = result.rows._array; // データが入った配列を取得
          if (items.length > 0) {
            const loginId = items[0].id; // データが存在する場合はIDを取得
            setLoginId(loginId);
          }
        },
        (_, error) => {
          console.log('Error...', error);
        }
      );
    });
    // メディアライブラリのアクセス許可を要求する関数を呼び出す
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('カメラロールのアクセス許可が必要です。');
      } else {
        // 権限が許可されたら動画選択画面を表示
        pickVideo();
      }
    };

    // requestPermissions 関数を呼び出す
    requestPermissions();
  }, []);

  const pickVideo = async () => {
    try {
      // メディアライブラリのアクセス許可を要求する関数を呼び出す
      const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('カメラロールのアクセス許可が必要です。');
        } else {
          // 権限が許可されたら動画選択画面を表示
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
          });

          // assetsが存在する場合、最初のメディアのassetsIdを取得
          if (result.assets && result.assets.length > 0) {
            const firstAsset = result.assets[0];
            setFirstAsset(firstAsset);
            console.log(firstAsset.assetId);
            setAssetId(firstAsset.assetId);
          }

          // 動画がキャンセルされた場合は、遷移前の画面に戻る
          if (result.canceled) {
            navigation.goBack();
            return;
          }

          // 動画URIを状態にセット
          setVideoUri(result.uri);
        }
      };

      // requestPermissions 関数を呼び出す
      requestPermissions();
    } catch (error) {
      console.error('Error...', error);
    }
  };

  console.log(assetId);

  const assetIdImageSourse = (assetId) => {
    if (assetId == '5364F513-8C1A-49DF-A712-F250DF5C780D/L0/001') {
      return require('../image/contents/thumbnail_1.webp');
    }
  };

  // タグが選択されたときの処理
  const handleTagSelection = (index) => {
    // 選択されたタグの数をカウント
    const selectedCount = selectedTags.filter((isSelected) => isSelected).length;
  
    // 選択されたタグの数が5未満の場合のみ状態をトグル
    if (selectedCount < 5 || selectedTags[index]) {
      const updatedSelectedTags = [...selectedTags];
      updatedSelectedTags[index] = !updatedSelectedTags[index];
      setSelectedTags(updatedSelectedTags);
  
      // 各tag_xの状態も更新（選択されている場合は1、そうでない場合は0）
      setTag_1(updatedSelectedTags[0] ? 1 : 0);
      setTag_2(updatedSelectedTags[1] ? 1 : 0);
      setTag_3(updatedSelectedTags[2] ? 1 : 0);
      setTag_4(updatedSelectedTags[3] ? 1 : 0);
      setTag_5(updatedSelectedTags[4] ? 1 : 0);
      setTag_6(updatedSelectedTags[5] ? 1 : 0);
      setTag_7(updatedSelectedTags[6] ? 1 : 0);
      setTag_8(updatedSelectedTags[7] ? 1 : 0);
      setTag_9(updatedSelectedTags[8] ? 1 : 0);
      setTag_10(updatedSelectedTags[9] ? 1 : 0);
    }
  };

  // アップロードボタンが押されたときの処理
  const handleUpload = () => {
    console.log('assetId:', assetId);
    console.log('title:', title);
    console.log('genre:', genre);
    console.log('tag_1:', tag_1);
    console.log('tag_2:', tag_2);
    console.log('tag_3:', tag_3);
    console.log('tag_4:', tag_4);
    console.log('tag_5:', tag_5);
    console.log('tag_6:', tag_6);
    console.log('tag_7:', tag_7);
    console.log('tag_8:', tag_8);
    console.log('tag_9:', tag_9);
    console.log('tag_10:', tag_10);

    // タグの選択状態を確認して、選択されているものだけを取得
    const selectedTagsArray = tags.filter((_, index) => selectedTags[index]);

    // 必要な情報が入力されていない場合はアラートを表示して処理を中断
    if (!assetId || !title || !genre || tag_1 === null || tag_2 === null || tag_3 === null || tag_4 === null || tag_5 === null || tag_6 === null || tag_7 === null || tag_8 === null || tag_9 === null || tag_10 === null) {
      alert('動画、タイトル、ジャンル、タグを選択してください。');
      return;
    } else {
      db.transaction((tx) => {
        // genreに応じて値を設定
        const genreValue = genre === 'Relaxation' ? 're' : 'ex';

        tx.executeSql(
          'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, ranking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            loginId,
            null,
            assetId,
            title,
            genreValue,
            tag_1,
            tag_2,
            tag_3,
            tag_4,
            tag_5,
            tag_6,
            tag_7,
            tag_8,
            tag_9,
            tag_10,
            0,
            0,
            null
          ],
          (_, { insertId }) => {
            console.log('Insert success!', insertId);
          },
          (_, error) => {
            console.error('Error...', error);
          }
        );
      });
      // アップロードが完了したら状態を更新
      setUploadComplete(true);
    }
  };

  const uploadCheck = () => {
    navigation.navigate('uploadCheck');
  }

  const genres = ['Relaxation', 'Exciting'];
  const tags = ['読書', '音楽', '散歩', '瞑想', 'ヨガ', 'アート', '温泉', '映画', '友達', '趣味'];

  return (
    <View style={[styles.container]}>
      <View style={[styles.videoPreview]}>
        <Image
          source={assetIdImageSourse(assetId)}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="タイトルを入力"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <View style={styles.genreInputContainer}>
        <TouchableOpacity onPress={() => setGenreModalVisible(true)}>
          <Text style={styles.picker}>{genre || 'ジャンルを選択'}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={genreModalVisible}
          onRequestClose={() => setGenreModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {genres.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.modalText}
                  onPress={() => {
                    setGenre(item);
                    setGenreModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.tagInputContainer}>
        <TouchableOpacity onPress={() => setTagModalVisible(true)}>
          <Text style={styles.picker}>
            {selectedTags
            .map((isSelected, index) => (isSelected ? `#${tags[index]}` : null))
            .filter((tag) => tag !== null)
            .join(', ') || '#タグを選択'}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={tagModalVisible}
          onRequestClose={() => setTagModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {tags.map((item, index) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.modalText, { backgroundColor: selectedTags[index] ? 'lightblue' : 'white' }]}
                  onPress={() => handleTagSelection(index)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
              <Button title="完了" onPress={() => setTagModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
      <Button
        title="アップロード！"
        onPress={handleUpload}
        disabled={uploadComplete}
        style={{marginTop: 25}}
      />
      <Button
        title="審査へ進む"
        onPress={uploadCheck}
        disabled={ !uploadComplete }
        style={{marginTop: 5}}
      />
    </View>
  );
}

// スタイルの定義
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoPreview: {
    width: 350,
    height: 195
  },
  titleInput: {
    width: 350,
    height: 42,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .5)',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, .25)',
    marginTop: 25
  },
  genreInputContainer: {
    width: 350,
    height: 42,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .5)',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, .25)',
    marginTop: 5
  },
  tagInputContainer: {
    width: 350,
    height: 70,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .5)',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, .25)',
    marginTop: 5
  },
  picker: {
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 28,
    alignItems: 'center',
    elevation: 5
  },
  modalText: {
    marginTop: 2.5,
    marginBottom: 2.5,
    textAlign: 'center'
  }
});

// コンポーネントをエクスポート
export default Upload;
