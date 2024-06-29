import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Drawernavigation = ({navigation, visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [userName, setUserName] = useState('');

  useEffect(() => {
    savedetails();
  }, [])

  const savedetails = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
  
      if (!access_token) {
        return; // Handle this error case as needed
      }
  
      const api = 'https://espinarealty.com/doctor/api/v1/user/fetchMyUserDetails';
  
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

          const fullname=JSON.parse(responseData).data.fullname;
          await AsyncStorage.setItem('fullname', fullname);

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

  const faq =()=>{
    navigation.navigate('faq');
  }

  const privacy =()=>{
    navigation.navigate('privacy');
  }

  const help =()=>{
    navigation.navigate('help');
  }

  const profile =()=>{
    navigation.navigate('profilenew');
  }

  const appointment =()=>{
    navigation.navigate('appoitmentprofile')
  }

  const doctors =()=>{
    navigation.navigate('doctorslist')
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.drawerContainer}>
          <TouchableOpacity onPress={profile}>
              <View style={styles.profileContainer}>
                <Image
                  source={require('../Assets/profileimage.png')}
                  style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{userName.fullname}</Text>
                  <Text style={{fontSize:13,color:'white',fontFamily:'NunitoSans_7pt-Bold',}}>View and edit profile</Text>
                </View>
                <View>
                <Icon name="chevron-right" size={30} color="white" />
              </View>
              </View>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />


          <TouchableOpacity onPress={appointment}>
          <View style={styles.itemContainer}>
            <View>
              <Image style={{height:25,width:25}} source={require('../Assets/drawer/appointment.png')}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>Appointments</Text>
              </View>
          
              <View style={styles.imageContainer}>
                <Icon name="chevron-right" size={25} color="#bcbbc2" />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.separator} ></View>


          <TouchableOpacity onPress={doctors}>
          <View style={styles.itemContainer}>
            <View>
              <Image style={{height:25,width:25}} source={require('../Assets/drawer/doctor.png')}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>My Doctors</Text>
              </View>
          
              <View style={styles.imageContainer}>
                <Icon name="chevron-right" size={25} color="#bcbbc2" />
              </View>
            </View>
          </TouchableOpacity>


          <View style={styles.horizontalLine} />
         
         <TouchableOpacity onPress={faq}>
          <View style={styles.itemContainer}>
            <View>
              <Image style={{height:25,width:25}} source={require('../Assets/drawer/faq.png')}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>FAQ</Text>
              </View>
          
              <View style={styles.imageContainer}>
                <Icon name="chevron-right" size={25} color="#bcbbc2" />
              </View>
            </View>
          </TouchableOpacity>

            <View style={styles.separator} ></View>

            <TouchableOpacity 
            onPress={privacy}
            >
            <View style={styles.itemContainer}>
            <View>
              <Image style={{height:25,width:25}} source={require('../Assets/drawer/privacy.png')}/>
            </View>
              <View style={styles.textContainer}>
                <Text style={styles.text1}>Privacy Policy</Text>
              </View>
              <View style={styles.imageContainer}>
                <Icon name="chevron-right" size={25} color="#bcbbc2" />
              </View>
            </View>
            </TouchableOpacity>

            <View style={styles.separator} ></View>

             <TouchableOpacity 
             onPress={help}
             >
            <View style={styles.itemContainer}>
            <View>
              <Image style={{height:25,width:25}} source={require('../Assets/drawer/help.png')}/>
            </View>
              <View style={styles.textContainer}>
             
                <Text style={styles.text1}>Help & Supoort</Text>
              </View>
              <View style={styles.imageContainer}>
                <Icon name="chevron-right" size={25} color="#bcbbc2" />
              </View>
            </View>
            </TouchableOpacity>

        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    backgroundColor: 'white',
    width: windowWidth / 1.3,
    height: windowHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 30,
    // margin: 10,
    height:100,
    justifyContent:'space-between',
    backgroundColor:'#4a87d7'
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft:10,
    backgroundColor:'white'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    // marginHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft:15
  },
  profileName: {
    fontSize: 19,
    fontFamily:'NunitoSans_7pt-Bold',
    color:'white'
  },
  name: {
    fontSize: 15,
    fontFamily:'NunitoSans_7pt-Regular'
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    // marginHorizontal: 20,
    paddingTop: 7,
    backgroundColor:'#eeeeee'
  },
  contentContainer: {
    padding: 20,
  },
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  text1: {
    fontSize: 16,
    fontFamily:'NunitoSans_7pt-Regular'
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    fontFamily:'NunitoSans_7pt-Regular'
  },
});

export default Drawernavigation;
