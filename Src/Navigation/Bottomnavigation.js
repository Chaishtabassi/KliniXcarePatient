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
import Bookappointment from '../Screens/Bookappointment';


const Clienttab = createBottomTabNavigator();

const Bottomnavigation = () => {
    return(
        <Clienttab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: '#4a87d7',height:60 },
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
                   <Image style={{height:27,width:27}} source={require('../Assets/image-removebg.png')}/>
                )
            }}
            />
              <Clienttab.Screen
            name='bookappointment'
            component={Bookappointment}
            options={{
                headerShown:false,
                tabBarLabel:'Book Appointment',
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
                 {/* <Clienttab.Screen
            name='profile'
            component={Profilescreen}
            options={{
                headerShown:false,
                tabBarLabel:'Profile',
                tabBarIcon:({color,size})=>(
                    <Image style={{height:27,width:27}} source={require('../Assets/bottomprofile.png')}/>

                )
            }}
            /> */}
            
        </Clienttab.Navigator>
    )
}

export default Bottomnavigation

const styles = StyleSheet.create({})