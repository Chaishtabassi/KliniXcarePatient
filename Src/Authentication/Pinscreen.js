import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Backbutton from '../Component/Backbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import OTPTextView from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';

const Pinscreen = ({navigation,route}) => {
  const [pin, setPin] = useState('');
  const pinInputs = useRef(Array(4).fill(null));
  const [enteredPin, setEnteredPin] = useState('');

  const handlePinChange = (text) => {
    setPin(text);
  };
  
  const handlePinChang= ( text) => {
    setEnteredPin(text)
  };

  const Done = async () => {
    try {
      if (enteredPin.length === 4 && pin.length === 4) {
        if (enteredPin == pin) {
          // Both PINs match
          if (checkpin) {
            if (enteredPin === savedpin && pin === savedpin) {
              // navigation.navigate('bottom');
            } else {
              console.error('Incorrect PIN entered.');
            }
          } else {
            // Save PIN and call API
            savePin();
            await callapi();
          }
        } else {
          // Show an error message because the PINs do not match
          Toast.show({
            text1: 'PINs do not match. Please try again.',
            type: 'error',
          });
        }
      } else {
        // Show an error message because one or both PINs are not entered
        Toast.show({
          text1: 'Please enter both PINs.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  
  const callapi = async () => {
    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
    const phonenumbercountry= await AsyncStorage.getItem('phoneNumbercountry');
    console.log(storedPhoneNumber)
    const storedDeviceToken = await AsyncStorage.getItem('deviceToken');
    console.log(storedDeviceToken)

    try {
      // Construct the request URL with query parameters
      const apiUrl = `https://espinarealty.com/doctor/api/v1/user/registerUser?` +
        `device_token=${storedDeviceToken}` +
        `&identity=${storedPhoneNumber}` +
        `&is_verify=1` +
        `&password=${enteredPin}`;

      console.log(apiUrl);
  
      const response = await axios.post(apiUrl, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        if (response.status == 200) {
          const id = response.data.data.id;
          console.log(response.data.data.id);
          await AsyncStorage.setItem('userid', id.toString());
  
          const responseData = response.data;
          const access_token = responseData.data.access_token;
          console.log(responseData.data.access_token);
          await AsyncStorage.setItem('access_token', access_token);


          const get_token=responseData.data.access_token;
          await AsyncStorage.setItem('get_token', get_token);
  
          console.log('Response Data:', responseData);
  
          if (responseData.message == 'User regiser succesfully!') {
            navigation.navigate('SignUpScreen', {
              phoneNumber: phonenumbercountry,
              pin: enteredPin,
            });
          } else {
            // navigation.navigate('bottom');
          }
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here, you can also re-throw it if needed
    }
  };

  useEffect(() => {
    storedpin();
  }, []);

  let checkpin = false;
  let savedpin = '';

  const storedpin = async () => {
    const storedPin = await AsyncStorage.getItem('userPin');
    console.log(storedPin);
    if (storedPin !== null) {
      checkpin = true;
      savedpin = storedPin;
    }
  };

  const savePin = async () => {
    try {
      await AsyncStorage.setItem('userPin', enteredPin);
      // You can also add some success handling or navigation here if needed.
    } catch (error) {
      console.error('Error saving PIN:', error);
      // Handle the error appropriately.
    }
  };

  const forgotpin = () => {
    navigation.navigate('forgot');
  };

  useEffect(() => {
    if (pin.length === 4) {
    }
  }, [pin]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
        <Text style={styles.title}>Enter Your Pin</Text>
      </View>
      {/* <View style={{alignItems:'center'}}>
        <Image
          style={styles.image}
          source={require('../Assets/pin.png')}
          resizeMode="contain"
        />
      </View> */}
      <View style={styles.textContainer}>
        <View style={{bottom:30,alignItems:'center'}}>
        <Text style={styles.centeredText}>Please enter your new 4-digit Pin.</Text>

          <View style={styles.pinInputContainer}>
            <OTPTextView
            containerStyle={[styles.otpContainer, styles.customBorder]}
            textInputStyle={styles.pinInput}
            handleTextChange={(text) => handlePinChange(text)}
            numberOfInputs={4}
            inputBorderColor="red"
          />
          </View>
        </View>

      <View style={{alignItems:'center'}}>
      <Text style={styles.centeredText1}>Please confirm your new 4-digit Pin.</Text>

          <View style={styles.pinInputContainer1}>
            <OTPTextView
            containerStyle={[styles.otpContainer, styles.customBorder]}
            textInputStyle={styles.pinInput}
            handleTextChange={(text) => handlePinChang(text)}
            numberOfInputs={4}
            inputBorderColor="red"
          />
          </View>
      </View>

        <TouchableOpacity style={styles.button} onPress={Done}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Pinscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
    top:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomEndRadius:20,
    // borderBottomLeftRadius:20,
    backgroundColor:'#4a87d7',
    height:'8%'
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily:'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    color:'white',
  },
  textContainer: {
    flex:3,
    alignItems: 'center',
    top:50
    // justifyContent:'center',
    // marginTop:20,
  },
  centeredText: {
    fontSize: 18,
    fontFamily: 'NunitoSans_7pt-Light',
  },
  centeredText1: {
    fontSize: 18,
    fontFamily: 'NunitoSans_7pt-Light',
  },
  pinInputContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal:20
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal:20
  },
  otpContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top:10
  },
  pinInput: {
    flex: 1,
    height: 50,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a87d7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    top:30,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
