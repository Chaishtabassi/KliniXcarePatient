import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { ProgressBar, TextInput } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const Profileedit = ({navigation,route}) => {

    // const { phoneNumber, storedPin } = route.params;

    const [name, setname] = useState();
    const [lastname, setlastname] = useState();
    const [middlename, setmiddlename] = useState();
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
  
    const [loading, setloading] = useState(false);
  
    const [cities, setCities] = useState([]);
  
    useEffect(() => {
      countriesdata();
    }, []);
  
  
  
    useEffect(() => {
      savedetails();
    }, [])
    const savedetails = async () => {
      try {
        setloading(true);
        const access_token = await AsyncStorage.getItem('get_token');
  
        console.log(access_token)
  
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
            setlastname(JSON.parse(responseData).data.last_name);
            setname(JSON.parse(responseData).data.first_name);
            setAge(JSON.parse(responseData).data.age)
            setDay(JSON.parse(responseData).data.dob)
            setSelectedGender(JSON.parse(responseData).data.gender)
            setSelectmarital(JSON.parse(responseData).data.marital_status)
            setreason(JSON.parse(responseData).data.patient_address)
            setIsInsured(JSON.parse(responseData).data.insurance);
  
            const medicalHistory = JSON.parse(responseData).data.post_medical_history;
            setSelectedOptions(Array.isArray(medicalHistory) ? medicalHistory : []);
            // setSelectedOptions(JSON.parse(responseData).data.post_medical_history)
  
            setemergencyname(JSON.parse(responseData).data.emergency_contact_name)
            setemergencyphone(JSON.parse(responseData).data.emergency_contact_phone)
            setrelationship(JSON.parse(responseData).data.emergency_contact_relation)
            setcity(JSON.parse(responseData).data.city);
            setloading(false);
  
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
          // console.log(data.data);
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
  
    const callApi = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
  
      try {
        if (name == undefined || lastname == undefined || selectedGender == '' || day == undefined || month == undefined || year == undefined || age == undefined || width == undefined || Selectmarital == '' || reason == undefined || city == '') {
          Toast.show({
            type: 'error',
            text1: 'Validation Error',
            text2: 'All fields must be filled in.',
          });
          return;
        }
        else {
          const api =
            `http://teleforceglobal.com/doctor/api/v1/user/updateUserDetails?device_token=feaDCx7fTWSbRt7CqPiu6L:APA91bEHM2MKUVh433GRkpI8E15qsCIvKFWObomjq7rZpnhjJoDqXUr-LZe5TxdcVRaAF3eSISvis9pNkomdJyyiI_8PlfOtMjN4ZzS-VfbRay2u0NLG4hkaFKeigJy4gCfwsXROYxhd&identity=` +
            `${phoneNumber}` +
            '&is_verify=1&password=' +
            `${storedPin}`;
  
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
          formData.append('gender', Number(selectedGender['placeholder']));
          formData.append('dob', `${day}-${month}-${year}`);
          formData.append('age', age);
          formData.append('landline_number', width);
          formData.append('is_notification', 1);
          formData.append('marital_status', Selectmarital['placeholder']);
          formData.append('patient_address', reason);
          formData.append('city', city['name']);
          formData.append('insurance', isInsured);
  
          if (isInsured) {
            formData.append('insurance', isInsured);
          }
          formData.append('post_medical_history', selectedOptions);
          formData.append('other_medical_history', otherMedicalHistory);
          formData.append('emergency_contact_name', emergencyname);
          formData.append('emergency_contact_phone', emergencyphone);
          formData.append('emergency_contact_relation', relationship['placeholder']);
          formData.append('phone_number', height);
  
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
  
              const LoggedUser = JSON.parse(responseText).data;
              await AsyncStorage.setItem('updateddetails', JSON.stringify(LoggedUser));
  
              return responseText;
            } else {
              console.error('Non-200 status code:', response.status);
            }
          } else {
            console.error('Response is undefined');
          }
  
        }
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
  
          Toast.show({
            text1: 'Your Profile is updated',
            type: 'success',
          });
          navigation.navigate('bottom')
        } else {
        }
      } catch (error) {
        console.error('heloooooooooooooooooo', error);
      }
    };
  
    // Gender options
    const genderOptions = [
      { placeholder: '1', value: 'Male' },
      { placeholder: '0', value: 'Female' },
      { placeholder: '2', value: 'Other' },
    ];
  
    const Materialoptions = [
      { placeholder: 'Single', value: 'Single' },
      { placeholder: 'Married', value: 'Married' },
      { placeholder: 'Divorced', value: 'Divorced' },
      { placeholder: 'Widow', value: 'Widow' },
      { placeholder: 'Other', value: 'Other' },
    ];
  
    const relationshipdata = [
      { placeholder: 'Mother', value: 'Mother' },
      { placeholder: 'Father', value: 'Father' },
      { placeholder: 'Spouse', value: 'Spouse' },
      { placeholder: 'Other', value: 'Other' },
    ];
  
    const checkboxOptions = [
      { placeholder: 'COVID-19', value: 'COVID-19' },
      { placeholder: 'Chickenpox', value: 'Chickenpox' },
      { placeholder: 'Diabetis', value: 'Diabetis' },
      { placeholder: 'Dengue', value: 'Dengue' },
      { placeholder: 'Flu', value: 'Flu' },
      { placeholder: 'Other', value: 'Other' },
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
        calculateAge(selectedYear, selectedMonth, selectedDay);
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

  return (
    <View style={{backgroundColor:'white'}}>
        <ScrollView>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#478ffd" />
          </View>
        )}

        {/* Actual content */}
        {!loading && (
          <View style={{ margin: 10 }}>
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
                outlineColor="#f5f5f5"
                onChangeText={setlastname}
                value={lastname}
                theme={{ colors: { primary: '#478ffd' } }}
              />
            <TextInput
              placeholder="First Name"
              style={styles.input}
              mode="outlined"
              outlineColor="#f5f5f5"
              onChangeText={setname}
              value={name}
              theme={{ colors: { primary: '#478ffd' } }}
            />
            <TextInput
              placeholder="Middle Name"
              style={styles.input}
              mode="outlined"
              outlineColor="#f5f5f5"
              onChangeText={setmiddlename}
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
                paddingHorizontal: 10,
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
              valueField="placeholder"
              placeholder="Select Gender"
              value={selectedGender}
              onChange={value => setSelectedGender(value)}
            />

            {/* <Text
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
            outlineColor="#f5f5f5"
            onChangeText={setheight}
            value={height}
            maxLength={10}
            keyboardType="numeric"
            theme={{colors: {primary: '#478ffd'}}}
          /> */}

            {/* <TextInput
            style={styles.input}
            placeholder="Enter Landline Number"
            mode="outlined"
            outlineColor="#f5f5f5"
            onChangeText={setwidth}
            value={width}
            maxLength={13}
            keyboardType="numeric"
            theme={{colors: {primary: '#478ffd'}}}
          /> */}

            <Text
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
                <Icon name="calendar" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <Text
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
              placeholder="Age"
              mode="outlined"
              outlineColor="#f5f5f5"
              value={age}
              editable={false}
              theme={{ colors: { primary: '#478ffd' } }}
            />
            <Text
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
              labelField="placeholder"
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
              outlineColor="#f5f5f5"
              placeholder="Street Address"
              onChangeText={setreason}
              value={reason}
              theme={{ colors: { primary: '#478ffd' } }}
            />

            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
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
              valueField="name"
              placeholder="City"
              value={city}
              onChange={value => setcity(value)}
            />
            {/* </View> */}
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'NunitoSans_7pt-Regular',
              }}>
              Insurance*:
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'NunitoSans_7pt-Regular',
                    marginRight: 10,
                  }}>
                  Yes
                </Text>
                <Checkbox.Android
                  status={isInsured ? 'checked' : 'unchecked'}
                  onPress={handleInsuranceYes}
                  color="#478ffd"
                />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'NunitoSans_7pt-Regular',
                    marginRight: 10,
                  }}>
                  No
                </Text>
                <Checkbox.Android
                  status={isNotInsured ? 'checked' : 'unchecked'}
                  onPress={handleInsuranceNo}
                  color="#478ffd"
                />
              </View>
            </View>

            {isInsured && (
              <TextInput
                style={styles.input}
                placeholder="Insurance Name"
                mode="outlined"
                outlineColor="#f5f5f5"
                onChangeText={setinsurence}
                value={insurence}
                theme={{ colors: { primary: '#478ffd' } }}
              />
            )}

            {/* <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'NunitoSans_7pt-Regular',
            }}>
            Post Medical History*:
          </Text>

          {checkboxOptions.map((option, index) => (
            <Checkbox.Item
              key={option.value}
              placeholder={option.placeholder}
              status={
                selectedOptions.includes(option.value) ? 'checked' : 'unchecked'
              }
              onPress={() => handleCheckboxChange(option.value)}
            />
          ))}

          {selectedOptions.includes('Other') && (
            <TextInput
              style={styles.input}
              placeholder="Specify Other Medical History"
              mode="outlined"
              outlineColor="#f5f5f5"
              onChangeText={setOtherMedicalHistory}
              value={otherMedicalHistory}
              theme={{ colors: { primary: '#478ffd' } }}
            />
          )} */}

            <View style={{ top: 5 }}>

              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'NunitoSans_7pt-Regular',
                }}>
                Emergency Contact Details*:
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Name"
                mode="outlined"
                outlineColor="#f5f5f5"
                onChangeText={setemergencyname}
                value={emergencyname}
                theme={{ colors: { primary: '#478ffd' } }}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              mode="outlined"
              outlineColor="#f5f5f5"
              onChangeText={setemergencyphone}
              value={emergencyphone}
              maxLength={10}
              keyboardType="numeric"
              theme={{ colors: { primary: '#478ffd' } }}
            />

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
              data={relationshipdata}
              labelField="placeholder"
              valueField="value"
              placeholder="Select Relationship"
              value={relationship}
              onChange={value => setrelationship(value)}
            />

            <TouchableOpacity style={styles.button} onPress={Dashboard}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Profileedit

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
      backgroundColor: '#f5f5f5',
      zIndex: 0,
      height: 43
    },
    dateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateInput: {
      width: '27%',
      backgroundColor: '#f5f5f5',
      marginBottom: 15,
      borderRadius: 8,
    },
    button: {
      backgroundColor: '#49b2e9',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      width: '100%',
      top: 5
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