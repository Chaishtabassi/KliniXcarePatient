import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from '../Screens/Dashboard';
import Inboxscreen from '../Screens/Inboxscreen';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Appointment from '../Screens/Profile/Appointment';


const Clienttab = createBottomTabNavigator();

const Bottomnavigation = () => {
    return(
        <Clienttab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: '#4a87d7',height:55 },
            tabBarInactiveTintColor: 'white',
            tabBarActiveTintColor:'white',
            tabBarLabelStyle: { fontSize: 13,bottom:4},
          })}
        >
            <Clienttab.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
                headerShown:false,
                tabBarLabel:'Dashboard',
                tabBarIcon:({color,size})=>(
                   <Image style={{height:27,width:27}} source={require('../Assets/image-removebg.png')}/>
                )
            }}
            />
                 <Clienttab.Screen
            name='appoitmentprofile'
            component={Appointment}
            options={{
                headerShown:false,
                tabBarLabel:'My Appointment',
                tabBarIcon:({color,size})=>(
                   <Icon name='calendar' color='white' size={22}/>

                )
            }}
            />
               <Clienttab.Screen
            name='inbox'
            component={Inboxscreen}
            options={{
                headerShown:false,
                tabBarLabel:'Messages',
                tabBarIcon:({color,size})=>(
                    <Image style={{height:27,width:27}} source={require('../Assets/bottommessage.png')}/>

                )
            }}
            />
        </Clienttab.Navigator>
    )
}

export default Bottomnavigation

const styles = StyleSheet.create({})