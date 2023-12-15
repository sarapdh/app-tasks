import { Text,StyleSheet,TextInput,TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import config from "../config";


const NewTask = ({navigation}) =>{

    const api = config.api;

    const[newTask, setNewTask] = useState({
        title:"",
        descrip :"",
    })
    const handleCt = (name, value) =>{
        setNewTask({...NewTask, [name] :value})
    }
    const save = async () =>{
        const sendData = {
            title: newTask.title,
            descrip: newTask.descr,
        }

        await fetch(api + "new-task.php",{
        method:"POST",
        header:{
            Accept: "application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(sendData)
    })
    .then((res) => res.json())
    .catch((error)=>{
        Alert.alert("Error", "No se pudo realizar")
    }
    )
    .then((response) =>{
        if(response.message == "error"){
            Alert.alert("Error", "No se pudo realizar")
        }else{
            navigation.navigation("Tareas", {state:true});
        }
    })
    }
    return(
        <View style={styles.container}>
            <View style = {styles.titlecontainer}>
                <Text style = {styles.title}>Crear nueva tarea</Text>
            </View>
            <View style = {styles.form}>
                <View style = {styles.inputG}>
                    <TextInput
                    placeholder = "Título tarea"
                    value={newTask.title}
                    onChangeText={(value) => handleCt("title",value)}
                    />
                </View>
                <View style = {styles.inputG}>
                    <TextInput
                    placeholder = "Descripción tarea..."
                    multiline={true}
                    numberOfLines={12}
                    style={{textAlignVertical: "top"}}
                    value={newTask.descr}
                    onChangeText={(value) => handleCt("descr",value)}
                    />
                </View>
                <TouchableOpacity style =  {styles.bot} onPress={save}>
                    <Text style = {styles.text}>Guardar</Text>

                </TouchableOpacity>

            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'

    },
    titlecontainer:{
        alignItems: "center",
        marginTop: 10
    },
    title:{
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center"
    },
    inputG:{
        padding: 10,
        margin:20,
        marginBottom: 3,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius:5
    },
    bot:{
        alignItems: "center",
        backgroundColor: "#e9967a",
        marginTop : 4,
        padding: 12,
        borderRadius: 5,
        width: "100%"

    },
    text:{
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
})

export default NewTask