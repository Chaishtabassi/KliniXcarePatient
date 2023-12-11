import React, { useEffect, useState } from 'react';
import { View, StyleSheet ,TouchableOpacity} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Medicalscreen from './Medicalscreen';
import Lifestylescreen from './Lifestylescreen';
import Profileedit from './Profileedit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const ProfileTabs = () => {
  return (
    <Tab.Navigator   tabBarOptions={{
      style: { backgroundColor: '#4a87d7' }, // Set your desired tab bar background color
      indicatorStyle: { backgroundColor: 'white' }, // Set your desired tab indicator color
      activeTintColor: 'white', // Set your desired active tab text color
      inactiveTintColor: 'white', // Set your desired inactive tab text color
    }}
  >
      <Tab.Screen name="Profile" component={Profileedit} />
      <Tab.Screen name="Medical" component={Medicalscreen} />
      <Tab.Screen name="Lifestyle" component={Lifestylescreen} />
    </Tab.Navigator>
  );
};

const Profilenew = () => {

  const[name, setName] = useState('');

   useEffect(() => {
     getname();
   }, [])
   
   getname = async() => {
    var n = await AsyncStorage.getItem('fullname');
    setName(n);
   }

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileTabs"
          component={ProfileTabs}
          
          options={{
            title: name,
            headerStyle: { backgroundColor: '#4a87d7' },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {/* Add your back arrow icon or text here */}
                {/* For example, you can use an Image for the arrow */}
                <Icon name="chevron-left" size={30} color="white" />

              </TouchableOpacity>
            ),
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Profilenew;

const styles = StyleSheet.create({});
