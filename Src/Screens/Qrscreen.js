import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Qrscreen = ({ route, navigation }) => {
  const { qrCodeData, appointmentId } = route.params;

  const [appointmdata, setAppointmdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[doctorid,setdoctorid]=useState('')

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, []),
  );

  const callApi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const bearerToken = access_token;

      const api = 'http://teleforceglobal.com/doctor/api/v1/user/fetchAppointmentDetails';

      const authToken = bearerToken;

      const formData = new FormData();
      formData.append('appointment_id', appointmentId);

      console.log(formData);

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

        console.log('hloooooooooooooooooooo', parsed_res.data);
        setAppointmdata(parsed_res.data);
        setdoctorid(parsed_res.data.doctor.id)
      } else {
        console.error('Non-200 status code:', response?.status);
        setError('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#478ffd" /> // You can replace this with a loading spinner or any loading indicator
  }

  if (error) {
    return <Text>Error: {error}</Text>; // You can replace this with a more user-friendly error message
  }

  console.log(qrCodeData)

  const screen = () => {
    navigation.navigate('bottom');
  }

  const chat = () => {
    navigation.navigate('message', { appointmentId,doctorid });
  }

  return (
    // <ScrollView>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ margin: 10, alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#4a87d7', marginBottom: 10 }}>
            Your Appointment booked successfully. Please wait for the doctor to accept
          </Text>
        </View>
        <View style={{ top: 20 }}>
          <QRCode
            value={qrCodeData}
            size={200}
          />
        </View>

      </View>


     
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>


<View style={{ flexDirection: 'column', margin: 10, justifyContent: 'space-between',top:20 }}>

{/* <View style={{ flexDirection: 'column',marginBottom:10 }}>
  <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Appointment Number:</Text>
  {appointmdata && (
    <Text style={{ color: 'black', fontSize: 16 }}>
      {appointmdata.appointment_number}
    </Text>
  )}
</View> */}

<View style={{ flexDirection: 'row', marginBottom: 10 }}>
  <Image style={{ height: 80, width: 80 }} source={require('../Assets/doctor.jpg')} />
  <View style={{ marginLeft: 15 }}>
    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black', fontWeight: '700' }}>{appointmdata.doctor.name}</Text>
    <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{appointmdata.doctor.degrees}</Text>
    <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{appointmdata.doctor.experience_year} year experience</Text>
  </View>
</View>

<View style={styles.itemContainer1}>
  <View style={{ flexDirection: 'column' }}>
    <Text style={styles.heading}>Date</Text>
    <Text style={styles.description}>{appointmdata.date}</Text>
  </View>
  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <Text style={styles.heading}>Time</Text>
    <Text style={styles.description}>{appointmdata.slot.time_range}</Text>
  </View>
  <View style={{ flexDirection: 'column' }}>
    <Text style={styles.heading}>Type</Text>
    <Text style={styles.description}>
      {appointmdata.type == 0 ? 'At Clinic' : 'Online'}
    </Text>
  </View>
</View>


<View style={styles.itemContainer1}>
  <Text style={styles.heading}>Consultation Charge</Text>

  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
    <Image style={{ height: 15, width: 15 }} source={require('../Assets/peso.png')} />
    <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
      {appointmdata.doctor.consultation_fee}
    </Text>
  </View>
</View>

<View style={styles.itemContainer1}>
  {/* <Text style={styles.heading}>Coupon Discount</Text> */}
  <Text style={styles.heading}>Extra Charges</Text>

  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
    <Image style={{ height: 15, width: 15 }} source={require('../Assets/peso.png')} />
    <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
      {appointmdata.discount_amount}
    </Text>
  </View>
</View>

<View style={styles.itemContainer1}>
  <Text style={styles.heading}>Total Amount</Text>

  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
    <Image style={{ height: 15, width: 15 }} source={require('../Assets/peso.png')} />
    <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
      {appointmdata.subtotal}
    </Text>
  </View>
</View>
</View>

          {/* <View style={{ flexDirection: 'column', margin: 10, justifyContent: 'space-between', top: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: 'black' }}>Appointment Number:</Text>
                {appointmdata && (
                  <Text style={{ color: 'black', fontSize: 16 }}>
                    {appointmdata.appointment_number}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: 'black' }}>Date:</Text>
                {appointmdata && (
                  <Text style={{ color: 'black', fontSize: 16 }}>
                    {appointmdata.date}
                  </Text>
                )}
              </View>

            </View>

            <View style={{ flexDirection: 'column', top: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: 'black' }}>Time:</Text>
              {appointmdata && (
                <Text style={{ color: 'black', fontSize: 16 }}>
                  {appointmdata.slot.time_range}
                </Text>
              )}
            </View>


            <View style={{ flexDirection: 'row', }}>
              <View style={{ top: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>Doctor Details:</Text>

                <View style={{ flexDirection: 'row', top: 10, justifyContent: 'space-between' }}>
                  <Image style={{ height: 80, width: 80 }} source={require('../Assets/doctor.jpg')} />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black', fontWeight: '700' }}>{appointmdata.doctor.name}</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{appointmdata.doctor.degrees}</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{appointmdata.doctor.experience_year} year experience</Text>
                  </View>
                </View>

                <View style={{ top: 15 }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Consultation fee</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../Assets/peso.png')} />
                    {appointmdata && (
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        {appointmdata.doctor.consultation_fee}
                      </Text>
                    )}
                  </View>

                </View>
              </View>
            </View>

          </View> */}
        </>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignSelf:'center'}}>
        {/* <TouchableOpacity style={styles.button1} onPress={() => chat()}>
          <Image style={{ height: 30, width: 30 }} source={require('../Assets/chatting.png')} />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={() => screen()}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>

    </View>
    // </ScrollView>
  );
};

export default Qrscreen;

const styles = StyleSheet.create({
  itemContaine: {
    marginBottom: 15,
    backgroundColor: '#f6f8fb',
    borderRadius: 5,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer1: {
    marginBottom: 15,
    backgroundColor: '#f6f8fb',
    borderRadius: 5,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top: 26
  },
  heading: {
    fontSize: 17,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: 'black',
  },
  description: {
    fontSize: 15,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: '#49b2e9',
    top: 5,
  },
  description1: {
    fontSize: 15,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: '#49b2e9',
  },
  button: {
    backgroundColor: '#69b3fb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    top:20,
  },
  button1: {
    backgroundColor: '#69b3fb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 70,
    width: Dimensions.get('window').width * 0.2,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
})

