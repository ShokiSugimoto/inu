import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [furigana, setFurigana] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [furiganaError, setFuriganaError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    // Reset error messages
    setFirstNameError("");
    setLastNameError("");
    setFuriganaError("");
    setGenderError("");
    setEmailError("");
    setPasswordError("");

    // Validation
    if (!firstName) {
      setFirstNameError("Please enter your first name");
    }

    if (!lastName) {
      setLastNameError("Please enter your last name");
    }

    if (!furigana) {
      setFuriganaError("Please enter your furigana");
    }

    if (!gender) {
      setGenderError("Please select your gender");
    }

    if (!email) {
      setEmailError("Please enter your email");
    }

    if (!password) {
      setPasswordError("Please enter your password");
    }

    // If any field is empty, stop here
    if (!firstName || !lastName || !furigana || !gender || !email || !password) {
      return;
    }

    // Handle login logic here
    console.log("Logging in with:", firstName, lastName, furigana, gender, email, password);
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    setGenderError(""); // Clear gender error when a selection is made
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>登録画面</Text>

      {/* First Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="姓"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            setFirstNameError(""); // Clear error when user types
          }}
        />
      </View>
      {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

      {/* Last Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="名"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            setLastNameError(""); // Clear error when user types
          }}
        />
      </View>
      {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

      {/* Furigana Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="姓と名のフリガナ"
          value={furigana}
          onChangeText={(text) => {
            setFurigana(text);
            setFuriganaError(""); // Clear error when user types
          }}
        />
      </View>
      {furiganaError ? <Text style={styles.errorText}>{furiganaError}</Text> : null}

      {/* Gender Selection */}
      <View style={styles.inputContainer}>
        <Text>性別：</Text>
        <TouchableOpacity
          style={[styles.radio, gender === "male" && styles.selectedRadio]}
          onPress={() => handleGenderSelection("male")}
        >
          <Text>男</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radio, gender === "female" && styles.selectedRadio]}
          onPress={() => handleGenderSelection("female")}
        >
          <Text>女</Text>
        </TouchableOpacity>
      </View>
      {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}

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
        <Text style={styles.buttonText}>登録</Text>
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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  radio: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    borderRadius: 5,
  },
  selectedRadio: {
    backgroundColor: "lightgray",
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
});

export default Login;
