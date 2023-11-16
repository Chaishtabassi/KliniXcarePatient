import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import Backbutton from '../Component/Backbutton';
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import OTPTextView from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';

const Otpscreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
   const otpInputs = useRef(Array(6).fill(null)); 

  const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]; 

  const route = useRoute();
  const verificationId = route.params?.verificationId;
  const phoneNumber = route.params?.phoneNumber;

  const handlePinChange = (text) => {
    console.log(text);
    setOtp(text);
  };  
  
  const verifyOTP = async () => {
  //  navigation.navigate('pin');

  try {
    const enteredOTP = otp
    const hardcodedOTP = '1234';
    if (enteredOTP == hardcodedOTP) {
      console.log('OTP is correct. Navigating to pin screen.');
      navigation.navigate('pin');
    } else {
      Toast.show({
        text1: 'Please verify your number',
        type: 'error',
      });
      console.log('Incorrect OTP. Please try again.');
    }
  } catch (error) {
    console.log('Error:', error);
  }
  };

  const resendOTP = async () => {
    try {
      const newVerificationId = await auth().verifyPhoneNumber(
        phoneNumber,
        60, // timeout duration
        '',
        false, // Android-only: do not auto-verify on SMS receipt
        '', // Android-only: custom SMS sender ID
      );
  
      console.log('OTP Resent');
      // If needed, you can save the newVerificationId and use it for verification later.
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
        <Text style={styles.title}>Verify your phone number</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.centeredText}>Enter your OTP code here.</Text>
        
          <View style={styles.pinInputContainer}>
          <OTPTextView
            containerStyle={styles.otpContainer}
            textInputStyle={styles.pinInput}
            handleTextChange={(text) => handlePinChange(text)}
            numberOfInputs={4} 
            inputCellLength={1} 
            inputContainerStyles={styles.inputContainer} 
          />
       </View>
        <TouchableOpacity style={styles.button} onPress={verifyOTP}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' ,top:10}}>
          <Text style={{fontFamily:'NunitoSans_7pt-Regular',fontSize:14}}> Donot receive OTP?</Text>
          <TouchableOpacity onPress={resendOTP }>
              <Text style={{ color: '#49b2e9', fontWeight: '500' ,fontFamily:'NunitoSans_7pt-Regular'}}> Resend</Text>
          </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default Otpscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
    top:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomEndRadius:20,
    borderBottomLeftRadius:20,
    backgroundColor:'#49B2E9',
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
    flex:1,
    alignItems: 'center',
    top:20
    // justifyContent: 'center',
    // bottom:20
  },
  centeredText: {
    fontSize: 18,
   fontFamily: 'NunitoSans_7pt-Light'
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top:10,
    padding:10
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
    backgroundColor: '#49b2e9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.9,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily:'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
