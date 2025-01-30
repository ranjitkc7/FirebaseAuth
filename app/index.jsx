import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import "../global.css";
import { useRouter } from "expo-router";

const HomePage = () => {
  const router = useRouter();
  return (
    <View
      className="flex-1 items-center justify-center bg-slate-300 h-[100%]
       p-[1rem]"
    >
      <Text className="text-3xl font-bold text-[#023047]">Welcome!</Text>
      <Text className="text-[1.2rem]  text-[#023047]">
        Welcome, to our App! Explore our Features
      </Text>
      <TouchableOpacity
        className="bg-yellow-400 px-4 py-2 mt-[1rem]
      rounded-[8px] w-[8rem]"
        onPress={() => router.push("/sign-up")}
      >
        <Text
          className=" text-[1.2rem] text-center font-bold 
        text-[#023047]"
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
