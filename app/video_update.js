import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, ScrollView, Modal, TouchableOpacity, Link } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const db = SQLite.openDatabase('animations.db');

const VideoUploadScreen = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [genre, setGenre] = useState('');
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [databaseExists, setDatabaseExists] = useState(false);

  useEffect(() => {
    checkAndCreateDatabase();
    requestMediaLibraryPermissions();
  }, []);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('カメラロールのアクセス許可が必要です。');
    }
  };

  const checkAndCreateDatabase = async () => {
    try {
      const info = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/animations.db');
      setDatabaseExists(info.exists);
      if (!info.exists) {
        // 数据库不存在，创建数据库和表
        db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS animations (id INTEGER PRIMARY KEY AUTOINCREMENT, videoUri TEXT, genre TEXT, title TEXT);',
            [],
            () => {
              console.log('Table "animations" created successfully');
            },
            (_, error) => {
              console.error('Error creating table:', error);
            }
          );
        });
      }
    } catch (error) {
      console.error('Error checking and creating database:', error);
    }
  };

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setVideoUri(result.uri);
      }
    } catch (error) {
      console.error('動画の選択時にエラーが発生しました:', error);
    }
  };

  const handleUpload = () => {
    if (!videoUri || !genre || !title) {
      alert('動画、ジャンル、およびタイトルを選択してください。');
      return;
    }
  
    // 使用 Promise 确保数据库表已经创建完毕再执行插入操作
    new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS animations (id INTEGER PRIMARY KEY AUTOINCREMENT, videoUri TEXT, genre TEXT, title TEXT);',
          [],
          () => {
            console.log('Table "animations" created successfully');
            resolve(); // 表创建完成后解析 Promise
          },
          (_, error) => {
            console.error('Error creating table:', error);
            resolve(); // 出错也解析 Promise，以免阻塞后续操作
          }
        );
      });
    }).then(() => {
      // 将动画信息插入 SQLite 数据库
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO animations (videoUri, genre, title) VALUES (?, ?, ?)',
          [videoUri, genre, title],
          (_, { insertId }) => {
            console.log('動画が正常にアップロードされました。ID:', insertId);
            // 上传成功后，重置状态
            setVideoUri(null);
            setGenre('');
            setTitle('');
          },
          (_, error) => {
            console.error('動画のアップロード中にエラーが発生しました:', error);
          }
        );
      });
    });
  };

  const genres = ["アクション", "コメディ", "ドラマ", "SF", "ファンタジー", "アニメ", "その他"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>動画アップロード</Text>

      <Button title="動画を選択" onPress={pickVideo} />

      {videoUri && (
        <View>
          <Text style={styles.label}>選択した動画:</Text>
          <Text>{videoUri}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ジャンル:</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.picker}>{genre || 'ジャンルを選択'}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {genres.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.modalText}
                  onPress={() => {
                    setGenre(item);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>タイトル:</Text>
        <TextInput
          style={styles.input}
          placeholder="動画のタイトルを入力"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>

      <Button title="アップロード" onPress={handleUpload} />
      <Button
        title="次へ"
        onPress={() => navigation.navigate('VideoCheck')} 
        disabled={!videoUri || !genre || !title}
      />

    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  videoPreview: {
    width: 300,
    height: 200,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: 300,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
    marginBottom:10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default VideoUploadScreen;
