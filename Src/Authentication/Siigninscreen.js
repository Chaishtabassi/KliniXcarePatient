import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Backbutton from '../Component/Backbutton';
import Icon from 'react-native-vector-icons/EvilIcons';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import CountryPicker from 'react-native-country-picker-modal';
import Phonenumber from './Phonenumber';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, List, Divider, IconButton} from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Siigninscreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = newPhoneNumber => {
    console.log('New phone number:', newPhoneNumber);
    setPhoneNumber(newPhoneNumber);
  };

  const sendOTP = async () => {
    try {
      setLoading(true);
      if (phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        navigation.navigate('otp', {confirmation, phoneNumber});
      } else {
        console.error('Phone number is null or empty');
      }
      setLoading(false);
    }
     catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const Dashboard = () => {
    navigation.navigate('otp');
  };

  // const Signup = () => {
  //   navigation.navigate('SignUpScreen');
  // };

  const openCountryPicker = () => {
    setVisible(true);
  };

  const [visible, setVisible] = useState(false);
  const [country, setCountry] = useState({
    cca2: 'IN',
    callingCode: '91',
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
        'http://teleforceglobal.com/doctor/api/v1/user/registerUser';

      // Define the request data
      const requestData = {
        device_token:
          'feaDCx7fTWSbRt7CqPiu6L:APA91bEHM2MKUVh433GRkpI8E15qsCIvKFWObomjq7rZpnhjJoDqXUr-LZe5TxdcVRaAF3eSISvis9pNkomdJyyiI_8PlfOtMjN4ZzS-VfbRay2u0NLG4hkaFKeigJy4gCfwsXROYxhd',
        identity: country.callingCode + username,
      };

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
        const phoneNumber = `+${country.callingCode}${username}`;

        // Save user login details in AsyncStorage
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

  const textInputStyle = {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 0,
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#49B2E9',
      }}>

      <View
        style={{
          flex:1,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>

        <View style={{ justifyContent: 'center',alignItems:'center' ,height:'23%'}}>
          <Image source={require('../Assets/Logo.png')} style={styles.logo1}/>
          <Text style={{fontSize:20,fontWeight:'700'}}>Patient App</Text>
        </View>

        <Image source={require('../Assets/loginpatient.png')} style={styles.logo}/>
        
        <View style={{backgroundColor:'white',borderTopRightRadius:40,
        borderTopLeftRadius:40,alignItems:'center',width:'100%',bottom:0,position:'absolute',height:'34%'}}>

        <Text style={{fontSize: 15, fontFamily: 'NunitoSans_7pt-Regular',top:5}}>
          Sign in to continue:
        </Text>

          <View
            style={{
              // marginLeft: 10,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              paddingHorizontal: 55,
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
              paddingLeft: 30,
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
        <View style={{flexDirection: 'row', justifyContent: 'center', top: 10}}>
          <Text style={{fontFamily: 'NunitoSans_7pt-Regular', fontSize: 14}}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={signupphone}>
            <Text
              style={{
                color: '#49b2e9',
                fontWeight: '500',
                fontFamily: 'NunitoSans_7pt-Regular',
              }}>
              {' '}
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
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
    top:20
  },
  logo1: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.1,
  },
  button: {
    backgroundColor: '#49b2e9',
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
