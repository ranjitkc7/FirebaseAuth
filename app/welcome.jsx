import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

const welcome = () => {
  const router = useRouter();
  return (
    <View className='flex-1 items-center justify-center bg-slate-300 
    h-[100%] p-[1rem]'>
      <Text className="text-3xl font-bold text-[#023047]">
        Welcome! 
      </Text>
      <TouchableOpacity className="bg-yellow-400 px-4 py-2 mt-[1rem] rounded-[8px]
       w-full"
        onPress={() => router.push("/realtime")}
       >
        <Text className="text-[1.2rem] text-center font-[700]
         text-[#023047]">Explore the Realtime Database</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-yellow-400 px-4 py-2 mt-[1rem] rounded-[8px]
       w-full"
        onPress={() => router.push("/firestore")}
       >
        <Text className="text-[1.2rem] text-center font-[700] 
        text-[#023047]">Explore the Firestore Database</Text>
      </TouchableOpacity>
    </View>
  )
}

export default welcome