import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from '../Screens/Dashboard';
import Searchscreen from '../Screens/Searchscreen';
import Notificationscreen from '../Screens/Notificationscreen';
import Inboxscreen from '../Screens/Inboxscreen';
import Specialistscreen from '../Specialistscreen';
import Profilescreen from '../Screens/Profilescreen';
import Icon from 'react-native-vector-icons/FontAwesome6';


const Clienttab = createBottomTabNavigator();

const Bottomnavigation = () => {
    return(
        <Clienttab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: '#4a87d7' },
            tabBarInactiveTintColor: 'white',
            tabBarActiveTintColor:'white',
            tabBarLabelStyle: { fontSize: 13 },
          })}
        >
            <Clienttab.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
                headerShown:false,
                tabBarLabel:'Dashboard',
                tabBarIcon:({color,size})=>(
                   <Image style={{height:30,width:30}} source={require('../Assets/dashboard.png')}/>
                )
            }}
            />
              <Clienttab.Screen
            name='specialist'
            component={Specialistscreen}
            options={{
                headerShown:false,
                tabBarLabel:'specialist',
                tabBarIcon:({color,size})=>(
                    <Image source={require('../Assets/search.png')}/>

                )
            }}
            />
               <Clienttab.Screen
            name='inbox'
            component={Inboxscreen}
            options={{
                headerShown:false,
                tabBarLabel:'Inbox',
                tabBarIcon:({color,size})=>(
                    <Image style={{height:30,width:30}} source={require('../Assets/inbox.png')}/>

                )
            }}
            />
                 <Clienttab.Screen
            name='profile'
            component={Profilescreen}
            options={{
                headerShown:false,
                tabBarLabel:'profile',
                tabBarIcon:({color,size})=>(
                    <Icon name="user" size={20} color="white" />

                )
            }}
            />
            
        </Clienttab.Navigator>
    )
}

export default Bottomnavigation

const styles = StyleSheet.create({})