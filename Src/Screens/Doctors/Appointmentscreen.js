import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Linking
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Backbutton from '../../Component/Backbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/EvilIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { phonecall } from 'react-native-communications';
import DateTimePicker from '@react-native-community/datetimepicker';

const Appointmentscreen = ({ route, navigation }) => {
  const selectedDoctor = route.params ? route.params.selectedDoctor : null;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1;

  var dates = [];
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysLeftInMonth = lastDayOfMonth - currentDate.getDate() + 1;
  dates = Array.from({ length: daysLeftInMonth }, (_, index) => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + index);
    return nextDate.getDate();
  });

  useEffect(() => {
    fetchslot();
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [problemDescription, setProblemDescription] = useState('');
  const [slots, setSlots] = useState([]);
  const [slotavail, setslotavail] = useState('')
const[dateshow,setdateshow]=useState([])
  const [nslots, setNslots] = useState({})
  const [showtime,setshowtime]=useState({})

  const fetchslot = async selectedDate => {
    const access_token = await AsyncStorage.getItem('access_token');
    const storeuserid = await AsyncStorage.getItem('userid');

    const bearerToken = access_token;
    const storedoctorid = selectedDoctor.id;
    try {
      const selectedDateFormatted = monthNames[currentMonth - 1];

      const api = `https://espinarealty.com/doctor/api/v1/user/fetchSlotsPerDate`;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('month', selectedDateFormatted);
      formData.append('patient_id', storeuserid);

      const authToken = bearerToken;
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });


      if (response) {
        if (response.status == 200) {
          const responseText = await response.text();
          const parsed_res = JSON.parse(responseText);
          console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', parsed_res)
          setNslots(parsed_res.data);

          setslotavail(JSON.stringify(parsed_res, null, 2));
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const slotapi2 = async (location_id) => {
    const storeuserid = await AsyncStorage.getItem('userid');
    const access_token = await AsyncStorage.getItem('access_token');
    console.log(access_token)
    const bearerToken = access_token;
    const storedoctorid = selectedDoctor.id;
    try {
      const api = `https://espinarealty.com/doctor/api/v1/user/fetchSlotByLocation`;
      const formData = new FormData();
      formData.append('doctor_id', storedoctorid);
      formData.append('patient_id', storeuserid);
      formData.append('location_id', location_id);
      formData.append('start', '0');
      formData.append('limit', '20');

      console.log(formData)
      const authToken = bearerToken;
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response && response.status === 200) {
        const responseText = await response.text();
        const parsed_res = JSON.parse(responseText);
        console.log('dateeeeeeeeeeeeeeee', parsed_res.data)
        setdateshow(Object.keys(parsed_res.data));
        setshowtime(parsed_res.data)
        // if (parsed_res.data && parsed_res.data.length > 0) {
        //   setdateshow(Object.keys(parsed_res.data));
        // } else {
        //   if (parsed_res.message == "fetch slots successfully") setmsg("No Slots Available");
        //   else setmsg("No Slots Available");
        // }
        // console.log(Object.keys(parsed_res.data))
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const [gettime, setgettime] = useState('')

  const slotime = async (date, Month) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const storeuserid = await AsyncStorage.getItem('userid');
    const bearerToken = access_token;
    const storedoctorid = selectedDoctor.id;
    console.log(Month != null);
    if (Month != null) {
      currentMonth = Month;
    };
    try {
      // const selectedDateFormatted = `${currentYear}-${String(
      //   currentMonth).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      // console.log(selectedDateFormatted)

      const api = `https://espinarealty.com/doctor/api/v1/user/fetchSlotByDateAndLocation`;


      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('patient_id', storeuserid);
      formData.append('date', date);
      formData.append('location_id', Locationid);
      console.log(formData)

      const authToken = bearerToken;
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const parsed_res = JSON.parse(responseText);
          console.log("================================");
          console.log('timeeeeeeeeeeeeeeeeeeeeeee', parsed_res);
          if (parsed_res.data && parsed_res.data.length > 0) {
            const firstSlotId = parsed_res.data.id;
            setgettime(parsed_res.data);

            // await AsyncStorage.setItem('firstSlotId', String(firstSlotId)); 
          } else {
            setmsg("No Slots Available");
            // console.error('No slots found in the response');
          }
        } else {
          console.error('Non-200 status codeeeeeee:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const slotapi = async (date) => {
    const access_token = await AsyncStorage.getItem('access_token');
    console.log(access_token)
    const storeuserid = await AsyncStorage.getItem('userid');
    const bearerToken = access_token;
    const storedoctorid = selectedDoctor.id;
    // console.log(Month != null);
    // if (Month != null) {
    //   currentMonth = Month;
    // };
    try {
      // const selectedDateFormatted = `${currentYear}-${String(
      //   currentMonth).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      // console.log(selectedDateFormatted)

      const api = `https://espinarealty.com/doctor/api/v1/user/fetchSlotByLocation`;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('date', date);
      formData.append('location_id', Locationid);
      formData.append('start', '0');
      formData.append('limit', '10');
      formData.append('patient_id', storeuserid);
      console.log(formData)

      const authToken = bearerToken;
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const parsed_res = JSON.parse(responseText);
          console.log("================================");
          console.log('paaaaaaaaaaaaaa', responseText);
          if (parsed_res.data && parsed_res.data.length > 0) {
            const firstSlotId = parsed_res.data.id;
            setSlots(parsed_res.data);

            // await AsyncStorage.setItem('firstSlotId', String(firstSlotId)); 
          } else {
            setmsg("No Slots Available");
            // console.error('No slots found in the response');
          }
          console.log(parsed_res.data)
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [isDisabled, setIsDisabled] = useState(false);

  const callApi = async () => {
    setIsDisabled(true);
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storeuserid = await AsyncStorage.getItem('userid');
    const storedoctorid = selectedDoctor.id;
    const storedserviceamount = await AsyncStorage.getItem('serviceamount');
    const storedslotid = await AsyncStorage.getItem('firstSlotId');

    try {
      if (selectedTime == undefined || selectedType == '' || problemDescription == undefined) {
        Toast.show({
          type: 'error',
          text1: 'Validation Error',
          text2: 'All fields must be filled in.',
        });
        return;
      }

      else {
        const api = `https://espinarealty.com/doctor/api/v1/user/addNewAppointment`;
        const time_range = `${selectedTime.start_time}-${selectedTime.end_time}`;
        const authToken = bearerToken;
        // const selectedDateFormatted = `${currentYear}-${String(
        //   currentMonth,
        // ).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
             const selectedDateFormatted = `${String(selectedDate).padStart(2, '0')}`;

        const formData = new FormData();

        const serviceAmount = selectedDoctor.consultation_fee;
        const discountAmount = 0;

        const subtotal = serviceAmount - discountAmount;

        const totalTaxAmount = 0.0;

        const payableAmount = subtotal + totalTaxAmount;

        var payment = 'payNow'
        // if (selectedType == 'Online') {
        //   payment = 'payNow'
        // }
        // else payment = 'payAtClinic'
        formData.append('user_id', storeuserid);
        formData.append('doctor_id', storedoctorid);
        formData.append('date', selectedDateFormatted);
        formData.append('time', time_range);
        formData.append('type', selectedType === 'At Clinic' ? '0' : '1');
        formData.append('order_summary', 'hello');
        formData.append('is_coupon_applied', 0);
        formData.append('service_amount', serviceAmount);
        formData.append('discount_amount', discountAmount);
        formData.append('subtotal', subtotal);
        formData.append('total_tax_amount', totalTaxAmount);
        formData.append('payable_amount', payableAmount);
        formData.append('payment_method', payment);
        formData.append('problem', problemDescription);
        formData.append('slot_id', slottime);
        formData.append('status', 0);

        console.log(formData)
        console.log(payment)

        const response = await fetch(api, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });

        if (response) {
          if (response.status === 200) {
            const responseText = await response.text();
            setIsDisabled(false); 
            if (payment == "payNow") {
              console.log('onlineeeeeeee')
              const appointmentId = JSON.parse(responseText).data.id;
              await makePayment(appointmentId);
            }
            return responseText;
          } else {
            setIsDisabled(false); 
            console.error('Non-200 status code:', response.status);
          }
        } else {
          setIsDisabled(false); 
          console.error('Response is undefined');
        }
      }
    } catch (error) {
      setIsDisabled(false); 
      console.error('erorrr', error);
    }
  };

  const makePayment = async (appointmentId) => {
    const access_token = await AsyncStorage.getItem('access_token');
    var payment = ''
    payment = 'payNow'
    // var payment = ''
    // if (selectedType == 'Online') {
    //   payment = 'payNow'
    // }
    // else payment = 'payAtClinic'
    const bearerToken = access_token;
    try {
      const api = `https://espinarealty.com/doctor/api/v1/user/makePayment`;

      const formData = new FormData();

      formData.append('appointment_id', appointmentId);
      formData.append('payment_type', payment);
      console.log(formData)

      const authToken = bearerToken;
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });


      if (response) {
        if (response.status == 200) {
          const responseText = await response.text();
          const parsed_res = JSON.parse(responseText);

          console.log('payment', parsed_res.data)
          if (parsed_res.status === true && parsed_res.return_url) {
            Linking.openURL(parsed_res.return_url);
          }

        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const Payment = async () => {
    if (problemDescription == '') {
      Toast.show({
        text1: 'Please fill all the details',
        type: 'error',
      });
      return;
    }
    try {
      const Response = await callApi();
      console.log('-------------------------', Response);
      const apiResponse = JSON.parse(Response);

      if (apiResponse && apiResponse.message) {
        if (apiResponse.status === true) {
          const qrCodeData = apiResponse.qrCodeData;
          const appointmentId = apiResponse.data.id;

          // navigation.navigate('bottom');
          navigation.navigate('qrscreen', { qrCodeData, appointmentId });
        } else if (
          apiResponse.status === false &&
          apiResponse.message ===
          'This slot already full, Please select another slot!'
        ) {
          Toast.show({
            text1: 'This slot is already full. Please select another slot.',
            type: 'error',
          });
        } else {
          Toast.show({
            text1: 'This slot is already full. Please select another slot',
            type: 'error',
          });
        }
      }
    } catch (error) {
      console.error('heloooooooooooooooooo', error);
    }

  };


  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [showTimeSelection, setShowTimeSelection] = useState(false);

  const getslots = (date) => {
    setSlots(showtime[date])

    setSelectedDate(date);
    slotime(date);
    slotapi(date, null);
    setShowTimeSelection(true); 
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const openImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImageUri(response.assets[0].uri);
        console.log('Selected Image URI:', response.assets[0].uri);
      }
    });
  };

  const clearSelectedImage = () => {
    setSelectedImageUri(null);
  };

  const [selectedDatee, setSelectedDatee] = useState(new Date());
  const [msg, setmsg] = useState('');

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');


  const handleDateChange = async (event, date) => {
    if (date) {
      setShowDatePicker(false);
      setSelectedDatee(date);

      const selectedYear = date.getFullYear();
      const selectedMonth = date.getMonth() + 1;
      const selectedDay = date.getDate();

      const formattedDate = `${String(selectedDay).padStart(2, '0')}`;
      const formattedMonth = selectedMonth;

      setSelectedDate(formattedDate);

      await slotapi(formattedDate, formattedMonth);

      setShowTimeSelection(true);
      if (slots.length > 0) {
        setSelectedTime(slots[0]);
      }

      setYear(selectedYear.toString());
      setMonth(selectedMonth.toString().padStart(2, '0'));
      setDay(selectedDay.toString().padStart(2, '0'));
    }
  };



  const [showDatePicker, setShowDatePicker] = useState(false);

  const get_number_slots = (date) => {
    const slotse = showtime[date] || [];
    // setSlots(showtime[date])
    return `${slotse.length} Slot Available`;
    // const formattedDate = currentYear + '-' + (currentMonth < 10 ? '0' + currentMonth : currentMonth) + '-' + (date < 10 ? '0' + date : date);
    // if (nslots[formattedDate] && nslots[formattedDate].length > 0) {
    //   const numberOfSlots = nslots[formattedDate].length;
    //   return numberOfSlots === 1 ? '1 Slot Available' : `${numberOfSlots} Slots Available`;
    // } else {
    //   return 'No Slots Available';
    // }
  }


  const [slottime, setslottime] = useState('')
  const [Locationid, setlocationid] = useState('')
  const [locationselect, setlocationselect] = useState('')

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4989d9',
          height: '7%',
        }}>
       <Backbutton/>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>
            Select Date & Time
          </Text>
        </View>
      </View>

      {selectedDoctor && (
        <View style={styles.selectedDoctorContainer}>
          <Image
            style={{ height: 80, width: 80 }}
            source={require('../../Assets/doctor.jpg')}
          />
          <View style={{ flexDirection: 'column', marginLeft: 15 }}>
            <Text style={styles.doctorName}>DR {selectedDoctor.name} {selectedDoctor.degrees}</Text>
            <Text style={styles.specialty}>{selectedDoctor.designation}</Text>
            <Text style={styles.specialty}>{selectedDoctor.experience_year} Years Experience</Text>


          </View>

        </View>
      )}
      <View style={styles.separator}></View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'NunitoSans_7pt-Light' }}>
          Select Location
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {selectedDoctor && (
            selectedDoctor.service_locations.map((location, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setlocationselect(index);
                  setlocationid(location.id);
                  slotapi2(location.id);
                }}
                style={[
                  styles.appoContainer,
                  locationselect === index
                    ? { backgroundColor: '#49b2e9' }
                    : { backgroundColor: '#e3e1da' },
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    locationselect === index ? { color: 'white' } : { color: 'black' },
                  ]}
                >
                  {location.hospital_title}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    locationselect === index ? { color: 'white' } : { color: 'black' },
                  ]}
                >
                  {location.hospital_address}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>


      <ScrollView style={styles.scrollViewContainer}>

        <View style={{ padding: 10 }}>
          <FlatList
            // data={dates}
            data={dateshow}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(date, index) => index.toString()}
            renderItem={({ item: date, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => getslots(date)}
                style={[
                  styles.dayDateContainer,
                  selectedDate === date
                    ? { backgroundColor: '#49b2e9' }
                    : { backgroundColor: '#e3e1da' },
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === date ? { color: 'white' } : { color: 'black' },
                    ]}
                  >
                    {date}
                    {/* {currentDate.getDate() === date ? 'Today' : getDayName(currentYear, currentDate.getMonth(), date)} */}
                  </Text>
                  {/* <Text
                    style={[
                      styles.dateText,
                      selectedDate === date ? { color: 'white' } : { color: 'black' },
                    ]}
                  >
                    {date}
                  </Text> */}
                </View>


                <Text style={[
                  styles.dateText1,
                  selectedDate === date ? { color: 'white' } : { color: 'green' },
                ]}>
                  {get_number_slots(date)}
                </Text>

              </TouchableOpacity>
            )}
          />
        </View>



        {showTimeSelection && (
          <View style={{}}>
            {/* <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 18, color:'black',fontFamily: 'NunitoSans_7pt-Light' }}>
              Select Slots
            </Text>
          </View> */}

            {slots.length > 0 ? (
              <View style={{ marginLeft: 10 }}>

                <FlatList
                  data={gettime}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setslottime(item.id);
                        console.log('id', item.id)
                        setSelectedTime(item);
                      }}
                      style={[
                        styles.timeContainer,
                        selectedTime === item
                          ? { backgroundColor: '#49b2e9' }
                          : { backgroundColor: '#e3e1da' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.date,
                          selectedTime === item
                            ? { color: 'white' }
                            : { color: 'black' },
                        ]}
                      >
                        {item.time_range}
                      </Text>
                      {item.is_break === "1" && (
                        <Text style={{ fontSize: 12, color: 'red' }}>
                          {item.description}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                />

              </View>
            ) : (
              <Text style={{ marginLeft: 10 }}>{msg}</Text>
            )}
          </View>
        )}


        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 18, color: 'black', fontFamily: 'NunitoSans_7pt-Light', top: 10 }}>
            Appointment Type
          </Text>
        </View>

        <View style={{ flexDirection: 'row', padding: 10 }}>
          <TouchableOpacity
            onPress={() => setSelectedType('Online')}
            style={[
              styles.appoContainer,
              selectedType === 'Online'
                ? { backgroundColor: '#49b2e9' }
                : { backgroundColor: '#e3e1da' },
            ]}>
            <Text
              style={[
                styles.dateText,
                selectedType === 'Online' ? { color: 'white' } : { color: 'black' },
              ]}>
              Online
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType('At Clinic')}
            style={[
              styles.appoContainer,
              selectedType === 'At Clinic'
                ? { backgroundColor: '#49b2e9' }
                : { backgroundColor: '#e3e1da' },
            ]}>
            <Text
              style={[
                styles.dateText2,
                selectedType === 'At Clinic'
                  ? { color: 'white' }
                  : { color: 'black' },
              ]}>
              At Clinic
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 18, color: 'black', fontFamily: 'NunitoSans_7pt-Light', }}>
            Explain your Problem Briefly
          </Text>
        </View>

        <TextInput
          style={styles.problemInput}
          placeholder="Type your problem here"
          value={problemDescription}
          onChangeText={text => setProblemDescription(text)}
          multiline
        />

        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 18, color: 'black', fontFamily: 'NunitoSans_7pt-Light' }}>
            Attach Document
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#e3e1da',
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={openImagePicker}
          >
            <Icon name="plus" size={30} color="black" />
          </TouchableOpacity>

          {selectedImageUri && (
            <View style={{ position: 'relative' }}>
              <Image
                source={{ uri: selectedImageUri }}
                style={{ width: 100, height: 90, resizeMode: 'cover' }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  padding: 5,
                  borderRadius: 50,
                }}
                onPress={clearSelectedImage}
              >
                <Icon name="delete" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity  disabled={isDisabled} style={[styles.button, isDisabled && styles.buttonDisabled]} onPress={Payment}>
              <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={chat}>
          <View style={{backgroundColor:'#69b3fb',height:50,width:50,alignItems:'center',justifyContent:'center',borderRadius:5}}>
          <Icon name="message1" size={20} color="white" />
          </View>
          </TouchableOpacity>
       
          <TouchableOpacity onPress={() => callPhoneNumber(selectedDoctor ? selectedDoctor.mobile_number : null)}>
          <View style={{backgroundColor:'#69b3fb',height:50,width:50,alignItems:'center',justifyContent:'center',borderRadius:5}}>
          <Icon name="phone" size={20} color="white" />
          </View>
          </TouchableOpacity> */}

        </View>

        <View style={{ height: 30 }}></View>


      </ScrollView>

    </View>
  );
};

function getDayName(year, month, day) {
  const date = new Date(year, month, day);
  const dayIndex = date.getDay();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[dayIndex];
}

export default Appointmentscreen;

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: 'gray', // Disabled state color
  },
  scrollViewContainer: {
    flex: 1, // Fill the available space
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    // margin: 15,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  selectedDoctorContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  dayDateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 10,
    width: 130,
    height: 60,
  },
  dateText: {
    fontSize: 16
  },
  dateText: {
    fontSize: 16,
    marginLeft: 5
  },
  appoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 10,
    // width: 100,
    padding:10,
    height: 58,
  },
  problemInput: {
    borderWidth: 1,
    borderColor: '#e3e1da',
    borderRadius: 10,
    // padding: 10,
    margin: 10,
    height: '10%',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 10,
    width: 160,
    height: 60,
  },
  doctorName: {
    fontSize: 17,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: 'black',
    textTransform: 'uppercase'
  },
  specialty: {
    fontSize: 14,
    fontFamily: 'NunitoSans_7pt-Light',
    color: 'grey',
  },
  separator: {
    height: 1,
    backgroundColor: '#e3e1da',
  },
  button: {
    backgroundColor: '#69b3fb',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
  centeredButtonContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    margin: 10,
  },
});
