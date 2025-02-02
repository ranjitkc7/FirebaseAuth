import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { firestoreDB } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
const FirestoreFile = () => {
    const[title, setTitle] = useState("");
    const[message, setMessage] = useState("");

    const handleSubmit = async () => {
        if(!title || !message){
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try{
            await addDoc(collection(firestoreDB, 'contacts'), {
                title,
                message,
                createdAt: new Date(), 
            })
            Alert.alert('Success', 'Your message has been sent');
            setTitle('');
            setMessage('');
        }catch(error){
            Alert.alert('Error', error.message);
            console.log(error);
        }
    }
  return (
    <View className='flex-1 items-center justify-center bg-slate-200 
     h-[100%] p-[1rem]'>
      <Text className='text-3xl font-bold text-[#023047]' >Contact UP Form</Text>
      <TextInput
              placeholder="Enter your title"
              value={title}
              onChangeText={setTitle}
              className="bg-white h-[3rem] rounded-[8px] p-[8px] w-full focus:border-[1px]
               mt-[1rem] text-[1.1rem] focus:border-[#023047]"
            
            />
            <TextInput
              placeholder="Enter your message"
              value={message}
              onChangeText={setMessage}
              className="bg-white h-[10rem] rounded-[8px] p-[8px] text-[1.1rem] 
               w-full focus:border-[1px] mt-[1rem] focus:border-[#023047]"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity
              className="bg-yellow-400 px-4 py-2 mt-[1rem] rounded-[8px] w-full"
              onPress={handleSubmit}
            >
              <Text className="text-[1.2rem] text-center font-bold text-[#023047]">
                Submit
              </Text>
            </TouchableOpacity>
    </View>
  )
}

export default FirestoreFile;