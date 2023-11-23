import { StyleSheet, Text, View ,TextInput, TouchableOpacity,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Dashboardheader = ({navigation}) => {
    const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      savedetails();
    }, []),
  );
  
    const savedetails = async () => {
      try {
        const access_token = await AsyncStorage.getItem('get_token');
        console.log(access_token)
    
        if (!access_token) {
          return; // Handle this error case as needed
        }
    
        const api = 'http://teleforceglobal.com/doctor/api/v1/user/fetchMyUserDetails';
    
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });
    
        if (response) {
          if (response.status === 200) {
            const responseData = await response.text();
            console.log(JSON.parse(responseData).data)
           setUserName(JSON.parse(responseData).data)
          } else {
            console.error('Non-200 status code:', response.status);
            // Handle the error appropriately
          }
        } else {
          console.error('Response is undefined');
          // Handle the error appropriately
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error appropriately
      }
    };

    const notification =()=>{
      navigation.navigate('notification');
    }

  return (
    <View>
        <View style={{borderBottomRightRadius:30,borderBottomLeftRadius:30,backgroundColor:'#4a87d7',padding:20}}>
            <View style={{}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:20,fontWeight:'700',color:'white'}}>Hello, {userName.fullname}</Text>
            <TouchableOpacity onPress={notification}>
            <Image style={{height:30,width:30}} source={require('../Assets/notification.png')}/>
            </TouchableOpacity>
         
              </View>
        <Text style={{fontSize:15,fontWeight:'300',color:'white'}}>How are you doing well?</Text>
        {/* <TextInput
            placeholder="Search for doctors"
            style={styles.searchInput}
            value={searchQuery}
            placeholderTextColor={'white'}
            onChangeText={(text) => setSearchQuery(text)}
          /> */}
            </View>
   
        </View>
     
    </View>
  )
}

export default Dashboardheader

const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: '#74aeee',
        borderColor:'#9bc7f5',
        padding: 10,
        top:10,
        // margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontFamily:'NunitoSans_7pt-Regular'
      },
})