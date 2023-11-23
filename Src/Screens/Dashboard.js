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
import React, {useState, useEffect} from 'react';
import Header from '../Component/Header';
import Dashboarddata from '../Data/Dashboarddata';
import Homediagnos from '../Data/Homediagnos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Dashboardheader from '../Component/Dashboardheader';

const Dashboard = ({navigation}) => {
  // useEffect(() => {
  //   callApi();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, []),
  );

  const callApi = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(access_token)

    const storeuserid = await AsyncStorage.getItem('fetchuserid');
    console.log(storeuserid)

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/user/fetchPatientAppointment`;

      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('user_id', storeuserid);
      // formData.append('status', 0);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        // body: JSON.stringify(),
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const parsed_res = JSON.parse(responseText);

          console.log(parsed_res.data)
          setApiDat(parsed_res.data);
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

  const details=(id)=>{
    navigation.navigate('appointmentdetails',{ id: id })
  }

  const Item = ({item}) => (
    <TouchableOpacity onPress={() => details(item.id)}>
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Image
          style={styles.image1}
          source={require('../Assets/profileimage.png')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.doctor.name}</Text>
          <Text style={styles.designation}>{item.doctor.designation}</Text>
          <View style={styles.row}>
            <Image
              style={styles.clockIcon}
              source={require('../Assets/clock.png')}
            />
            <Text style={styles.date}>
              {new Date(item.doctor.created_at).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.doctor.consultation_fee}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );

  const [apiData, setApiData] = useState([]);
  const [apiDat, setApiDat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await AsyncStorage.getItem('get_token');
        const bearerToken = access_token;
        console.log('heloooooooooooooooooo',bearerToken);

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
          console.log(data.data);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => doctorslist(item)}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image_url}} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderIte = ({item}) => (
    <View style={[styles.itemContaine, {backgroundColor: item.color}]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.text1}>{item.title}</Text>
    </View>
  );

  // const numColumns = 2;

  const doctorslist = item => {
    console.log('heloo', item);
    navigation.navigate('doctors', {title: item.title, id: item.id});
  };

  const [slicedApiData, setSlicedApiData] = useState([]);

  // Slicing the data when it changes
  useEffect(() => {
    setSlicedApiData(apiData.slice(0, 6)); // Slice the first 4 items
  }, [apiData]);

  const specialist =()=>{
    navigation.navigate('specialist')
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Dashboardheader navigation={navigation}/>
      <ScrollView nestedScrollEnabled={true} style={{flex:1,}}>
        <View style={styles.container}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.bottomText}>Find by Specialties</Text>
          <TouchableOpacity onPress={specialist}>
          <Text style={{fontSize:17,fontWeight:'600'}}>View all</Text>
          </TouchableOpacity>
          {/* <Text style={{fontSize:17,fontWeight:'600'}}>View all</Text> */}
          </View>
        
          <View style={{width: '100%'}}>
            <FlatList
              data={slicedApiData}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
            />
          </View>
          {/* <Image
            style={{height: '20%', width: '100%'}}
            resizeMode="contain"
            source={require('../Assets/dashboard.jpg')}
          /> */}
               {/* <View style={{}}>
            <Text style={styles.bottomText}>Diagnostics & tests</Text>
            <FlatList
              data={Homediagnos}
              renderItem={renderIte}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View> */}
          <View style={{height: apiDat.length > 0 ? '40%' : '10%'}}>
            <Text style={styles.bottomText}>My Appointments</Text>
            {apiDat.length > 0 ? (
              <FlatList
                data={apiDat}
                renderItem={Item}
                keyExtractor={item => item.id.toString()}
                nestedScrollEnabled={true} // Allow nested scrolling
              />
            ) : (
              <Text style={styles.noAppointmentsText}>
                No appointments available
              </Text>
            )}
          </View>
        </View>
        <View style={{height: 30}}></View>
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
    shadowOffset: {width: 0, height: 2},
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    padding: 20,
  },
  itemContaine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#49b2e9',
    borderRadius: 5,
    padding: 15,
    // paddingVertical:20
  },
  imageContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  text1: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Domine-Bold',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color:'#4a87d7',
    fontFamily: 'Domine-Bold',
  },
  container: {
    flex: 1,
    margin: 10,
    height: Dimensions.get('window').height
  },
  bottomText: {
    // margin: 10,
    fontSize: 17,
    color: '#49b2e9',
    fontFamily: 'Domine-Bold',
  },
});
