import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';

const Bookappointment = ({navigation}) => {

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      const access_token = await AsyncStorage.getItem('access_token');

      try {
        const api = `https://espinarealty.com/doctor/api/v1/user/searchDoctor`;
  
        const formData = new FormData();
  
        formData.append('start', 0);
        formData.append('count', 100);
  
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        });
  
        if (response) {
          if (response.status === 200) {
            const responseText = await response.text();
            const parsed_res = JSON.parse(responseText);
            console.log(parsed_res)
  
            setApiData(parsed_res.data);
            setLoading(false)
            return parsed_res.data;
          } else {
            console.error('Non-200 status code:', response.status);
          }
        } else {
          console.error('Response is undefined');
        }
      } catch (error) {
        console.error('erorrr', error);
      }
    };

    fetchDoctorData();
  }, []);

  
  const Viewprofile = doctor => {
    navigation.navigate('doctorprofile',{selectedDoctor: doctor});
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ height: 80, width: 80 }}
              source={require('../Assets/doctor.jpg')}
            />
            <View style={{ marginLeft: 15, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{}}>
                  <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
                    {item.name}
                  </Text>
                  <View style={{ alignItems: 'flex-start', top: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Rating
                      imageSize={15}
                      startingValue={parseFloat(item.rating)}
                      readonly
                    />
                    {/* {item.reviews.length > 0 && (
                      <Text style={{ fontSize: 12, color: 'grey' }}>{item.reviews.length} reviews</Text>
                    )} */}

                  </View>
                  <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_7pt-Light', color: 'grey', top: 10 }}>
                    {item.designation}
                  </Text>
                </View>
              </View>
              <View style={{ top: 13 }}>
                <Text>{item.experience_year} years experience</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }}>Specialization:</Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {item.expertise.map((expertise, index) => (
              <View key={index} style={{ marginRight: 10, marginBottom: 10, backgroundColor: '#fffbf6' ,padding:8}}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#ecb360' }}>
                  {expertise.title}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }}>Slots available:</Text>
            {/* <Text style={{ color: 'black' }}> Today</Text> */}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {item.today_slots.length > 0 ? (
              item.today_slots.map((slot, index) => (
                <View key={index} style={{ marginRight: 10, marginBottom: 10, borderWidth: 1, width: 'auto', borderColor: '#e3e1da', padding: 6, marginTop: 8 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#757876' }}>{slot.time_range}</Text>
                </View>
              ))
            ) : (
              <View style={{ borderWidth: 1, width: '58%', borderColor: '#e3e1da', padding: 6, marginTop: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#757876' }}>No slots available today</Text>
              </View>
            )}
          </View>

          <View style={styles.separator} />

          <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.button} onPress={() => Appointment(item)}>
              <Text style={styles.buttonText1}>Book</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={() => Viewprofile(item)}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const Appointment = doctor => {
    navigation.navigate('appointment', {selectedDoctor: doctor});
  };

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
          height: '7%',
        }}>
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={{marginLeft: 10}}>
          {/* <Icon name="chevron-left" size={30} color="white" /> */}
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
            Book Appointment
          </Text>
        </View>
      </View>

      <View style={{paddingBottom: 65}}>
        {loading ? (
         <View style={styles.loadingContainer}>
         <ActivityIndicator size="large" color="#478ffd" />
       </View>
        ) : (
          <>
            {apiData.length > 0 ? (
              <FlatList
                data={apiData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            ) : (
              <View style={{margin: 15}}>
                <Text style={{fontSize: 18}}>No doctors found.</Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  )
}

export default Bookappointment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    // alignItems: 'center',
    padding: 12,
    borderRadius: 8, // Add border radius for a card-like appearance
    borderWidth: 1,
    borderColor: '#ddd', // Add border color
    backgroundColor: '#fff', // Add background color
    shadowColor: '#7aa8e6', // Add shadow color
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 8, // Add margin bottom for space between items
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    // margin:15
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#e3e1da',
    top: 5
  },
  button: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    // borderRadius: 10,
    width: Dimensions.get('window').width * 0.45,
    height: 30,
    borderWidth: 1,
    borderColor: '#e3e1da',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0
  },
  buttonText: {
    color: '#4989d9',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  buttonText1: {
    color: '#4989d9',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  button1: {
    justifyContent: 'center',
    // backgroundColor: '#888888',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.45,
    height: 30,
    borderWidth: 1,
    borderColor: '#e3e1da',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0
  },
});