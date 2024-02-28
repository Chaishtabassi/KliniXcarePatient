import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Backbutton from '../Component/Backbutton';
import PhoneInput from 'react-native-phone-number-input';
import CountryPicker from 'react-native-country-picker-modal';
import Phonenumber from './Phonenumber';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, List, Divider, IconButton} from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

const Forgotpassword = ({navigation}) => {
  const [text, setText] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = newPhoneNumber => {
    console.log('New phone number:', newPhoneNumber);
    setPhoneNumber(newPhoneNumber);
  };

  const handleTextChange = newText => {
    setText(newText);
  };

  // const Reset =()=>{
  //     navigation.navigate('reset');
  // }

  const textInputStyle = {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 0,
  };

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
    console.log(storedPhoneNumber)
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

  const Reset = async () => {

    if (username === '') {
      // Show a toast message when the phone number is empty
      Toast.show({
        text1: 'Please enter a valid phone number',
        type: 'error',
      });
      return;
    }

    try {
      // Construct the request URL

      const api='http://teleforceglobal.com/doctor/api/v1/user/forgotUserPassword';

      const formData = new FormData();

      formData.append('identity', username);
      console.log(username)

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response) {
        if (response.status == 200) {
          const responseData = response;

          setVerificationId();
          await AsyncStorage.setItem('phoneNumber', username);
          
          const responseText = await response.text();

          navigation.navigate('forgototp', { phoneNumber });
        }
         else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
        <Text style={styles.title}>Forgot Pin</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.centeredText}>
          Please enter your Phone Number . You will receive a OTP to create a
          new pin via SMS.
        </Text>
        <View>
          <View
            style={{
              // marginLeft: 10,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              // paddingHorizontal: 10,
              paddingTop: 25,
            }}>
            <Text style={{fontSize: 14, fontWeight: '500'}}>
              {`+${country.callingCode}`}
            </Text>
          </View>
          <TextInput
            value={username}
            onChangeText={setUsername}
            label={
              <Text style={{fontFamily: 'NunitoSans_7pt-Light'}}>
                Enter Phone Number
              </Text>
            }
            mode="outlined"
            keyboardType="number-pad"
            fontSize={16}
            maxLength={10}
            outlineColor="#e4efff"
            style={{
              height: 60,
              backgroundColor: '#e4efff',
              zIndex: 0,
              // paddingLeft: ,
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
                  marginLeft:20
                }}
                icon="chevron-down"
                size={23}
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
        </View>
        <TouchableOpacity style={styles.button} onPress={Reset}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 15,
    fontFamily: 'NunitoSans_7pt-Regular',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    top: 20,
    backgroundColor: '#e4efff',
    marginBottom: 10,
  },
  button: {
    backgroundColor:'#4a87d7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 25,
    width: Dimensions.get('window').width * 0.9,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Forgotpassword;
