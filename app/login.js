// import React, { useState } from "react";
// import { StyleSheet, View, TextInput, TouchableOpacity, Text, Dimensions } from "react-native";
// import { Feather } from "@expo/vector-icons";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handleLogin = () => {
//     // Reset error messages
//     setEmailError("");
//     setPasswordError("");

//     // Validation
//     if (!email) {
//       setEmailError("Please enter your email");
//     }

//     if (!password) {
//       setPasswordError("Please enter your password");
//     }

//     // If either email or password is empty, stop here
//     if (!email || !password) {
//       return;
//     }

//     // Handle login logic here
//     console.log("Logging in with:", email, password);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>ログイン画面</Text>

//       {/* Email Input */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={(text) => {
//             setEmail(text);
//             setEmailError(""); // Clear error when user types
//           }}
//         />
//       </View>
//       {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//       {/* Password Input */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           secureTextEntry={!showPassword}
//           onChangeText={(text) => {
//             setPassword(text);
//             setPasswordError(""); // Clear error when user types
//           }}
//         />
//         <TouchableOpacity
//           style={styles.showPasswordButton}
//           onPress={() => setShowPassword(!showPassword)}
//         >
//           <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

//       {/* Login Button */}
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>ログイン</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     marginTop: 20,
//   },
//   input: {
//     height: 40,
//     width: 250,
//     borderColor: "gray",
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//   },
//   showPasswordButton: {
//     marginLeft: -30,
//   },
//   button: {
//     backgroundColor: "#000",
//     padding: 15,
//     borderRadius: 10,
//     width: 200,
//     alignItems: "center",
//     marginTop: 30,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//   },
//   errorText: {
//     color: "red",
//     marginLeft: 80,
//     textAlign: "left",
//     alignSelf: "flex-start",
//   },
// });

// export default Login;


import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = SQLite.openDatabase('inu.db');

const Login = () => {
  const [user_name, setuser_name] = useState("");
  const [pass, setpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [user_nameError, setuser_nameError] = useState("");
  const [passError, setpassError] = useState("");

  const navigation = useNavigation(); // 获取导航对象

  useEffect(() => {
    // 在这里执行数据库初始化等操作
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT,  user_name TEXT, name TEXT, image TEXT, pass TEXT);'
      );
    });
  }, []);

  const handleLogin = () => {
    // 重置错误消息
    setuser_nameError("");
    setpassError("");

    // 验证
    if (!user_name) {
      setuser_nameError("メールアドレスをご入力ください");
    }

    if (!pass) {
      setpassError("パスワードをご入力ください");
    }

    if (user_name.trim() === "") {
      setuser_nameError("メールアドレスをご入力ください");
    }
    
    if (pass.trim() === "") {
      setpassError("パスワードをご入力ください");
    }

    if (
      user_name.trim() === "" ||
      pass.trim() === ""
    ) {
      return;
    }

    // 如果邮箱或密码为空，则停止
    if (!user_name || !pass) {
      return;
    }

    // 检查登录凭据
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user WHERE user_name = ? AND pass = ?',
        [user_name, pass],
        (_, { rows }) => {
          if (rows.length > 0) {
            const user = rows.item(0); // 获取第一个匹配的用户
            storeUserInfo(user); // 将用户信息存储到 AsyncStorage
            // 登录成功，导航到目标屏幕
            // navigation.navigate("loading_2", { userInfo }); // 将 "TargetScreen" 替换为您的目标屏幕名称
            navigation.reset({
              index: 0,
              routes: [{ name: 'loading_2', params: { userInfo } }],
            });
          } else {
            // 登录失败
            setuser_nameError("メールアドレスもしくはパスワードエラー");
          }
        },
        (_, error) => {
          console.error('エラー:', error);
        }
      );
    });
  };

  const storeUserInfo = async (userInfo) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error storing user info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログイン画面</Text>

      {/* user_name 输入 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ユーザーID"
          value={user_name}
          onChangeText={(text) => {
            setuser_name(text);
            setuser_nameError(""); // 用户输入时清除错误
          }}
        />
      </View>
      {user_nameError ? <Text style={styles.errorText}>{user_nameError}</Text> : null}

      {/* 密码输入 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="パスポート"
          value={pass}
          secureTextEntry={!showPassword}
          onChangeText={(text) => {
            setpass(text);
            setpassError(""); // 用户输入时清除错误
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

      {/* 登录按钮 */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ログイン</Text>
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
    marginTop: 20,
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
    marginLeft: -30,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginLeft: 80,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  errorText_1: {
    color: "red",
    marginLeft: 60,
    textAlign: "left",
    alignSelf: "flex-start",
  }
});

export default Login;