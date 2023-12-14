import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

const SignUp = () => {

  // SQLiteデータベースのオープン
  const db = SQLite.openDatabase("inu.db");
  // ステートの初期化
  const [user_name, setuser_name] = useState("");
  const [name, setname] = useState("");
  const [pass, setpass] = useState("");
  const [image, setimage] = useState(null); // ImagePickerResponse型に変更
  const [showPassword, setShowPassword] = useState("");

  // エラーメッセージ用のステート
  const [user_nameError, setuser_nameError] = useState("");
  const [nameError, setnameError] = useState("");
  const [passError, setpassError] = useState("");
  const [imageError, setimageError] = useState("");


  // React Navigationのナビゲーションオブジェクト
  const navigation = useNavigation();

  // 画像選択処理
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // 選択された画像をステートに設定
        const pickedImage = result.assets[0];
        
        if (pickedImage) {
          setimage(pickedImage);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // 登録処理
  const handleLogin = async () => {
    // エラーメッセージをリセット
    setnameError("");
    setpassError("");
    setimageError("");
    setuser_nameError("");

    // バリデーション
    if (!user_name) {
      setuser_nameError("ユーザー名を入力してください。");
    }

    if (!name) {
      setnameError("名前を入力してください。");
    }

    if (!pass) {
      setpassError("パスワード入力してください。");
    }

    if (!image?.uri) {
      setimageError("選択された画像が無効です。");
    }

    if (
      user_name.trim() === "" ||
      name.trim() === "" ||
      pass.trim() === "" ||
      !image?.uri
    ) {
      return;
    }

    try {
      // データベース中に既に同じユーザーIDが存在するか確認
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM user WHERE user_name = ?;`,
          [user_name],
          (_, { rows }) => {
            if (rows.length > 0) {
              // ユーザーIDが既に存在する場合はエラーメッセージを設定
              setuser_nameError("登録済みのID");
            } else {
              // ユーザーIDが存在しない場合は登録処理を実行
              db.transaction((tx) => {
                tx.executeSql(
                  `INSERT INTO user (user_name, name, pass, image) 
                  VALUES (?, ?, ?, ?);`,
                  [user_name, name, pass, image.uri],
                  (_, { rows }) => {
                    console.log("ユーザーが正常に挿入されました:", rows);
                    // 任意: ここに追加のロジックやナビゲーションを追加
                  },
                  (_, error) => {
                    console.error("ユーザーの挿入中にエラーが発生しました:", error);
                  }
                );
              });

              // 登録したユーザー情報をAsyncStorageに保存
              const user = {
                user_name,
                name,
                pass,
                image: image.uri,
              };
              
              AsyncStorage.setItem('userInfo', JSON.stringify(user)).then(() => {
                // ユーザーを次の画面にナビゲート
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'loading_2' }],
                });
              });
            }
          },
          (_, error) => {
            console.error("Error checking user_name existence:", error);
          }
        );
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* user_name入力 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ユーザー名"
          value={user_name}
          onChangeText={(text) => {
            setuser_name(text);
            setuser_nameError(""); // ユーザーが入力するとエラーメッセージをクリア
          }}
        />
      </View>
      {user_nameError ? <Text style={styles.errorText}>{user_nameError}</Text> : null}

      {/* 名前入力 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="名前"
          value={name}
          onChangeText={(text) => {
            setname(text);
            setnameError(""); // ユーザーが入力するとエラーメッセージをクリア
          }}
        />
      </View>
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      {/* パスワード入力 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="パスワード"
          value={pass}
          secureTextEntry={!showPassword}
          onChangeText={(text) => {
            setpass(text);
            setpassError(""); // ユーザーが入力するとエラーメッセージをクリア
          }}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {passError ? <Text style={styles.errorText}>{passError}</Text> : null}

      {/* 画像入力 */}
      <TouchableOpacity style={styles.inputContainer} onPress={handleImagePick}>
        {image ? (
          <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
        ) : (
          <Text style={styles.uploadText}>プロフィール画像を選択</Text>
        )}
      </TouchableOpacity>
      {imageError ? <Text style={styles.errorText}>{imageError}</Text> : null}

      {/* 登録ボタン */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>登録</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
  },
  inputContainer: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 250,
    borderColor: "rgba(000, 000, 000, .25)",
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 7,
    borderRadius: 5,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: "20%",
  },  
  button: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 56,
    paddingRight: 56,
    backgroundColor: "#000000",
    borderRadius: 250,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 21,
  },
  errorText: {
    color: "#FF0000",
  },
  uploadText: {
    fontSize: 18.5,
    color: "blue",
    marginTop: 0
  },
});
