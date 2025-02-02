import { View, Text, TextInput,Alert, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";

const LogInFile = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleInputChange = (setter) => (value) => {
    setter(value);
    if (errors) {
      setErrors(null);
    }
  };
  const handleLogIn = () => {
    setErrors(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          Alert.alert("Logged In", "Welcome to Your App!");
          router.push("/welcome");
        } else {
          setErrors("Please Verify Your Email before logging in");
        }
        setEmail("");
        setPassword("");
      })
      .catch((error) => {  // Renamed from errors to error
        const errorMessage = error.message;
        setErrors(errorMessage);
        Alert.alert("Error", errorMessage);
      });
};

  return (
    <View className="flex-1 items-center justify-center bg-slate-200 
    p-[1rem] h-[100%]">
      <Text className="text-3xl font-bold text-[#023047]">Log In</Text>
      <TextInput
        placeholder="Enter the Email"
        value={email}
        onChangeText={handleInputChange(setEmail)}
        keyboardType="email-address"
        autoCapitalize="none"
        className="bg-white p-2 rounded-[6px] w-full mt-[1rem] h-[3.2rem] text-[1.1rem] focus:border-1
       focus:ring-[#023047] "
      />
      <TextInput
        placeholder="Enter the Password"
        value={password}
        onChangeText={handleInputChange(setPassword)}
        secureTextEntry
        autoCapitalize="none"
        className="bg-white p-2 rounded-[6px] w-full mt-[1rem] h-[3.2rem] text-[1.1rem] focus:border-1
       focus:ring-[#023047] "
      />
      {errors && (
        <Text className="text-red-500 text-[12px] mt-[1rem]">
          {errors}
        </Text>
      )}
      <TouchableOpacity
        className="bg-yellow-400 px-4 py-2 mt-[1rem] rounded-[8px] w-full"
        onPress={handleLogIn}
      >
        <Text className="text-[1.2rem] font-bold text-center text-[#023047]">
          Log In
        </Text>
      </TouchableOpacity>
      <View className=" flex-row mt-[1.5rem]">
        <Text className="text-[1.1rem]">If already have n't an account ? </Text>
        <TouchableOpacity
          className="pt-[-4px]"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="font-bold text-[1.1rem] text-[#023047]">SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogInFile;
