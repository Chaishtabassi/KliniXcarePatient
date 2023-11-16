import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Backbutton from '../../Component/Backbutton';
import Icon from 'react-native-vector-icons/AntDesign';
import Doctorsdata from '../../Data/Doctorsdata';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sortingmodal from '../../Component/Sortingmodal';

const Doctorslist = ({navigation, route}) => {
  const [sortingModalVisible, setSortingModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const {title, id} = route.params;
  console.log(id);

  const Appointment = doctor => {
    navigation.navigate('doctorprofile',{selectedDoctor: doctor});
    // navigation.navigate('appointment', {selectedDoctor: doctor});
  };

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Retrieve the access_token from AsyncStorage
        const access_token = await AsyncStorage.getItem('access_token');

        if (access_token) {
          const response = await fetch(
            `http://teleforceglobal.com/doctor/api/v1/user/fetch-doctory-by-department?department_id=${id}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            },
          );

          if (response.ok) {
            const data = await response.json();

            if (data.data && data.data.length > 0) {
              const doctorid = data.data[0].id;
              const serviceamount = data.data[0].consultation_fee;
              await AsyncStorage.setItem('doctorid', doctorid.toString());
              await AsyncStorage.setItem(
                'serviceamount',
                serviceamount.toString(),
              );
              setApiData(data.data);
              console.log('Data saved to AsyncStorage');
              console.log('helooooooooooooooooo', data.data);
            } else {
              console.log('No doctors found.');
            }

            setLoading(false);
          } else {
            console.error('Error fetching data. Status:', response.status);
            setLoading(false);
          }
        } else {
          console.error('No access_token found in AsyncStorage.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      {item && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: 80, width: 80}}
            source={require('../../Assets/profileimage.png')}
          />
          <View style={{marginLeft: 15, flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'NunitoSans_7pt-Bold',
                  color: 'black',
                }}>
                {item.name}
              </Text>
              <Icon name="staro" size={25} color="black" />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NunitoSans_7pt-Light',
                  color: 'grey',
                }}>
                {item.designation}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'NunitoSans_7pt-Bold',
                  color: 'black',
                }}>
                {'$' + item.consultation_fee}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../Assets/clock.png')} />
                {item.created_at ? (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: 'grey',
                    }}>
                    {new Date(item.created_at).toLocaleString()}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: 'grey',
                    }}>
                    No Date Available
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                top: 10,
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Appointment(item)}>
                <Text style={styles.buttonText}>Book Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => Appointment(item)}>
                <Text style={styles.buttonText}>Previous Document</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const filter = () => {
    navigation.navigate('filter');
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
          <Icon name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
            {title}
          </Text>
        </View>
      </View>

      <View style={{paddingBottom: 65}}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {apiData.length > 0 ? (
              <FlatList
                data={apiData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  );
};

export default Doctorslist;

const styles = StyleSheet.create({
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
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#49b2e9',
    alignItems: 'center',
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.28,
    height: 52,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 13,
  },
  button1: {
    justifyContent: 'center',
    backgroundColor: '#888888',
    alignItems: 'center',
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.28,
    height: 50,
  },
});
