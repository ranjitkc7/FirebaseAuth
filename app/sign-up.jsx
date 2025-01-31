import {
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithCredential,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect, use } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../global.css";
import { useRouter } from "expo-router";

const SignUpFile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (setter) => (value) => {
    setter(value);
    if (errors) {
      setErrors(null);
    }
  };
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password, name, confirmPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(user)
          .then(() => {
            Alert.alert(
              "Email Verification Sent",
              "Check your inbox for the verification link."
            );
            setEmailSent(true);
          })
          .catch((error) => {
            setErrors("Error sending email verification");
            Alert.alert("Error", error.message);
          });
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
      })
      .catch((errors) => {
        const errorMessage = errors.message;
        setErrors(errorMessage);
        Alert.alert("Error", errorMessage);
      });
  };
  const router = useRouter();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "307017158113-earam0q4gk7omkmescl2o5rptqdg0ncq.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleSignIn();
    }
  }, [response]);
  const handleGoogleSignIn = async () => {
    try {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
        Alert.alert("Success", "Logged in with Google!");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View
      className="flex:1 justify-center items-center h-[100%]
    bg-slate-200 p-[1rem]"
    >
      <Text className="text-3xl font-bold text-[#023047]">Sign Up </Text>
      <TextInput
        placeholder="Enter the Username"
        value={name}
        onChangeText={handleInputChange(setName)}
        placeholderTextColor="#023047"
        className="bg-white p-2 rounded-[6px] w-full mt-[1rem] h-[3.2rem] text-[1.1rem] focus:border-1
       focus:ring-[#023047] "
      />
      <TextInput
        placeholder="Enter the Email"
        value={email}
        onChangeText={handleInputChange(setEmail)}
        keyboardType="email-address"
        placeholderTextColor="#023047"
        className="bg-white p-2 rounded-[6px] w-full mt-[1rem] h-[3.2rem] text-[1.1rem] focus:border-2
       focus:ring-[#023047] "
      />
      <TextInput
        placeholder="Enter the Password"
        value={password}
        onChangeText={handleInputChange(setPassword)}
        secureTextEntry
        placeholderTextColor="#023047"
        className="bg-white p-2 rounded-[8px] w-full mt-[1rem] h-[3.2rem] text-[1.1rem] focus:border-2
       focus:ring-2 focus:ring-[#023047] "
      />
      <TextInput
        placeholder="Re-Enter the Password"
        value={confirmPassword}
        onChangeText={handleInputChange(setConfirmPassword)}
        placeholderTextColor="#023047"
        secureTextEntry
        className="bg-white p-2 rounded-[6px] w-full mt-[1rem] h-[3.2rem] text-[1.1rem] focus:border-2
       focus:ring-[#023047] "
      />
      {!emailSent && (
        <TouchableOpacity
          className="bg-yellow-400 px-4 py-2 mt-[1rem] rounded-[8px] w-full"
          onPress={handleSignUp}
        >
          <Text className="text-[1.2rem] font-bold  text-center text-[#023047]">
            Sign Up
          </Text>
        </TouchableOpacity>
      )}
      {emailSent && (
        <Text className="text-[12px] mt-[12px] font-[600] text-center text-[#023047]">
          Please check your inbox for the verification link.
        </Text>
      )}
      <TouchableOpacity
        className="bg-[#023047] px-4 py-2 mt-[1rem] rounded-[8px] w-full  flex-row justify-center items-center"
        onPress={() => promptAsync()}
      >
        <Image
          source={require("../assets/logo11.png")}
          className="w-[1.5rem] h-[1.5rem] mr-[1rem]"
        />
        <Text className="text-[1.2rem] font-bold text-center text-white">
          Continue with Google
        </Text>
      </TouchableOpacity>
      <View className=" flex-row mt-[1.5rem]">
        <Text className="text-[1.1rem]">If already have an account ? </Text>
        <TouchableOpacity
          className="pt-[-4px]"
          onPress={() => router.push("/log-in")}
        >
          <Text className="font-bold text-[1.1rem] text-[#023047]">LogIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpFile;
