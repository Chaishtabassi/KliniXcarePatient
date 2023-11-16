import { StyleSheet, Text, View,Image ,FlatList,Dimensions,TouchableOpacity,Modal} from 'react-native'
import React,{useState,useEffect} from 'react'
import Doctorsdata from '../../Data/Doctorsdata';
import Icon from 'react-native-vector-icons/EvilIcons';
import Backbutton from '../../Component/Backbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Doctorsscreen = ({navigation}) => {

  const [apiData, setApiData] = useState([]); 
  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {

    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    const storeuserid = await AsyncStorage.getItem('userid');
    const storedoctorid = await AsyncStorage.getItem('doctorid');

    try {
        const api = 
        `http://teleforceglobal.com/doctor/api/v1/user/fetchPatientAppointmentWithDoctor`;

      const authToken = bearerToken
        
      const formData = new FormData();

      formData.append('user_id', storeuserid);
      formData.append('doctor_id', storedoctorid);
      // formData.append('status', 0);

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
         
        console.log('Response Text:', parsed_res.data[0].doctor);
        setApiData([parsed_res.data[0].doctor]);
        return parsed_res.data[0].doctor;
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

    const [sortingModalVisible, setSortingModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const Appointment = (doctor) => {
    navigation.navigate('appointment', { selectedDoctor: doctor });
  }
  

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../Assets/doctorsimage.png')}/>
            <View style={{ marginLeft: 15, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{item.name}</Text>
                    <Icon name="star" size={25} color="black" />
                </View>
                <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_7pt-Light', color: 'grey' }}>{item.designation}</Text>
                <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>$ {item.consultation_fee}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../Assets/clock.png')} />
                        <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_7pt-Light', color: 'grey' }}>{new Date(item.created_at).toLocaleString()}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',top:10,justifyContent:'space-evenly'}}>
                <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Send Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1}  onPress={() => Appointment(item)}>
                        <Text style={styles.buttonText}>Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    
      );

  return (
    <View>
      <View style={styles.header}>
        <Backbutton/>
        <Text style={styles.title}>My Doctors</Text>
        </View>
        <View style={{paddingBottom: 65}}>
        <FlatList
        data={apiData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} 
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
        </View>
    </View>
  )
}

export default Doctorsscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomEndRadius:20,
        borderBottomLeftRadius:20,
        backgroundColor:'#49B2E9',
        height:'20%'
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
      separator: {
        height: 1,
        backgroundColor: '#e3e1da',
      },
      button: {
        justifyContent:'center',
        backgroundColor: '#49b2e9',
        alignItems:'center',
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.27,
        height: 50,
      },
      button1: {
        justifyContent:'center',
        backgroundColor: '#888888',
        alignItems:'center',
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.27,
        height: 50,
      },
      buttonText: {
        color: 'white',
        fontFamily:'NunitoSans_7pt-Bold',
        textAlign: 'center',
        fontSize: 16,
      },
})