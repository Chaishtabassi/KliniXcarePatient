import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Medicalscreen from './Medicalscreen';
import Lifestylescreen from './Lifestylescreen';
import Profileedit from './Profileedit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const ProfileTabs = () => {
  const [storedPin, setStoredPin] = useState('');
  const [storedPhoneNumber, setStoredPhoneNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pin = await AsyncStorage.getItem('userPin');
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        setStoredPin(pin);
        setStoredPhoneNumber(phoneNumber);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: '#4a87d7' },
        indicatorStyle: { backgroundColor: 'white' },
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profileedit}
        initialParams={{ phoneNumber: storedPhoneNumber, storedPin: storedPin }}
      />
      <Tab.Screen name="Medical" component={Medicalscreen} />
      <Tab.Screen name="Lifestyle" component={Lifestylescreen} />
    </Tab.Navigator>
  );
};

export default ProfileTabs;
