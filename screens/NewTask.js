import { Text,StyleSheet,TextInput,TouchableOpacity,Keyboard, View, Alert } from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const NewTask = ({navigation}) =>{
    
    const[newTask, setNewTask] = useState({
        title:"",
        descr :""
    })
    const handleCt = (name, value) =>{
        setNewTask({...newTask, [name] :value})
    }
    const cancelTask = () =>{
        setNewTask({title:"",
        descr :""})
    }
    const saveTask = async () =>{
        const docRef = await addDoc(collection(db, "tasks"), { 
            title: newTask.title,
            description: newTask.descr,
            completed: false
        });
        console.log("Document written with ID: ", docRef.id);
        setNewTask({title:"",
        descr :""})
        navigation.navigate("Tareas", {state:true});
        Keyboard.dismiss();
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
                <TouchableOpacity style = {styles.but}>
                <TouchableOpacity style =  {styles.bot} onPress={saveTask}>
                    <Text style = {styles.text}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style =  {styles.bot} onPress={cancelTask}>
                    <Text style = {styles.text}>Cancelar</Text>
                </TouchableOpacity>
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
    but:{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    bot:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#e9967a",
        marginTop : 4,
        padding: 12,
        margin:6,
        borderRadius: 5,
    },
    text:{
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
})

export default NewTask