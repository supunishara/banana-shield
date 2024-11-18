// src/screens/UsersList.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import colors from "../../theme/colors";

const ChatScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const initializeUsers = async () => {
    try {
      // First, check if users already exist
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);

      console.log("snapshot-----2", snapshot);
      console.log("snapshot.size-----2", snapshot.size);

      if (snapshot.size === 0) {
        console.log("Initializing users...");

        // Create batch for efficient writing
        const batch = writeBatch(db);

        // Generate 25 users
        const usersData = Array.from({ length: 25 }, (_, index) => ({
          name: `User ${index + 1}`,
          email: `user${index + 1}@example.com`,
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          status: "active",
          bio: `This is user ${index + 1}'s bio`,
          // Add any other user properties you need
        }));

        // Add each user to the batch
        usersData.forEach((userData) => {
          const userRef = doc(collection(db, "users"));
          batch.set(userRef, userData);
        });

        // Commit the batch
        await batch.commit();
        console.log("Users initialized successfully!");

        // Fetch the newly created users
        fetchUsers();
      } else {
        fetchUsers();
        console.log("Users already exist, skipping initialization");
      }
    } catch (error) {
      console.error("Error initializing users:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);

      console.log("snapshot-----", snapshot);

      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    initializeUsers();
  }, []);

  const openChat = (userId, userName) => {
    navigation.navigate("Thread", { userId, userName });
  };

  const renderUser = ({ item }) => (
    <Pressable
      style={styles.userItem}
      onPress={() => openChat(item.id, item.name)}
    >
      <View style={styles.userContainer}>
        {/* Add an avatar image */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
});

export default ChatScreen;
