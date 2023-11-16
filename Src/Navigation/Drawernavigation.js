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
    navigation.navigate('profile');
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
                </View>
              </View>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
         
         <TouchableOpacity onPress={faq}>
          <View style={styles.itemContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text1}>FAQ</Text>
              </View>
              <View style={styles.imageContainer}>
                <Icon name="chevron-right" size={25} color="black" />
              </View>
            </View>
          </TouchableOpacity>

            <View style={styles.separator} ></View>

            <TouchableOpacity 
            onPress={privacy}
            >
            <View style={styles.itemContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text1}>Privacy Policy</Text>
              </View>
              <View style={styles.imageContainer}>
                <Icon name="chevron-right" size={25} color="black" />
              </View>
            </View>
            </TouchableOpacity>

            <View style={styles.separator} ></View>

             <TouchableOpacity 
             onPress={help}
             >
            <View style={styles.itemContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text1}>Help & Supoort</Text>
              </View>
              <View style={styles.imageContainer}>
                <Icon name="chevron-right" size={25} color="black" />
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
    paddingTop: 35,
    margin: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 18,
    fontFamily:'NunitoSans_7pt-Bold'
  },
  name: {
    fontSize: 15,
    fontFamily:'NunitoSans_7pt-Regular'
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    padding: 20,
  },
  itemContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
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
