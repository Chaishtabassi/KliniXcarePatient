import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React,{useEffect,useState} from 'react';
import Backbutton from '../Component/Backbutton';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const Profilescreen = ({navigation}) => {
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

    const personal =()=>{
        // navigation.navigate('personalinfo')
    }

    const appointment =()=>{
        navigation.navigate('appoitmentprofile')
    }

    const doctor =()=>{
        navigation.navigate('doctorslist')
    }

    const test =()=>{
        navigation.navigate('Test')
    }

    const logout =()=>{
        navigation.navigate('logout')
    }

    const faq =()=>{
      navigation.navigate('faq')
  }

  const policy=()=>{
    navigation.navigate('privacy')
  }

  return (
    <ScrollView style={{flex:1,backgroundColor:'white'}}>
   <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../Assets/profileimage.png')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userName.fullname}</Text>
        </View>
      </View>

   {/* <TouchableOpacity onPress={personal}>
      <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            {/* <Image source={require('../Assets/user.png')} style={styles.leftImage} /> */}
            {/* <Text style={styles.leftText}>Personal Info</Text>
          </View>
          <TouchableOpacity style={styles.rightContainer}>
          <Icon name="chevron-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
   </TouchableOpacity>  */}

        {/* <View style={styles.separator}></View> */}

   <TouchableOpacity onPress={appointment}>
      <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            {/* <Image source={require('../Assets/appointment.png')} style={styles.leftImage} /> */}
            <Text style={styles.leftText}>My Appointment</Text>
          </View>
          <TouchableOpacity style={styles.rightContainer}>
          <Icon name="chevron-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
   </TouchableOpacity>

        {/* <View style={styles.separator}></View> */}

       {/* <TouchableOpacity onPress={doctor}>
        <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            {/* <Image source={require('../Assets/doctor.png')} style={styles.leftImage} /> */}
            {/* <Text style={styles.leftText}>My Doctors</Text>
          </View>
          <TouchableOpacity style={styles.rightContainer}>
          <Icon name="chevron-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
        </TouchableOpacity> */}

        <View style={styles.separator}></View>

        <TouchableOpacity onPress={policy}>
       <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            {/* <Image source={require('../Assets/blood.png')} style={styles.leftImage} /> */}
            <Text style={styles.leftText}>Privacy Policy</Text>
          </View>
          <TouchableOpacity style={styles.rightContainer}>
          <Icon name="chevron-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
       </TouchableOpacity>

       <View style={styles.separator}></View>


       <TouchableOpacity onPress={faq}>
       <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            {/* <Image source={require('../Assets/blood.png')} style={styles.leftImage} /> */}
            <Text style={styles.leftText}>Help & FAQ</Text>
          </View>
          <TouchableOpacity style={styles.rightContainer}>
          <Icon name="chevron-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
       </TouchableOpacity>
       
       {/* <View style={styles.separator}></View>


       <TouchableOpacity onPress={test}>
       <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            {/* <Image source={require('../Assets/blood.png')} style={styles.leftImage} /> */}
            {/* <Text style={styles.leftText}>My tests & diagnostics</Text>
          </View>
          <TouchableOpacity style={styles.rightContainer}>
          <Icon name="chevron-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
       </TouchableOpacity> */}

        <View style={styles.separator}></View>

       <TouchableOpacity onPress={logout}>
       <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            {/* <Image source={require('../Assets/log.png')} style={styles.leftImage} /> */}
            <Text style={styles.leftText}>Log Out </Text>
          </View>
          <TouchableOpacity style={styles.rightContainer}>
          <Icon name="chevron-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
       </TouchableOpacity>

    </View>
    </ScrollView>
  );
};

export default Profilescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Domine-SemiBold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 35,
    margin: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    color:'black',
    fontFamily: 'Domine-SemiBold',
  },
  name: {
    fontSize: 15,
    color:'grey',
    fontFamily: 'NunitoSans_7pt-Regular',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    top:10
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  leftText: {
    fontSize: 16, 
    color:'black',
    fontFamily:''
  },
  rightContainer: {
    alignItems: 'center',
  },
  rightIcon: {
    width: 30,
    height: 30, 
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e1da',
    margin: 10,
  },
});
