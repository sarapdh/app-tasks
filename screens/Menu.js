import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { StyleSheet } from 'react-native';

import Tasks from "./Tasks";
import NewTask from "./NewTask";

const Tab = createMaterialBottomTabNavigator();

const Menu = () =>{

    const theme = useTheme();
    theme.colors.secondaryContainer = "#e5e5e5";
    return(
        <Tab.Navigator
            tabBarActivateBackgroundColor = "#fff"
            activeColor = '#ffffff'
            inactiveColor = "#000000"
            barStyle = {styles.navigatorBar}
            >
                <Tab.Screen
                    name = "Tareas"
                    component = {Tasks}
                    options = {{
                        tabBarLabel: "Tareas",
                        tabBarIcon: ()=>(
                            <MaterialCommunityIcons name = "view-list" Color="#000000" size={24}/>
                        )
                        
                    }}
                    />

                <Tab.Screen
                    name = "Nueva Tareas"
                    component = {NewTask}
                    options = {{
                        tabBarLabel: "Nueva Tareas",
                        tabBarIcon: ()=>(
                            <MaterialCommunityIcons name = "checkbox-marked-circle-plus-outline" Color="#000000" size={24}/>
                        )
                        
                    }}
                    />
            </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    navigatorBar:{
        backgroundColor: "#e9967a",
        borderTopWidth:0.5,
        borderTopColor:"#000",
    }
})

export default Menu