import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Dashboardheader from '../Component/Dashboardheader';
import Dashboardbanner from './Dashboardbanner';
import Header from '../Component/Header';

const Dashboard = ({ navigation }) => {

  // useFocusEffect(
  //   React.useCallback(() => {
  //     callApi();
  //   }, []),
  // );

  // const callApi = async () => {
  //   const access_token = await AsyncStorage.getItem('access_token');
  //   const bearerToken = access_token;
  //   console.log(access_token)

  //   const storeuserid = await AsyncStorage.getItem('fetchuserid');
  //   console.log(storeuserid)

  //   try {
  //     const api = `http://teleforceglobal.com/doctor/api/v1/user/fetchPatientAppointment`;

  //     const authToken = bearerToken;

  //     const formData = new FormData();

  //     formData.append('user_id', storeuserid);
  //     // formData.append('status', 0);

  //     const response = await fetch(api, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //       // body: JSON.stringify(),
  //       body: formData,
  //     });

  //     if (response) {
  //       if (response.status === 200) {
  //         const responseText = await response.text();
  //         const parsed_res = JSON.parse(responseText);

  //         setApiDat(parsed_res.data);
  //         return parsed_res.data;
  //       } else {
  //         console.error('Non-200 status code:', response.status);
  //       }
  //     } else {
  //       console.error('Response is undefined');
  //     }
  //   } catch (error) {
  //     console.error('erorrr', error);
  //   }
  // };

  // const details = (id) => {
  //   navigation.navigate('appointmentdetails', { id: id })
  // }

  // const Item = ({ item }) => (
  //   <TouchableOpacity onPress={() => details(item.id)}>
  //     <View style={styles.cardContainer}>
  //       <View style={styles.cardContent}>
  //         <Image
  //           style={styles.image1}
  //           source={require('../Assets/profileimage.png')}
  //         />
  //         <View style={styles.textContainer}>
  //           <Text style={styles.name}>{item.doctor.name}</Text>
  //           <Text style={styles.designation}>{item.doctor.designation}</Text>
  //           <View style={styles.row}>
  //             {/* <Image
  //             style={styles.clockIcon}
  //             source={require('../Assets/clock.png')}
  //           /> */}
  //             <Text style={styles.date}>
  //               {item.time_range}
  //             </Text>
  //           </View>
  //         </View>
  //         {/* <View style={styles.priceContainer}>
  //         <Text style={styles.price}>{item.doctor.consultation_fee}</Text>
  //       </View> */}
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

  const [apiData, setApiData] = useState([]);
  const [apidisease, setdiseaseData] = useState([]);

  const [apiDat, setApiDat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await AsyncStorage.getItem('get_token');
        const bearerToken = access_token;
        console.log('heloooooooooooooooooo', bearerToken);

        const response = await fetch(
          'http://teleforceglobal.com/doctor/api/v1/user/fetch-department',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setApiData(data.data);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDat = async () => {
      try {
        const access_token = await AsyncStorage.getItem('get_token');
        const bearerToken = access_token;

        const formData = new FormData();
        formData.append('start', 1);
        formData.append('count', 100);


        const response = await fetch(
          'http://teleforceglobal.com/doctor/api/fetchDisease',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
            body: formData,

          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setdiseaseData(data.data);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDat();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => doctorslist(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image_url }} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderIte = ({ item }) => (
    <TouchableOpacity onPress={() => doctorslis(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image_url }} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.disease}</Text>
      </View>
    </TouchableOpacity>
  );

  const doctorslist = item => {
    navigation.navigate('doctors', { title: item.title, id: item.id });
  };

  const doctorslis = item => {
    navigation.navigate('doctors', { title:item.category.title, id: item.id });
  };

  const [slicedApiData, setSlicedApiData] = useState([]);
  const [disease, setdisease] = useState([]);

  // Slicing the data when it changes
  useEffect(() => {
    setSlicedApiData(apiData.slice(0, 6));
  }, [apiData]);

  useEffect(() => {
    setdisease(apidisease.slice(0, 6));
  }, [apidisease]);

  const specialist = () => {
    navigation.navigate('specialist')
  }

  const Disease = () => {
    navigation.navigate('disease')
  }

  const appointment = () => {
    navigation.navigate('bookappointment')
  }

  const vedioscreen = () => {
    navigation.navigate('specialist')
  }

  const visitscreen = () => {
    navigation.navigate('specialist')
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Dashboardheader navigation={navigation} />
      {/* <Header /> */}
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
              <TouchableOpacity style={{ width: '32%' }} onPress={vedioscreen}>
                <View style={{ backgroundColor: '#f1f5ff', borderRadius: 15, alignItems: 'center', }}>
                  <Image style={{ height: 100, width: 100 }} resizeMode='contain' source={require('../Assets/dashboardtop/vedioconsult.png')} />
                  <Text style={{ fontSize: 13, color: 'black', fontWeight: '500' }}>Video consult</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity onPress={appointment} style={{ width: '32%' }}>
                <View style={{ backgroundColor: '#f1f5ff', borderRadius: 15, alignItems: 'center' }}>

                  <Image style={{ height: 100, width: 130, marginRight: 20 }} resizeMode='contain' source={require('../Assets/dashboardtop/bookappointment.png')} />
                  <Text style={{ fontSize: 13, color: 'black', fontWeight: '500' }}>Book Appointment</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ width: '32%' }} onPress={visitscreen}>
                <View style={{ backgroundColor: '#f1f5ff', borderRadius: 15, alignItems: 'center' }}>

                  <Image style={{ height: 100, width: 130,marginRight:37}} resizeMode='contain' source={require('../Assets/dashboardtop/visitclinic.png')} />
                  <Text style={{ fontSize: 13, color: 'black', fontWeight: '500' }}>Visit Clinic</Text>
                </View>
              </TouchableOpacity>

            </View> */}

          

            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.bottomText}>Find by Specialties</Text>
                <TouchableOpacity onPress={specialist}>
                  <Text style={{ fontSize: 17, fontWeight: '600',textTransform: 'uppercase'   }}>View all</Text>
                </TouchableOpacity>
                {/* <Text style={{fontSize:17,fontWeight:'600'}}>View all</Text> */}
              </View>

              <FlatList
                data={slicedApiData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                showsHorizontalScrollIndicator={false}
              />
            </View>

          </View>

          <View>
              <Dashboardbanner />
            </View>

          <View style={{ margin: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.bottomText}>Diseases</Text>
              <TouchableOpacity onPress={Disease}>
                <Text style={{ fontSize: 17, fontWeight: '600',textTransform: 'uppercase'   }}>View all</Text>
              </TouchableOpacity>
              {/* <Text style={{fontSize:17,fontWeight:'600'}}>View all</Text> */}
            </View>

            <FlatList
              data={disease}
              renderItem={renderIte}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* <View style={{margin:10}}>
          <Text style={styles.bottomText}>Health tip of the day</Text>
          </View> */}

          {/* <View style={{ height: apiDat.length > 0 ? '50%' : '10%',margin:10 }}>
            <Text style={styles.bottomText}>My Appointments</Text>
            {apiDat.length > 0 ? (
              <FlatList
                data={apiDat}
                renderItem={Item}
                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                nestedScrollEnabled={true}
              />
            ) : (
              <Text style={styles.noAppointmentsText}>No appointments booked</Text>
            )}
          </View> */}
        </View>
        {/* <View style={{ height: 20 }}></View> */}
      </ScrollView>
    </View>
  );
};

export default Dashboard;


const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
  },
  image1: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Domine-Bold',
  },
  designation: {
    fontFamily: 'Domine-Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  clockIcon: {
    height: 12,
    width: 12,
  },
  date: {
    fontFamily: 'Domine-Regular',
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 4,
    margin: 10,
  },
  imageContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: '#4a87d7',
    fontFamily: 'Domine-Bold',
  },
  container: {
    flex: 1,
    // margin: 10,
    height: Dimensions.get('window').height
  },
  bottomText: {
    // margin: 10,
    textTransform: 'uppercase' ,
    fontSize: 17,
    color: '#49b2e9',
    fontFamily: 'Domine-Bold',
  },
});
