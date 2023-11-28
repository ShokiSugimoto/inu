import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    // Reset error messages
    setEmailError("");
    setPasswordError("");

    // Validation
    if (!email) {
      setEmailError("Please enter your email");
    }

    if (!password) {
      setPasswordError("Please enter your password");
    }

    // If either email or password is empty, stop here
    if (!email || !password) {
      return;
    }

    // Handle login logic here
    console.log("Logging in with:", email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログイン画面</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(""); // Clear error when user types
          }}
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(""); // Clear error when user types
          }}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Login Button */}
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
});

export default Login;
