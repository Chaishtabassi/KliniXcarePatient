import { StyleSheet, Text, View ,Image,TouchableOpacity,FlatList} from 'react-native'
import React,{useEffect, useState} from 'react'
import Backbutton from '../../Component/Backbutton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/EvilIcons';

const Appointment = ({navigation}) => {

  const [apiData, setApiData] = useState([]); 
  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {

    
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    const storeuserid = await AsyncStorage.getItem('userid');
    console.log(storeuserid)

    try {
        const api =
        `http://teleforceglobal.com/doctor/api/v1/user/fetchPatientAppointment`;

      const authToken = bearerToken
        
      const formData = new FormData();

      formData.append('user_id', storeuserid);
      formData.append('status', 0);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Authorization':`Bearer ${authToken}`,
        },
        // body: JSON.stringify(),
        body: formData,
      });

      if (response) {
        if (response.status === 200) {

          const responseText = await response.text();
          const parsed_res = JSON.parse(responseText);
         
        console.log('Response Text:', parsed_res.data);
        setApiData(parsed_res.data);
        return parsed_res.data;
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }

    
    } catch (error) {
      console.error('erorrr',error);
    }
  };


  const renderItem = ({item }) => (
    <View>
      <View style={{ flexDirection: 'row', top: 10 }}>
    <Image style={{height:80,width:80}} source={require('../../Assets/profileimage.png')} />
    <View style={{ flexDirection: 'column', marginLeft: 10, flex: 1 }}>
      <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold' }}>{item.doctor.name}</Text>
        <Text style={{ fontFamily: 'Domine-Regular' }}> {item.doctor.designation}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,top:5}}>
        <Image style={{ height: 12, width: 12 }} source={require('../../Assets/clock.png')} />
        <Text style={{ fontFamily: 'Domine-Regular' }}> {new Date(item.doctor.created_at).toLocaleString()}</Text>
      </View>
    </View>

    <View style={{ alignItems: 'flex-end' }}>
      <Text>${item.doctor.consultation_fee}</Text>
    </View>
  </View>

  <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
    <TouchableOpacity style={styles.button1}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Image  style={{height:12,width:12}}source={require('../../Assets/loader.png')}/>
        <Text style={styles.buttonText}> In Process</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button2}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image  style={{height:12,width:12}}source={require('../../Assets/download.png')}/>
      <Text style={styles.buttonText}> Download</Text>
      </View>
  </TouchableOpacity>

  </View>
    </View>
);

const handleBackButtonPress = () => {
  navigation.goBack();
};


  return (
    <View style={styles.container}>
       <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4989d9',
          padding:10
          // height: '5%',
        }}>
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={{marginLeft: 10}}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
           My Appointment
          </Text>
        </View>
    </View>
 
    {/* <View style={{margin:15}}>
        <Text style={styles.title1}>Upcoming</Text>
       <View style={{flexDirection:'row',top:10}}>
          <View style={styles.box}></View>
       
       <View style={{flexDirection:'column'}}>
       <View style={{flexDirection:'row',marginLeft:10}}>
            <Image style={{height:70,width:70}} source={require('../../Assets/doctorsimage.png')}/>
            <View style={{flexDirection:'column',marginLeft:10}}>
            <Text style={{fontSize:18,fontFamily:'Domine-Bold'}}>Lumbar puncture</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{height:12,width:12}} source={require('../../Assets/clock.png')}/>
               <Text style={{fontFamily:'Domine-Regular'}}> at 4:30 pm</Text>
            </View>
            </View>
          </View>

          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:20}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text>Confirmed</Text>
          <Image source={require('../../Assets/checks.png')}/>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:35,width:90,backgroundColor:'#888888'}}> 
          <Image source={require('../../Assets/chat.png')}/>
          <Text style={{color:'white'}}> 
          Chat</Text>
        </View>
       </View>
       </View>

       </View>

    <View style={styles.separator}></View>

    </View> */}
    
    <View style={{margin:15}}>
        {/* <Text style={styles.title1}>Past Appointment</Text> */}

        <View>
          <FlatList
            data={apiData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

    </View>

    </View>
  )
}

export default Appointment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
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
  title1:{
    fontSize:20,
    fontFamily:'Domine-Bold',
  },
  box:{
    width:100,
    height:100,
    backgroundColor:'#49b2e9'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e1da',
    marginTop:10
  },
  button1: {
    backgroundColor: '#49b2e9',
    // paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '34%', 
    marginRight:15,
    alignItems:'center'
  },
  button2: {
    backgroundColor: '#888888',
    // paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '34%', 
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
})