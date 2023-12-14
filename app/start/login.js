import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

  const db = SQLite.openDatabase('inu.db');
  // State Hooks を使用して状態を管理
  const [user_name, setuser_name] = useState("");
  const [pass, setpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // バリデーションエラーのステート
  const [user_nameError, setuser_nameError] = useState("");
  const [passError, setpassError] = useState("");

  // ナビゲーションオブジェクトの取得
  const navigation = useNavigation();

  // useEffect フックを使用してコンポーネントの初回レンダリング時にデータベースの初期化を行う
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT,  user_name TEXT, name TEXT, image TEXT, pass TEXT);'
      );
    });
  }, []);

  // ログイン処理
  const handleLogin = () => {
    // エラーメッセージのリセット
    setuser_nameError("");
    setpassError("");

    // 入力値のバリデーション
    if (!user_name) {
      setuser_nameError("ユーザー名を入力してください。");
    }

    if (!pass) {
      setpassError("パスワードを入力してください。");
    }

    if (user_name.trim() === "") {
      setuser_nameError("ユーザー名を入力してください。");
    }
    
    if (pass.trim() === "") {
      setpassError("パスワードを入力してください。");
    }

    if (
      user_name.trim() === "" ||
      pass.trim() === ""
    ) {
      return;
    }

    // ユーザー名とパスワードでログイン情報をデータベースから検索
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user WHERE user_name = ? AND pass = ?',
        [user_name, pass],
        (_, { rows }) => {
          if (rows.length > 0) {
            const user = rows.item(0); // 最初のユーザー情報を取得
            console.log(user_name);
            storeUserInfo(user); // ユーザー情報をAsyncStorageに保存
            tx.executeSql(
              'UPDATE login SET flg = 0 WHERE flg = 1;',
              [],
              (_, updateResult) => {
                tx.executeSql(
                  'UPDATE login SET flg = 1 WHERE id IN (SELECT user.id FROM user WHERE user_name = ?);',
                  [user_name],
                  (_, updateResult) => {
                    console.log('Update success!');
                  },
                  (_, updateError) => {
                    console.log('Error...');
                  }
                );
              },
              (_, updateError) => {
                console.log('Error...');
              }
            );
            // ログイン成功時、指定の画面にナビゲーション
            navigation.reset({
              index: 0,
              routes: [{ name: 'loading_2', params: { userInfo } }],
            });
          } else {
            // ログイン失敗時のエラー処理
            setuser_nameError("メールアドレスもしくはパスワードエラー");
          }
        },
        (_, error) => {
          console.error('エラー:', error);
        }
      );
    });
  };

  // ユーザー情報をAsyncStorageに保存
  const storeUserInfo = async (userInfo) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error storing user info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      {/* ユーザー名入力 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ユーザー名"
          value={user_name}
          onChangeText={(text) => {
            setuser_name(text);
            setuser_nameError(""); // ユーザーが入力するとエラーをクリア
          }}
        />
      </View>
      {user_nameError ? <Text style={styles.errorText}>{user_nameError}</Text> : null}

      {/* パスワード入力 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="パスワード"
          value={pass}
          secureTextEntry={!showPassword}
          onChangeText={(text) => {
            setpass(text);
            setpassError(""); // ユーザーが入力するとエラーをクリア
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

      {/* ログインボタン */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

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
});
