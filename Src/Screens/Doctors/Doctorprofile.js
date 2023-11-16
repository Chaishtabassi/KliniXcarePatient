import React, {useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Doctorprofile = ({navigation, route}) => {
  const selectedDoctor = route.params ? route.params.selectedDoctor : null;

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const appointment = doctor =>{
   navigation.navigate('appointment', {selectedDoctor: doctor});
  }

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      const bearerToken = access_token;
      console.log(bearerToken);

      const storedoctorid = selectedDoctor.id;

      try {
        const api = `http://teleforceglobal.com/doctor/api/v1/user/fetchDoctorProfile`;

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
            console.log(responseJson);
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
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={require('../../Assets/doctorprofile.jpg')}
          />
          <TouchableOpacity
            onPress={handleBackButtonPress}
            style={styles.backButton}>
            <Icon name="long-arrow-left" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{margin: 15}}>
          <View style={{justifyContent: 'space-evenly'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 18, fontWeight: '800', color: 'black'}}>
                {apiData.name}
              </Text>
              <Text style={{fontSize: 18, fontWeight: '600'}}>
                ${apiData.consultation_fee}
              </Text>
            </View>
            <View style={{flexDirection: 'row', top: 10}}>
              <Icon name="stethoscope" size={20} color="black" />
              <Text
                style={{
                  color: '#6d97c1',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                {apiData.designation}
              </Text>
            </View>
            <Text style={{top: 10, fontWeight: '400'}}>{apiData.degrees}</Text>
            <View
              style={{
                backgroundColor: '#f7f7f7',
                top: 10,
                height: 50,
                width: '35%',
                borderRadius: 5,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>
                {apiData.experience_year} years Experience
              </Text>
            </View>
          </View>

          <View style={{top: 20}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
              ABOUT DR.
            </Text>
            {apiData.length > 0 ? (
              <Text>{apiData.about_youself}</Text>
            ) : (
              <View
                style={{
                  margin: 10,
                  backgroundColor: '#f7f7f7',
                  height: 40,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18}}>There is No About.</Text>
              </View>
            )}
          </View>
          <View style={{top: 10}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
              LANGUAGES
            </Text>

            {apiData.length > 0 ? (
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  margin: 10,

                  height: 40,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  There is No About.
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  height: 40,
                  margin: 10,

                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  {apiData.languages_spoken}
                </Text>
              </View>
            )}
          </View>
          <View style={{top: 10}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
              EXPERTISE
            </Text>

            {apiData.length > 0 ? (
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  height: 40,
                  margin: 10,

                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  {apiData.expertise}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  height: 40,
                  margin: 10,

                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  There is No Expertise.
                </Text>
              </View>
            )}
          </View>

          <View style={{top: 10}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
              Rating
            </Text>

            {apiData.length > 0 ? (
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  height: 40,
                  margin: 10,

                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  {apiData.rating}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  height: 40,
                  margin: 10,

                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  There is No Expertise.
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => appointment(selectedDoctor)}>
            <Text style={styles.buttonText}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Doctorprofile;

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    height: 200,
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
    backgroundColor: '#69b3fb',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-between',
   alignItems:'center',
    margin: 10,
  },
});
