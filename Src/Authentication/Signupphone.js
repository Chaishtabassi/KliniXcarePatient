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
    navigation.navigate('SignInScreen')
  }

   
  const handlePhoneNumberVerification = async () => {
    const storedDeviceToken = await AsyncStorage.getItem('deviceToken');
    console.log(storedDeviceToken)

    
    if (username === '') {
      // Show a toast message when the phone number is empty
      Toast.show({
        text1: 'Please enter your phone number',
        type: 'error',
      });
      return;
    }

    // navigation.navigate('otp');

    if (!/^[0-9]{10}$/.test(username)) {
      // Show a toast message when the phone number is not 10 numeric characters
      Toast.show({
        text1: 'Please enter a valid 10-digit phone number',
        type: 'error',
      });
      return;
    }

    try {
      // Construct the request URL
      const apiUrl =
        'https://espinarealty.com/doctor/api/v1/user/registerUser';

      // Define the request data
      const requestData = {
        device_token: storedDeviceToken,
        identity: username,
      };

      // Make the API request using Axios
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
        const phoneNumber = `${username}`;

        const phonenumbercode = `+${country.callingCode}${username}`;
        console.log(phonenumbercode);
        await AsyncStorage.setItem('phoneNumbercountry', phonenumbercode);
        // Save user login details in AsyncStorage
        await AsyncStorage.setItem('phoneNumber', phoneNumber);
        await AsyncStorage.setItem('verificationId', verificationId);

        if (responseData.is_new) {
          navigation.navigate('otp')        
          // navigation.navigate('otp', { verificationId: confirmation.verificationId, phoneNumber });
        } else {
          Toast.show({
            text1: 'User alredy register Sign In to continue',
            type: 'success',
          });
          navigation.navigate('SignInScreen');
        }
      } else {
        console.error('API request failed with status:', response.status);
      }
    } catch (error) {
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

      <Text style={{fontSize: 15, fontFamily: 'NunitoSans_7pt-Regular',top:5}}>
        Sign Up to continue:
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
        <Text style={styles.buttonText}>Sign Up</Text>
      )}
    </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center', top: 20}}>
        <Text style={{fontFamily: 'NunitoSans_7pt-Regular', fontSize: 14}}>
        Already have exist?
        </Text>
        <TouchableOpacity onPress={signupphone}>
          <Text
            style={{
              color: '#4a87d7',
              fontWeight: '500',
              fontFamily: 'NunitoSans_7pt-Regular',
            }}>
            {' '}
            Sign In
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
