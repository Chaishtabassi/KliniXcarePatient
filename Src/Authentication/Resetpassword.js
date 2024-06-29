import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Backbutton from '../Component/Backbutton';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Resetpassword = ({navigation,route}) => {

  const {phonenumber, pin} = route.params;
  console.log(route)

  const [text, setText] = useState('');
  const [text1, setText1] = useState('');

  const handleTextChange = newText => {
    setText(newText);
  };

  const handleTextChang = newText => {
    setText1(newText);
  };

  const Reset = async () => {

    if (text !== text1) {
      Toast.show({
        type: 'error',
        text1: 'Entered pins do not match. Please try again.',
      });
      return; 
    }

    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
    console.log (storedPhoneNumber)

    try {
      const api='https://espinarealty.com/doctor/api/v1/user/forgotUserPassword';
  
        const formData = new FormData();


        formData.append('identity', storedPhoneNumber);
        formData.append('is_verify', 1);
        formData.append('password', text1);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          console.log('Response Text:', responseText);

          if (responseText.message="Password updated succesfully!") {
              navigation.navigate('loginpin');
              Toast.show({
                text1: 'Your pin is updated',
                type: 'success',
              });
          } 
          return responseText;
        } else {
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
        <Text style={styles.title}>Reset Pin</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.centeredText}>Enter new pin and confirm.</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          label="Enter Pin"
          keyboardType='numeric'
          maxLength={4}
          onChangeText={handleTextChange}
          value={text}
          theme={{colors: {primary: '#478ffd'}}}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          label="Confirm Pin"
          maxLength={4}
          keyboardType='numeric'
          onChangeText={handleTextChang}
          value={text1}
          theme={{colors: {primary: '#478ffd'}}}
        />
        <TouchableOpacity style={styles.button} onPress={Reset}>
          <Text style={styles.buttonText}>Change Pin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Resetpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#4a87d7',
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
