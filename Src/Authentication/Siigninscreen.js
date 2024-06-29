import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  AppState
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, List, Divider, IconButton} from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';

const Siigninscreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    // Retrieve the token from AsyncStorage
    const access_token = await AsyncStorage.getItem('get_token');

    // Check if token exists
    if (access_token) {
      // Token exists, navigate to dashboard
      navigation.navigate('bottom');
    }
  };


  useEffect(() => {
    getDeviceToken(); 
  }, []);

  // useEffect(() => {
  //   // ... (existing code)
  
  //   // Listen for background notifications
  //   const unsubscribeOnBackgroundMessage = messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Background Notification:', remoteMessage);
  //     // Handle the notification as needed
  //   });
  
  //   return () => {
  //     unsubscribeOnBackgroundMessage();
  //   };
  // }, []);
  

  const getDeviceToken = async () => {
    try {
      let token = await messaging().getToken();
      
      if (!token) {
        // If the token is not available, request a new one
        token = await messaging().requestPermission();
      }
  
      console.log('Device Token:', token);
      setDeviceToken(token);
  
      // Save the device token in AsyncStorage
      await AsyncStorage.setItem('deviceToken', token);
    } catch (error) {
      console.error('Error getting device token:', error);
    }
  };
  

  // async function requestUserPermission() {
  //   try {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  //   } catch (error) {
  //     console.error('Error requesting FCM permission:', error);
  //   }
  // }

  PushNotification.createChannel(
    {
      channelId: 'channel-id', // Use a unique channel id
      channelName: 'Channel Name',
      channelDescription: 'A channel to categorize your notifications',
      soundName: 'default', // Optional, you can use a custom sound file
      importance: 4, // Set the importance level (0 - 4)
      vibrate: true, // Enable vibration
    },
    (created) => console.log(`Channel created: ${created}`),
  );

  useEffect(() => {
    let remoteMessage = null; // Declare remoteMessage in the outer scope
  
    const handleForegroundNotification = (message) => {
      console.log('Foreground Notification:', message);
  
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: message.notification.title,
        message: message.notification.body,
      });
    };
  
    const unsubscribeOnMessage = messaging().onMessage(async (message) => {
      console.log('A new FCM message arrived!', JSON.stringify(message));
      remoteMessage = message; // Update the outer variable
      handleForegroundNotification(message);
    });
  
    const appStateChangeHandler = (nextAppState) => {
      if (nextAppState === 'active') {
        const notificationOpen = messaging().getInitialNotification();
        if (notificationOpen) {
          // navigation.navigate('notification', {
          //   notificationData: remoteMessage, // Access data from the outer variable
          // });
          console.log('Notification caused app to open from quit state:', notificationOpen);
        }
      }
    };
  
    const unsubscribeOnAppStateChange = AppState.addEventListener('change', appStateChangeHandler);
  
    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp((message) => {
      console.log('Background Notification:', message);
  
      navigation.navigate('notification', {
        notificationData: message.data,
      });
    });
  
    messaging()
      .getInitialNotification()
      .then((message) => {
        if (message) {
          console.log('Initial Notification:', message);
          remoteMessage = message; // Update the outer variable
  
          navigation.navigate('notification', {
            notificationData: message.data,
          });
        }
      });
  
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnAppStateChange.remove();
    };
  }, [navigation]);
  
  
  const openCountryPicker = () => {
    setVisible(true);
  };

  const [visible, setVisible] = useState(false);
  const [country, setCountry] = useState({
    cca2: 'PH',
    callingCode: '63',
  });
  const [username, setUsername] = useState('');
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {
    func();
  }, []);

  const func = async () => {
    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
    if (storedPhoneNumber != null || storedPhoneNumber != undefined) {
      // navigation.navigate('Rootclienttab');
    }
  };

  const onSelectCountry = country => {
    setCountry(country);
    const callingCode = country?.callingCode
      ? `+${country.callingCode[0]}`
      : '';
    setVisible(false);
  };

  const signupphone =()=>{
    navigation.navigate('signupphone')
  }

  const handlePhoneNumberVerification = async () => {
    const storedDeviceToken = await AsyncStorage.getItem('deviceToken');
    
    if (username === '') {
      // Show a toast message when the phone number is empty
      Toast.show({
        text1: 'Please enter your phone number',
        type: 'error',
      });
      return;
    }

    if (!/^[0-9]{10}$/.test(username)) {
      // Show a toast message when the phone number is not 10 numeric characters
      Toast.show({
        text1: 'Please enter a valid 10-digit phone number',
        type: 'error',
      });
      return;
    }
    // navigation.navigate('otp');

    try {
      // Construct the request URL
      const apiUrl =
        'https://espinarealty.com/doctor/api/v1/user/registerUser';

      // Define the request data
      const requestData = {
        device_token:storedDeviceToken,
        identity: username,
      };

      console.log(requestData)

      // Make the API request using Axios
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the request was successful
      if (response.status === 200) {
        const responseData = response.data;
        console.log('API response:', responseData);
        console.log('API response:', responseData.is_new);

        // const confirmation = await auth().signInWithPhoneNumber(
        //   `+${country.callingCode}${username}`,
        //   true,
        // );

        // // Save the verification ID for later use
        // setVerificationId(confirmation.verificationId);
        // Save user login details in AsyncStorage

        const phonenumbercode = `+${country.callingCode}${username}`;
        console.log(phonenumbercode);
        await AsyncStorage.setItem('phoneNumbercountry', phonenumbercode);
        
        await AsyncStorage.setItem('phoneNumber', username);
        await AsyncStorage.setItem('verificationId', verificationId);

        if (responseData.is_new) {
          navigation.navigate('signupphone')
          Toast.show({
            text1: 'Please Sign Up to Continue',
            type: 'success',
          });
          // navigation.navigate('otp', { verificationId: confirmation.verificationId, phoneNumber });
          // navigation.navigate('pin');
        } else {
          navigation.navigate('loginpin');
        }
      } else {
        console.error('API request failed with status:', response.status);
      }
    } catch (error) {
      // Handle errors
      console.log('API request error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor: '#49B2E9',
        backgroundColor:'white'
      }}>

      <View
        style={{
          flex:1,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>

        <View style={{ justifyContent: 'center',alignItems:'center' }}>
          {/* <Image source={require('../Assets/Logo.png')} style={styles.logo1}/> */}
          <Image source={require('../Assets/newlogo.png')} resizeMode="contain" style={styles.logo1}/>
          <Text style={{fontSize:20,fontWeight:'700',bottom:20,color:'black'}}>Patient App</Text>
        </View>

        <Image source={require('../Assets/loginpatient.png')} style={styles.logo}/>
        
        <View style={{alignItems:'center',width:'100%',bottom:0,position:'absolute',height:'38%'}}>

        <Text style={{fontSize: 15, fontFamily: 'NunitoSans_7pt-Regular'}}>
          Sign in to continue:
        </Text>

          <View
            style={{
              // marginLeft: 10,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              paddingHorizontal: 45,
              paddingTop: 52,
            }}>
            <Text style={{fontSize: 14, fontWeight: '500'}}>
              {`+${country.callingCode}`}
            </Text>
          </View>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder='Enter Phone Number'
            mode="outlined"
            keyboardType="number-pad"
            fontSize={16}
            maxLength={10}
            outlineColor="#e4efff"
            style={{
              height: 60,
              top:13,
              backgroundColor: '#e4efff',
              zIndex: 0,
              paddingHorizontal:20,
              width: Dimensions.get('window').width * 0.8,
            }}
            theme={{colors: {primary: '#478ffd'}}}
            dense={true}
            left={
              <TextInput.Icon
                style={{
                  borderRightWidth: 1,
                  borderRadius: 0,
                  alignSelf: 'center',
                marginLeft:35
                }}
                icon="chevron-down"
                onPress={openCountryPicker}
              />
            }
          />
          <CountryPicker
            visible={visible}
            onClose={() => setVisible(false)}
            onSelect={onSelectCountry}
            withFilter
            // withFlag
            withCallingCode
            withCountryNameButton
            placeholder=""
          />

        <TouchableOpacity
        style={styles.button}
        onPress={handlePhoneNumberVerification}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', top: 20}}>
          <Text style={{fontFamily: 'NunitoSans_7pt-Regular', fontSize: 14}}>
            New Patient?
          </Text>
          <TouchableOpacity onPress={signupphone}>
            <Text
              style={{
                color: '#4a87d7',
                fontWeight: '500',
                fontFamily: 'NunitoSans_7pt-Regular',
              }}>
              {' '}
              Sign up
            </Text>
          </TouchableOpacity>
          
        </View>
        <Text style={{color:'black',position:'absolute',bottom:0}}>Powered by KliniXKare</Text>
        </View>
        
      </View>
    </KeyboardAvoidingView>
  );
};

export default Siigninscreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    // padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  logo: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
  },
  logo1: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
  },
  button: {
    backgroundColor: '#4a87d7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    top:10
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
