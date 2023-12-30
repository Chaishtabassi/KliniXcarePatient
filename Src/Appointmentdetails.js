import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const Appointmentdetails = ({ navigation, route }) => {
  const { id } = route.params;
  console.log(id)
  const [isLoading, setIsLoading] = useState(true);
  const [appointmdata, setAppointmdata] = useState(null);
  const [doctorid, setdoctorid] = useState('')

  const handleBackButtonPress = () => {
    navigation.goBack();
  };


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
      formData.append('appointment_id', id);

      console.log(formData)

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

        console.log(parsed_res.data);
        setdoctorid(parsed_res.data.doctor.id)
        setAppointmdata(parsed_res.data);
        setIsLoading(false);
      } else {
        console.error('Non-200 status code:', response?.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (appointmdata) {
      console.log(appointmdata.appointment_number);
    }
  }, [appointmdata]);

  const chat = () => {
    navigation.navigate('messagescreen', { id, doctorid });
  }

  const qr = () => {
    navigation.navigate('scan')
  }

  const medical = patien => {
    navigation.navigate('medical', { appointmdata: patien , id: id, });
    console.log(patien);
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4989d9',
          height: '7%',
        }}>
        <TouchableOpacity onPress={handleBackButtonPress} style={{ marginLeft: 10 }}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>
            Appointment Details
          </Text>
        </View>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => qr()}>
          <Image style={{ height: 30, width: 30 }} source={require('./Assets/qr.png')} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>

          <View style={{ flexDirection: 'column', margin: 10, justifyContent: 'space-between' }}>

            {/* <View style={{ flexDirection: 'column',marginBottom:10 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Appointment Number:</Text>
              {appointmdata && (
                <Text style={{ color: 'black', fontSize: 16 }}>
                  {appointmdata.appointment_number}
                </Text>
              )}
            </View> */}

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Image style={{ height: 80, width: 80 }} source={require('./Assets/doctor.jpg')} />
              <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black', fontWeight: '700' }}>{appointmdata.doctor.name}</Text>
                <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{appointmdata.doctor.degrees}</Text>
                <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{appointmdata.doctor.experience_year} year experience</Text>
              </View>
            </View>
{ appointmdata && appointmdata.length > 0 &&
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
                  {appointmdata.slot.type == 0 ? 'On Clinic' : 'Online'}
                </Text>
              </View>
            </View>
}


            <View style={styles.itemContainer1}>
              <Text style={styles.heading}>Consultation Charge</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <Image style={{ height: 15, width: 15 }} source={require('./Assets/peso.png')} />
                <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
                  {appointmdata.doctor.consultation_fee}
                </Text>
              </View>
            </View>

            <View style={styles.itemContainer1}>
              {/* <Text style={styles.heading}>Coupon Discount</Text> */}
              <Text style={styles.heading}>Extra Charges</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <Image style={{ height: 15, width: 15 }} source={require('./Assets/peso.png')} />
                <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
                  {appointmdata.discount_amount}
                </Text>
              </View>
            </View>

            <View style={styles.itemContainer1}>
              <Text style={styles.heading}>Total Amount</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <Image style={{ height: 15, width: 15 }} source={require('./Assets/peso.png')} />
                <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
                  {appointmdata.subtotal}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'column', marginBottom: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Your Problem:</Text>
              {appointmdata && (
                <Text style={{ color: 'black', fontSize: 16, backgroundColor: '#f6f8fb', padding: 10 }}>
                  {appointmdata.problem}
                </Text>
              )}
            </View>

            <View style={{ flexDirection: 'column', marginBottom: 25 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Attachments:</Text>
              {appointmdata && (
                <Text style={{ color: 'black', fontSize: 16, backgroundColor: '#f6f8fb', padding: 10 }}>
                  {appointmdata.documents}
                </Text>
              )}
            </View>

            {appointmdata.status === 2 && (
              <>
                <View style={styles.itemContainer1}>
                  <Text style={styles.heading}>Medical Prescription</Text>
                  <TouchableOpacity onPress={() => medical(appointmdata)}>
                    <Icon name='chevron-right' size={35} />
                  </TouchableOpacity>
                </View>
              </>
            )}

{appointmdata.status === 3 && (
              <>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Reason:</Text>
                <View style={styles.itemContainer1}>
                  <Text style={styles.heading}>{appointmdata.reason}</Text>
                </View>
              </>
            )}

          </View>
        </>
      )}
    </View>
  );
};

export default Appointmentdetails;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#69b3fb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 70,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
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
})
