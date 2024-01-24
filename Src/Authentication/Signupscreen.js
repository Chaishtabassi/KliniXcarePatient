import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Backbutton from '../Component/Backbutton';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const Signupscreen = ({ navigation, route }) => {
  const { phoneNumber, pin } = route.params;
  console.log(route)

  const [name, setname] = useState('');
  const [lastname, setlastname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [height, setheight] = useState('');
  const [width, setwidth] = useState('');
  const [email, setemail] = useState('');
  const [age, setAge] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [reason, setreason] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [Selectmarital, setSelectmarital] = useState('');
  const [city, setcity] = useState('');
  const [country, SetCountry] = useState('');
  const [isInsured, setIsInsured] = useState(false);
  const [isNotInsured, setIsNotInsured] = useState(false);
  const [insurence, setinsurence] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [emergencyname, setemergencyname] = useState('');
  const [emergencyphone, setemergencyphone] = useState('');
  const [relationship, setrelationship] = useState('');
  const [otherMedicalHistory, setOtherMedicalHistory] = useState('');

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    countriesdata();
  }, []);

  const citiesdata = async (e) => {

    const access_token = await AsyncStorage.getItem('access_token');


    const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/getCities';
    const authToken = access_token

    const formData = new FormData();
    formData.append('iso3', e.iso3);
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch country data');
        }
      })
      .then(data => {
        setCities(data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const countriesdata = async () => {
    const access_token = await AsyncStorage.getItem('access_token');

    const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/getAllCountries';
    const bearerToken = access_token;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setCountries(data.data);
        // SetCountry('PHL');
        citiesdata({ "iso3": 'PHL' });
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleCheckboxChange = value => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleInsuranceYes = () => {
    setIsInsured(true);
    setIsNotInsured(false);
  };

  const handleInsuranceNo = () => {
    setIsInsured(false);
    setIsNotInsured(true);
  };

  const isValidPhoneNumber = () => {
    // Use a regular expression to check if the phone number is valid
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(emergencyphone);
  };

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (text) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
    setemail(text);
  };

  const callApi = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const storedDeviceToken = await AsyncStorage.getItem('deviceToken');

    try {

      // if (!validateEmail()) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Validation Error',
      //     text2: 'Please enter a valid Email.',
      //   });
      //   return;
      // }

      // if (name == undefined || lastname == undefined || selectedGender == '' || day == undefined || month == undefined || year == undefined  || Selectmarital == '' || reason == undefined || city == '') {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Validation Error',
      //     text2: 'All fields must be filled in.',
      //   });
      //   return;
      // }
      // else {
        const api =
          `http://teleforceglobal.com/doctor/api/v1/user/updateUserDetails?device_token=${storedDeviceToken}` +
          `${phoneNumber}` +
          '&is_verify=1&password=' +
          `${pin}`;

        const authToken = access_token

        const formData = new FormData();
        if (selectedImage) {
          formData.append('image', {
            uri: selectedImage.path,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
        }

        formData.append('first_name', lastname);
        formData.append('last_name', name);
        formData.append('country_code', '91');
        formData.append('gender', Number(selectedGender['label']));
        // formData.append('dob',`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        formData.append('dob','');
        formData.append('age', age);
        formData.append('landline_number', width);
        formData.append('is_notification', 1);
        formData.append('marital_status', Selectmarital['label']);
        formData.append('patient_address', reason);
        formData.append('city', city.name);
        formData.append('insurance', '');

        // if (isInsured) {
        //   formData.append('insurance', isInsured);
        // }
        formData.append('post_medical_history', '');
        formData.append('other_medical_history', otherMedicalHistory);
        formData.append('emergency_contact_name', '');
        formData.append('emergency_contact_phone', '');
        formData.append('emergency_contact_relation', '');

        console.log('hello', formData);

        const response = await fetch(api, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
          },
          // body: JSON.stringify(),
          body: formData,
        });

        if (response) {
          if (response.status === 200) {
            const responseText = await response.text();
            console.log('Response Text:', responseText);

            // const LoggedUser = JSON.parse(responseText).data;
            // await AsyncStorage.setItem('savedetails', LoggedUser.fullname);

            return responseText;
          } else {
            console.error('Non-200 status code:', response.status);
          }
        } else {
          console.error('Response is undefined');
        }

      // }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  const Dashboard = async () => {
    try {
      const Response = await callApi();
      console.log('-------------------------', Response);
      const apiResponse = JSON.parse(Response);
      if (apiResponse && apiResponse.message === 'user details updated successfully') {
        const userIdentity = apiResponse.data.identity;
        const userDeviceToken = apiResponse.data.device_token;

        navigation.navigate('confirmreg')
      } else {
      }
    } catch (error) {
      console.error('heloooooooooooooooooo', error);
    }
  };

  const Signin = () => {
    // navigation.navigate('SignInScreen');
  };

  // Gender options
  const genderOptions = [
    { label: '1', value: 'Male' },
    { label: '0', value: 'Female' },
    { label: '2', value: 'Other' },
  ];

  const Materialoptions = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
    { label: 'Widow', value: 'Widow' },
    { label: 'Other', value: 'Other' },
  ];

  const relationshipdata = [
    { label: 'Other', value: 'Other' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Spouse', value: 'Spouse' },
  ];

  const checkboxOptions = [
    { label: 'COVID-19', value: 'COVID-19' },
    { label: 'Chickenpox', value: 'Chickenpox' },
    { label: 'Diabetes ', value: 'Diabetes ' },
    { label: 'Dengue', value: 'Dengue' },
    { label: 'Flu', value: 'Flu' },
    { label: 'Other', value: 'Other' },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result) {
        const image = await ImagePicker.openCropper({
          path: result[0].uri, // Use result[0].uri to get the URI
          width: 300,
          height: 300,
          cropping: true,
          cropperCircleOverlay: true,
        });
        console.log(image);

        setSelectedImage(image);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        throw err;
      }
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (date) {
      setShowDatePicker(false);
      setSelectedDate(date);
      const selectedYear = date.getFullYear();
      const selectedMonth = date.getMonth() + 1;
      const selectedDay = date.getDate();
      setYear(selectedYear.toString());
      setMonth(selectedMonth.toString().padStart(2, '0'));
      setDay(selectedDay.toString().padStart(2, '0'));

      // Calculate age immediately when DOB is entered
      // calculateAge(selectedYear, selectedMonth, selectedDay);
    }
  };

  const calculateAge = (selectedYear, selectedMonth, selectedDay) => {
    if (selectedDay && selectedMonth && selectedYear) {
      // Convert the month to be zero-based
      const monthIndex = parseInt(selectedMonth) - 1;
      const dob = new Date(selectedYear, monthIndex, selectedDay);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();

      // Check if the birthday has already occurred this year
      if (today < new Date(today.getFullYear(), monthIndex, selectedDay)) {
        age--;
      }

      setAge(age.toString()); // Update the age state
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };



  return (
    // <ScrollView style={styles.container}>
      <View style={{ backgroundColor: 'white',flex:1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#4989d9',
            height: '6%',
          }}>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>
              Profile
            </Text>
          </View>
        </View>

        <View style={{ justifyContent: 'space-between', margin: 15,flex:1}}>
          {/* <View style={{alignItems: 'center', bottom: 10}}>
            <Text style={styles.title}>Sign up.</Text>
          </View> */}
          {/* 
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center', margin: 10}}
            onPress={pickImage}>
            <Icon name="plus" size={25} color="black" />
          </TouchableOpacity> */}

          {selectedImage && (
            <Image
              source={{ uri: selectedImage.path }}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                borderRadius: 100,
              }}
            />
          )}

          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
            }}>
            Enter Patient Name*:
          </Text>

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={(text) => {
                // Ensure that the entered value contains only alphabets
                const alphabetsOnly = text.replace(/[^a-zA-Z]/g, '');
                setlastname(alphabetsOnly);
              }}
              value={lastname}
              theme={{ colors: { primary: '#478ffd' } }}
            />

          <TextInput
            placeholder="First Name"
            style={styles.input}
            mode="outlined"
            outlineColor="#e4efff"
            onChangeText={(text) => {
              // Ensure that the entered value contains only alphabets
              const alphabetsOnly = text.replace(/[^a-zA-Z]/g, '');
              setname(alphabetsOnly);
            }}
            value={name}
            theme={{ colors: { primary: '#478ffd' } }}
          />
          <TextInput
            placeholder="Middle Name"
            style={styles.input}
            mode="outlined"
            outlineColor="#e4efff"
            onChangeText={(text) => {
              // Ensure that the entered value contains only alphabets
              const alphabetsOnly = text.replace(/[^a-zA-Z]/g, '');
              setmiddlename(alphabetsOnly);
            }}
            value={middlename}
            theme={{ colors: { primary: '#478ffd' } }}
          />

          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
              // bottom: 10,
            }}>
            Gender
          </Text>

          <Dropdown
            style={styles.input}
            placeholderStyle={{
              paddingHorizontal: 15,
              fontWeight: '400',
              color: 'black',
            }}
            selectedTextStyle={{
              paddingHorizontal: 10,
              fontWeight: '400',
              color: 'black',
            }}
            data={genderOptions}
            labelField="value"
            valueField="label"
            placeholder="Select Gender"
            value={selectedGender}
            onChange={value => setSelectedGender(value)}
          />

          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
            }}>
            Phone Number*:
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            mode="outlined"
            outlineColor="#e4efff"
            onChangeText={setheight}
            value={phoneNumber}
            editable={false}
            keyboardType="numeric"
            theme={{ colors: { primary: '#478ffd' } }}
          />

          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
            }}>
            Email Address*:
          </Text>

          <TextInput
        style={styles.input}
        placeholder="Email Address"
        mode="outlined"
        outlineColor="#e4efff"
        onChangeText={validateEmail}
        value={email}
        keyboardType="email-address" // Use 'email-address' for a better keyboard
        theme={{ colors: { primary: '#478ffd' } }}
      />

          {/* <TextInput
            style={styles.input}
            label="Enter Landline Number"
            mode="outlined"
            outlineColor="#e4efff"
            onChangeText={setwidth}
            value={width}
            maxLength={13}
            keyboardType="numeric"
            theme={{colors: {primary: '#478ffd'}}}
          /> */}

          {/* <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
            }}>
            Enter Date of Birth*:
          </Text>

          <View style={styles.dateContainer}>
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={`${year}-${month}-${day}`}
              onFocus={() => setShowDatePicker(true)}
              editable={false}
            />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="calendar"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <Icon name="calendar" size={33} color="black" />
            </TouchableOpacity>
          </View> */}

          {/* <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
              // bottom: 10,
            }}>
            Age*:
          </Text>
          <TextInput
            style={styles.input}
            label="Age"
            mode="outlined"
            outlineColor="#e4efff"
            value={age}
            editable={false}
            theme={{ colors: { primary: '#478ffd' } }}
          /> */}
          {/* <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
              // bottom: 10,
            }}>
            Marital Status*:
          </Text>

          <Dropdown
            style={styles.input}
            placeholderStyle={{
              paddingHorizontal: 15,
              fontWeight: '400',
              color: 'black',
            }}
            selectedTextStyle={{
              paddingHorizontal: 15,
              fontWeight: '400',
              color: 'black',
            }}
            data={Materialoptions}
            labelField="label"
            valueField="value"
            placeholder="Select Marital Status"
            value={Selectmarital}
            onChange={value => setSelectmarital(value)}
          />

          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
            }}>
            Patient Address*:
          </Text>

          <TextInput
            style={styles.input}
            mode="outlined"
            outlineColor="#e4efff"
            label="Street Address"
            onChangeText={setreason}
            value={reason}
            theme={{ colors: { primary: '#478ffd' } }}
          /> */}

          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}
          {/* <Dropdown
            style={styles.input2}
            placeholderStyle={{
              paddingHorizontal: 15,
              fontWeight: '400',
              color: 'black',
            }}
            selectedTextStyle={{
              paddingHorizontal: 15,
              fontWeight: '400',
              color: 'black',
            }}
            data={countries}
            labelField="name"
            valueField="iso3"
            search
            searchPlaceholder="Search..."
            placeholder="Philippines"
            value={country}
            onChange={value => {
              SetCountry(value.iso3);
              citiesdata(value)
            }}
          />
          <Dropdown
            style={styles.input2}
            placeholderStyle={{
              paddingHorizontal: 15,
              fontWeight: '400',
              color: 'black',
            }}
            selectedTextStyle={{
              paddingHorizontal: 15,
              fontWeight: '400',
              color: 'black',
            }}
            data={cities}
            labelField="name"
            search
            searchPlaceholder="Search..."
            valueField="wikiDataId"
            placeholder="City"
            value={city}
            onChange={value => {
              setcity(value);
            }}
          /> */}

<View style={{ alignItems:'flex-end'}}>
          <TouchableOpacity style={styles.button} onPress={Dashboard}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
          {/* <View style={{ height: 20 }}></View> */}
        </View>
      </View>
    // </ScrollView>
  );
};

export default Signupscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Domine-Bold',
    color: '#49b2e9',
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
  input: {
    width: '100%',
    // marginBottom: 15,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    // borderRadius: 8,
    marginVertical: 8,
    height: 40
  },
  input1: {
    width: '48%',
    marginBottom: 15,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    zIndex: 0,
  },
  input2: {
    // width: '48%',
    marginVertical: 8,
    backgroundColor: '#e4efff',
    zIndex: 0,
    height: 43
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    width: '27%',
    backgroundColor: '#e4efff',
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4989d9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    top: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
  signInText: {
    marginTop: 10,
    fontSize: 16,
    color: '#49b2e9',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  // socialIcon: {
  //   height: 40,
  //   width: 40,
  //   backgroundColor: '#49b2e9',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 20,
  // },
});
