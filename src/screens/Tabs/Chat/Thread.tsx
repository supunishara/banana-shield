import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { db } from "../../../../firebaseConfig";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Thread = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { userId, userName } = route.params;

  const userDocRef = doc(db, "users", userId);
  const chatsCollectionRef = collection(userDocRef, "chats");

  console.log("userId----", userId);
  console.log("userName----", userName);

  const onSend = useCallback(
    async (messages = []) => {
      try {
        const message = messages[0];

        const newMessage = {
          _id: message._id,
          text: message.text,
          createdAt: Timestamp.fromDate(new Date()),
          user: message.user,
        };

        const docRef = await addDoc(chatsCollectionRef, newMessage);
      } catch (error) {}
    },
    [chatsCollectionRef]
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsCollectionRef, (snapshot) => {
      const messagesFirestore = snapshot.docs.map((doc) => {
        const messageData = doc.data();
        return {
          _id: messageData._id,
          text: messageData.text,
          createdAt: messageData.createdAt.toDate(),
          user: messageData.user,
        };
      });

      setMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, [chatsCollectionRef]);

  return (
    <SafeAreaProvider>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // Change this to a unique ID for each user
        }}
      />
    </SafeAreaProvider>
  );
};

export default Thread;

const styles = StyleSheet.create({});
