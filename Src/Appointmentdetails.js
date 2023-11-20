import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Appointmentdetails = ({ navigation, route }) => {
  const { id } = route.params;
  const [appointmdata, setAppointmdata] = useState(null);

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
        setAppointmdata(parsed_res.data);
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
          <Icon name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>
            Appointment Details
          </Text>
        </View>
      </View>

<View style={{flexDirection:'column',margin:10,justifyContent:'space-between'}}>
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


<View style={{flexDirection:'row',}}>
<View style={{top:30}}>
      <Text style={{fontSize:20,fontWeight:'800',color:'black'}}>Doctor Details:</Text>
      <View style={{flexDirection:'column',justifyContent:'space-between',height:280}}>
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
      </View>
     



      </View>

      <View style={{alignItems:'center',justifyContent:'center',marginLeft:70}}>
        <Image style={{height:150,width:150}} source={require('../Src/Assets/details.png')}/>
      </View>
</View>
     
</View>


    </View>
  );
};

export default Appointmentdetails;

const styles = StyleSheet.create({});
