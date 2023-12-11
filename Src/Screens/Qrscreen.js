import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView,Image,ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Qrscreen = ({ route ,navigation}) => {
  const { qrCodeData, appointmentId } = route.params;

  const [appointmdata, setAppointmdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return  <ActivityIndicator size="large" color="#478ffd" /> // You can replace this with a loading spinner or any loading indicator
  }

  if (error) {
    return <Text>Error: {error}</Text>; // You can replace this with a more user-friendly error message
  }

  console.log(qrCodeData)

  const screen=()=>{
    navigation.navigate('bottom');
  }

  return (
    // <ScrollView>
    <View style={{flex: 1,backgroundColor:'white'}}>
    <View style={{margin: 10, alignItems: 'center'}}>
      <View>
        <Text style={{fontSize: 18, fontWeight: '500', color: '#4a87d7', marginBottom: 10}}>
          Your Appointment booked successfully. Please wait for the doctor to accept
        </Text>
      </View>
     <View style={{top:20}}>
     <QRCode
        value={qrCodeData}
        size={200}
      />
     </View>
    
    </View>


<View style={{flexDirection:'column',margin:20,justifyContent:'space-between',top:20}}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'column'}}>
        <Text style={{fontSize:18,fontWeight:'800',color:'black'}}>Appointment Number:</Text>
      {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
          {appointmdata.appointment_number}
        </Text>
      )} 
        </View>
    <View style={{flexDirection:'column'}}>
    <Text style={{fontSize:18,fontWeight:'800',color:'black'}}>Date:</Text>
      {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
          {appointmdata.date}
        </Text>
      )}
    </View>
  
    </View>

    <View style={{flexDirection:'column',top:10}}>
    <Text style={{fontSize:18,fontWeight:'800',color:'black'}}>Time:</Text>
      {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
        {appointmdata.slot.time_range}
        </Text>
      )}
    </View>


<View style={{flexDirection:'row',}}>
<View style={{top:20}}>
      <Text style={{fontSize:20,fontWeight:'800',color:'black'}}>Doctor Details:</Text>

      <View style={{flexDirection:'row',top:10,justifyContent:'space-between'}}>
        <Image style={{ height: 80, width: 80 }} source={require('../Assets/doctor.jpg')}/>
        <View style={{marginLeft:15}}>
          <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' ,fontWeight:'600'}}>{appointmdata.doctor.name}</Text>
        <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{appointmdata.doctor.degrees}</Text>
        <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{appointmdata.doctor.experience_year} year experience</Text>
        </View>
      </View>

      <View style={{ top:15}}>
     <Text style={{fontSize:18,fontWeight:'700',color:'black'}}>Consultation fee</Text>
     <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={require('../Assets/peso.png')}/>
     {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
          {appointmdata.doctor.consultation_fee}
        </Text>
      )}
     </View>

     {/* <View style={{top:15}}>
<Text style={{fontSize:18,fontWeight:'700',color:'black'}}>Experience year</Text>
      {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
          {appointmdata.doctor.experience_year} year experience
        </Text>
      )}
</View> */}
    
     </View>
      {/* <View style={{flexDirection:'column',justifyContent:'space-between',height:280}}>
      <View style={{}}>
     <Text style={{fontSize:18,fontWeight:'700',color:'black'}}>Consultation fee</Text>
      {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
          {appointmdata.doctor.consultation_fee}
        </Text>
      )}
     </View>
  

<View style={{}}>
<Text style={{fontSize:18,fontWeight:'700',color:'black'}}>Degrees</Text>
      {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
          {appointmdata.doctor.degrees}
        </Text>
      )}
</View>

<View style={{}}>
<Text style={{fontSize:18,fontWeight:'700',color:'black'}}>Designation</Text>
      {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
          {appointmdata.doctor.designation}
        </Text>
      )}
</View>

<View style={{}}>
<Text style={{fontSize:18,fontWeight:'700',color:'black'}}>Experience year</Text>
      {appointmdata && (
        <Text style={{ color: 'black',fontSize:16 }}>
          {appointmdata.doctor.experience_year}
        </Text>
      )}
</View>

<View style={{}}>
<Text style={{fontSize:18,fontWeight:'700',color:'black'}}>Gender</Text>
{appointmdata && (
  <Text style={{ color: 'black', fontSize: 16 }}>
    {appointmdata.doctor.gender == 0 ? 'Female' : 'Male'}
  </Text>
)}
</View>
      </View> */}
      </View>
{/* 
      <View style={{alignItems:'center',justifyContent:'center',marginLeft:70}}>
        <Image style={{height:150,width:150}} source={require('../Src/Assets/details.png')}/>
      </View> */}
</View>

</View>

<View style={{alignItems:'center'}}>
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
})

