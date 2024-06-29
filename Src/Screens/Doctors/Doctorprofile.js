import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import Backbutton from '../../Component/Backbutton';

const Doctorprofile = ({ navigation, route }) => {
  const selectedDoctor = route.params ? route.params.selectedDoctor : null;

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const appointment = doctor => {
    navigation.navigate('appointment', { selectedDoctor: doctor });
  }

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      const bearerToken = access_token;
      console.log(bearerToken);

      const storedoctorid = selectedDoctor.id;

      try {
        const api = `https://espinarealty.com/doctor/api/v1/user/fetchDoctorProfile`;

        const authToken = bearerToken;

        const formData = new FormData();

        formData.append('doctor_id', storedoctorid);

        console.log('hello', formData);

        const response = await fetch(api, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
          // body: JSON.stringify(),
          body: formData,
        });

        if (response) {
          if (response.status === 200) {
            const responseJson = await response.json();
            console.log(responseJson.data);
            setApiData(responseJson.data);
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

    callApi();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4a87d7',
          height: '7%',
        }}>
     <Backbutton/>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>
            Doctor's Profile
          </Text>
        </View>
      </View>
      {/* <ScrollView style={{backgroundColor: 'white',borderTopRightRadius:30,borderTopLeftRadius:30, position:'relative',top:-30}}> */}
      <View style={{ margin: 15 }}>
        <View style={{ justifyContent: 'space-evenly' }}>


          <View style={{ flexDirection: 'row' }}>

            <Image style={{ height: 80, width: 80 }} source={require('../../Assets/doctor.jpg')} />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: 'black' }}>
                {apiData.name}
              </Text>
              {apiData && apiData.reviews && (
                <View style={{ alignItems: 'flex-start', top: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Rating
                    imageSize={15}
                    startingValue={apiData.rating}
                    readonly
                  />
                  {/* <Text style={{ fontSize: 12, color: 'grey' }}>  {apiData.reviews.length} reviews</Text> */}
                </View>
              )}

              <View style={{ top: 14 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  {apiData.designation}
                </Text>
                <Text style={{ fontWeight: '400' }}>{apiData.degrees}</Text>
              </View>
            </View>

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 16 }}>
            <View
              style={{
                backgroundColor: 'white',
                top: 10,
                // padding: 5,
                width: '48%',
                borderRadius: 5,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: 'grey',
                elevation: 5
              }}>
              <Image style={{ height: 20, width: 20 }} source={require('../../Assets/experience.png')} />
              <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 17, fontWeight: '600', color: 'black' }}>
                  {apiData.experience_year} years
                </Text>
                <Text>Experience</Text>
              </View>

            </View>
            <View
              style={{
                backgroundColor: 'white',
                top: 10,
                // padding: 5,
                width: '48%',
                borderRadius: 5,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: 'grey',
                elevation: 5
              }}>
              <Image style={{ height: 20, width: 20 }} source={require('../../Assets/star.png')} />
              <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10 }}>
                {apiData && apiData.reviews && apiData.reviews.length > 0
                  ? `${apiData.reviews.length} review`
                  : `${apiData.reviews} reviews`}
              </Text>

            </View>
          </View>

        </View>

        <View style={{ justifyContent: 'space-between', height: '64%', top: 40 }}>
          <View style={{}}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
              ABOUT
            </Text>
            {apiData.length > 0 ? (
              <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '600' }}>{apiData.about_youself}</Text>
            ) : (
              <View
                style={{
                  // margin: 10,
                  // backgroundColor: '#f7f7f7',
                  height: 40,
                  justifyContent: 'center',
                }}>
                {/* <Text style={{fontSize: 18}}>There is No About.</Text> */}
              </View>
            )}
          </View>


          <View style={{ flexDirection: 'row', }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>SPECIALIZATION:</Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

            {apiData && apiData.expertise && apiData.expertise.length > 0 && (
              <View style={{ marginRight: 10, marginBottom: 10, backgroundColor: '#fffbf6', padding: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#ecb360' }}>
                  {apiData.expertise[0].title}
                </Text>
              </View>
            )}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>RATING:</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 6 }}>
              <Image style={{ height: 20, width: 20 }} source={require('../../Assets/star.png')} />

              {apiData && apiData.reviews && apiData.reviews.length > 0 && (
                <Text>{apiData.reviews[0].rating}</Text>
              )}
              {/*               
              {apiData && apiData.reviews && apiData.reviews.length > 0 && (
                  <Rating
                    imageSize={15}
                    startingValue={apiData.reviews[0].rating}
                    readonly
                  />
              )} */}
            </View>

          </View>

          <View style={{ flexDirection: 'row' ,top:10}}>
            <Image style={{ height: 50, width: 50 }} source={require('../../Assets/man.jpg')} />
            {apiData && apiData.reviews && apiData.reviews.length > 0 && (
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }}>{apiData.reviews[0].comment}</Text>
              </View>
            )}
          </View>


          {/* <View style={{}}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
              LANGUAGES
            </Text>

            {apiData.length > 0 ? (
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  height: 40,
                  justifyContent: 'center',
                }}>
                {/* <Text style={{fontSize: 18, color: 'black'}}>
                  There is No About.
                </Text> */}
          {/* </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  height: 40,
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 18, color: 'black', marginLeft: 10 }}>
                  {apiData.languages_spoken}
                </Text>
              </View>
            )}
          </View> */}
          <View style={{ top: 20 }}>
            {/* <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
              SLOTS AVAILABLE:
            </Text>
            <Text style={{fontSize:15,fontWeight:'500'}}> Today</Text>
            </View>
           

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {apiData && apiData.slots && apiData.slots.length > 0 ? (
              apiData.slots.map((slot, index) => (
                <View key={index} style={{ marginRight: 10, marginBottom: 10, borderWidth: 1, width: 'auto', borderColor: '#e3e1da', padding: 6, marginTop: 8 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#757876' }}>{slot.time_range}</Text>
                </View>
              ))
            ) : (
              <View style={{ borderWidth: 1, width: '48%', borderColor: '#e3e1da', padding: 6, marginTop: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#757876' }}>No slots available </Text>
              </View>
            )}
          </View> */}

            {/* {apiData.length > 0 ? (
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 18, color: 'black', marginLeft: 10 }}>
                  {apiData.expertise}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                }}> */}
                {/* <Text style={{fontSize: 18, color: 'black'}}>
                  There is No Expertise.
                </Text> */}
              {/* </View>
            )} */}
          </View>
        </View>

      </View>
      <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <TouchableOpacity style={styles.button} onPress={() => appointment(selectedDoctor)}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default Doctorprofile;

const styles = StyleSheet.create({
  container: {
    // // position: 'relative',
    // backgroundColor: 'white',
    // flex: 1,
  },
  image: {
    // height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    height: 30,
    borderRadius: 20,
    width: 30,
  },
  button: {
    backgroundColor: '#4a87d7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
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
});
