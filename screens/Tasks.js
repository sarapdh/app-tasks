import { Text, View,StyleSheet,ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import config from "../config";

const Tasks = ({route}) =>{

    const api = config.api;

    /*const [tasks, setTasks] = useState([]);
        useEffect(() => {
            getTasks();
        },[tasks.length]);*/

    const getTasks = async () => {
        await fetch(api + "get-task.php",{
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type":"application/json",
            },
        })
        .then((res) => res.json())
        .catch((error) => {
            Alert.alert("Error", "No se ha podido cargar");
        })
        .then((response) => {
            if(response.message == "error"){
                Alert.alert("Error", "No se pudo cargar");
            }else{
                setTasks(response.tasks);
                console.log(tasks);
            }
        })
    }

    if(route.params != undefined && route.params.state == true){
        getTasks();
        route.params.state = false;
    }

    const deleteTask = async (id) => {
        const sendData = {
            id: id,
        }
        await fetch(api+"delete-task.php",{
             method:"POST",
        header:{
            Accept: "application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(sendData),
    })
    .then((res) => res.json())
    .catch((error)=>{
        Alert.alert("Error", "No");
    }
    )
    .then((response) =>{
        if(response.message == "error"){
            Alert.alert("Error", "No se pudo realizar");
        }else{
            getTasks();
        }
    })
    }


    return(
<Text>
    Tasks
</Text>
    )
}

export default Tasks