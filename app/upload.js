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
  const [tag, setTag] = useState('');
  const [genreModalVisible, setGenreModalVisible] = useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [databaseExists, setDatabaseExists] = useState(false);

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

          console.log(result);

          // 動画がキャンセルされた場合は、遷移前の画面に戻る
          if (result.canceled) {
            console.log('Go back');
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

  // アップロードボタンが押されたときの処理
  const handleUpload = () => {
    console.log('videoUri:', videoUri);
    console.log('title:', title);
    console.log('genre:', genre);
    console.log('tag:', tag);

    // 必要な情報が入力されていない場合はアラートを表示して処理を中断
    if (!videoUri || !title || !genre || !tag) {
      alert('動画、タイトル、ジャンル、タグを選択してください。');
      return;
    } else {
      db.transaction((tx) => {
        // genreに応じて値を設定
        const genreValue = genre === 'Relaxation' ? 're' : 'ex';

        // タグに関する処理
        const tagsValues = {};
        // 仮に全てのタグを初期化
        for (let i = 1; i <= 10; i++) {
          tagsValues[`tag_${i}`] = 0;
        }

        // 選択されたタグを設定
        const selectedTags = ['review_1', 'review_2', 'review_3', 'review_4', 'review_5', 'review_6', 'review_7', 'review_8', 'review_9', 'review_10'];
        selectedTags.forEach((tag, index) => {
          tagsValues[`tag_${index + 1}`] = 1;
        });

        tx.executeSql(
          'INSERT INTO contents (user_id, thumbnail, movie, title, genre, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, nft, count, ranking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [loginId, null, videoUri, title, genreValue, tagsValues.tag_1, tagsValues.tag_2, tagsValues.tag_3, tagsValues.tag_4, tagsValues.tag_5, tagsValues.tag_6, tagsValues.tag_7, tagsValues.tag_8, tagsValues.tag_9, tagsValues.tag_10, null, null, null],
          (_, { insertId }) => {
            console.log('Insert seccess!', insertId);
            // アップロード成功後、状態をリセット
            setTitle('');
            setGenre('');
            setTag('');
          },
          (_, error) => {
            console.error('Error...', error);
          }
        );
      });
    }
  };

  const genres = ['Relaxation', 'Exciting'];
  const tags = ['review_1', 'review_2', 'review_3', 'review_4', 'review_5', 'review_6', 'review_7', 'review_8', 'review_9', 'review_10'];

  // タグが選択されたときの処理
  const handleTagSelection = (tag) => {
    // もしすでに選択されている場合は選択解除、そうでない場合は選択
    if (selectedTags.length < 5) {
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.includes(tag)
          ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
          : [...prevSelectedTags, tag]
      );
    } else if (selectedTags.includes(tag)) {
      // 既に選択されたタグを選択解除する場合は制限なし
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    }
  };

  // 完了ボタンが押されたときの処理
  const handleTagModalDone = () => {
    // 選択されたタグをセットする
    setTag(selectedTags.join(', '));
    // タグモーダルを閉じる
    closeTagModal();
  };

  return (
    <View style={[styles.container]}>
      {videoUri && (
        <View>
          {/* 選択された動画の表示 */}
          <Video
            source={{ uri: videoUri }}
            style={[styles.videoPreview]}
            controls={true} // ビデオコントロールを表示
            resizeMode="cover" // アスペクト比を維持したまま画面いっぱいに表示
          />
        </View>
      )}
      <View style={[styles.videoPreview]}></View>
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
            {selectedTags.length > 0
              ? `選択されたタグ: ${selectedTags.map((tag) => `#${tag}`).join(', ')}`
              : '#タグを選択'}
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
              {tags.map((item2) => (
                <TouchableOpacity
                  key={item2}
                  style={[
                    styles.modalText,
                    selectedTags.includes(item2) && styles.selectedTag,
                  ]}
                  onPress={() => handleTagSelection(item2)}
                >
                  <Text>{item2}</Text>
                </TouchableOpacity>
              ))}
              <Button title="完了" onPress={() => setTagModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
      <Button title="アップロード！" onPress={handleUpload} />
      <Button
        title="審査へ進む"
        onPress={() => navigation.navigate('VideoCheck')}
        disabled={!videoUri || !genre || !title}
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
    width: 160,
    height: 90,
    backgroundColor: 'rgba(000, 000, 000, .25)'
  },
  titleInput: {
    width: 300,
    height: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .5)',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, .25)'
  },
  genreInputContainer: {
    width: 300,
    height: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .5)',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, .25)'
  },
  tagInputContainer: {
    width: 300,
    height: 70,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .5)',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, .25)'
  },
  selectedTag: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)', // 選択されたタグの背景色
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
    textAlign: 'center'
  }
});

// コンポーネントをエクスポート
export default Upload;
