import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FontAwesome } from "@expo/vector-icons"; 

const Tasks = () => {
  const [data, setData] = useState([]);
  const [isCheckedMap, setIsCheckedMap] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateDoc(doc(db, "tasks", taskId), {
        completed: newStatus,
      });
      setIsCheckedMap((prevMap) => ({
        ...prevMap,
        [taskId]: newStatus,
      }));
      console.log("Update status correct: ", taskId, newStatus);
    } catch (error) {
      console.error("Error updating task completion status: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handlePress = (item) => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;
    const lastPress = item.lastPress || 0;

    if (now - lastPress < DOUBLE_PRESS_DELAY) {
      deleteTask(item.id);
    } else {
      toggleTaskCompletion(item.id, isCheckedMap[item.id] || false);
    }

    setData((prevData) =>
      prevData.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, lastPress: now } : prevItem
      )
    );
  };

  const taskBarStyle = (item) => [
    styles.taskBar,
    {
      flexDirection: "row",
      padding: 6,
      margin: 10,
      marginBottom: 3,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      width: "97%",
      borderRadius: 5,
      textAlign: "center",
      backgroundColor: item.completed ? "#8FBC8F" : "#e9967a",
    },
  ];

  function renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View>
          <ScrollView style={taskBarStyle(item)}>
            <BouncyCheckbox
              size={25}
              fillColor="black"
              unfillColor="#FFFFFF"
              text={item.title}
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={styles.taskTitle}
              isChecked={item.completed}
            />
            <Text style={styles.taskText} numberOfLines={5}>
              {item.description}
            </Text>
          </ScrollView>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tareas</Text>
      <View style={styles.listArea}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  taskBar: {
    flexDirection: "row",
    padding: 6,
    margin: 10,
    backgroundColor: "#e9967a",
    marginBottom: 3,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "97%",
    borderRadius: 5,
    textAlign: "center",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  taskText: {
    fontSize: 16,
    textAlign: "left",
    width: "80%",
  },
  deleteText:{
    fontSize:12,
    color:"red",
    fontWeight: "bold"
  }
});

export default Tasks;
