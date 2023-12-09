import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';  // Import ImagePicker

// SQLiteデータベースの作成
const db = SQLite.openDatabase("inu.db");

// ユーザーテーブルの作成
db.transaction((tx) => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS user 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_name TEXT, 
      name TEXT, 
      image TEXT, 
      pass TEXT);`
  );
});

const Login = ({}) => {
  const [user_name, setuser_name] = useState("");
  const [name, setname] = useState("");
  const [pass, setpass] = useState("");
  const [image, setimage] = useState(null);  // Change type to ImagePickerResponse
  const [showPassword, setShowPassword] = useState("");

  const [user_nameError, setuser_nameError] = useState("");
  const [nameError, setnameError] = useState("");
  const [passError, setpassError] = useState("");
  const [imageError, setimageError] = useState("");
  const navigation = useNavigation();

  // Handle image pick
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Use assets array to access selected assets
        const pickedImage = result.assets[0];
        
        if (pickedImage) {
          // If the user selects an image, set the image state
          setimage(pickedImage);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleLogin = async () => {
    // Reset error messages
    setnameError("");
    setpassError("");
    setimageError("");
    setuser_nameError("");

    // Validation
    if (!user_name) {
      setuser_nameError("ユーザーIDをご入力ください");
    }

    if (!name) {
      setnameError("お名前をご入力ください");
    }

    if (!pass) {
      setpassError("パスワードをご入力ください");
    }

    if (!image?.uri) {
      setimageError("選択された画像が無効です");
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
      // Check if the user_name already exists in the database
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM user WHERE user_name = ?;`,
          [user_name],
          (_, { rows }) => {
            if (rows.length > 0) {
              // user_name already exists, set an error message
              setuser_nameError("登録済みのID");
            } else {
              // user_name doesn't exist, proceed with the registration
              db.transaction((tx) => {
                tx.executeSql(
                  `INSERT INTO user (user_name, name, pass, image) 
                  VALUES (?, ?, ?, ?);`,
                  [user_name, name, pass, image.uri],
                  (_, { rows }) => {
                    console.log("ユーザーが正常に挿入されました:", rows);
                    // Optional: Add additional logic or navigation here
                  },
                  (_, error) => {
                    console.error("ユーザーの挿入中にエラーが発生しました:", error);
                  }
                );
              });

              const user = {
                user_name,
                name,
                pass,
                image: image.uri,
              };
          
              // Save user information to AsyncStorage
              AsyncStorage.setItem('userInfo', JSON.stringify(user)).then(() => {
                // Navigate the user to the next screen
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
      <Text style={styles.title}>登録画面</Text>

      {/* user_name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ID"
          value={user_name}
          onChangeText={(text) => {
            setuser_name(text);
            setuser_nameError(""); // Clear error when user types
          }}
        />
      </View>
      {user_nameError ? <Text style={styles.errorText}>{user_nameError}</Text> : null}

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="お名前"
          value={name}
          onChangeText={(text) => {
            setname(text);
            setnameError(""); // Clear error when user types
          }}
        />
      </View>
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="パスワード"
          value={pass}
          secureTextEntry={!showPassword}
          onChangeText={(text) => {
            setpass(text);
            setpassError(""); // Clear error when user types
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

      {/* Image Input */}
      <TouchableOpacity style={styles.inputContainer} onPress={handleImagePick}>
        {image ? (
          <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
        ) : (
          <Text style={styles.uploadText}>写真をアップロード</Text>
        )}
      </TouchableOpacity>
      {imageError ? <Text style={styles.errorText}>{imageError}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>登録</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate('UserDataScreen')}
      >
        <Text style={styles.linkText}>user list</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: "20%",
  },  
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginLeft: 75,
    marginTop: 10,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  uploadText: {
    fontSize: 16,
    color: "blue",
  },
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
