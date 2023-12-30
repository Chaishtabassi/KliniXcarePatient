import { StyleSheet, Text, View,Image ,FlatList,Dimensions,TouchableOpacity,Modal} from 'react-native'
import React,{useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/EvilIcons';

const NotificationScreen = ({ route, navigation }) => {
  // const { notificationData } = route.params;


  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View>
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4989d9',
          padding: 10
          // height: '5%',
        }}>
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={{  }}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>
         Notifications
          </Text>
        </View>
      </View>
      {/* <Text>{notificationData.notification.title}</Text>
      <Text>{notificationData.notification.body}</Text> */}
    </View>
  );
};

export default NotificationScreen;

