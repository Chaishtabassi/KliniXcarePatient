import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler ,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboardheader from '../Component/Dashboardheader';
import Dashboardbanner from './Dashboardbanner';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {

  const [apiData, setApiData] = useState([]);
  const [apidisease, setdiseaseData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isFocused]);
  useEffect(() => {
    const news = async () => {
      try {
        const access_token = await AsyncStorage.getItem('get_token');
        const bearerToken = access_token;
        console.log('heloooooooooooooooooo', bearerToken);

        const response = await fetch(
          'http://teleforceglobal.com/doctor/api/v1/user/getLetestNews',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setlatestnews(data.data);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    news();
  }, []);


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
    navigation.navigate('doctors', { title: item.category.title, id: item.id });
  };

  const [slicedApiData, setSlicedApiData] = useState([]);
  const [disease, setdisease] = useState([]);
  const [latestnews, setlatestnews] = useState([]);


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

  const renderHealthTip = ({ item, index }) => (
    <View
      style={[
        styles.healthTipContainer,
      ]}
    >
      {item.image && (
        <Image
          source={{ uri: item.image_url }}
          style={styles.healthTipImage}
        />
      )}

      <View style={styles.healthTipQuoteContainer}>
        <Text style={styles.healthTipQuote}>{item.news}</Text>
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Dashboardheader navigation={navigation} />
      {/* <Header /> */}
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.bottomText}>Find by Specialties</Text>
                <TouchableOpacity onPress={specialist}>
                  <Text style={{ fontSize: 17, fontWeight: '600', textTransform: 'uppercase' }}>View all</Text>
                </TouchableOpacity>
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
                <Text style={{ fontSize: 17, fontWeight: '600', textTransform: 'uppercase' }}>View all</Text>
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

          <View style={{ margin: 10 }}>
            <Text style={styles.bottomText}>Latest News</Text>
          </View>

          <View>
            <FlatList
              data={latestnews}
              keyExtractor={(item) => item.id}
              renderItem={renderHealthTip}
            />
          </View>
        </View>
        <View style={{ height:350 }}></View>
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
  healthTipContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f3eb',
    flexDirection: 'row',
    shadowColor: '#7aa8e6', // Add shadow color
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  healthTipImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10, // Add some margin to separate image and text
  },
  healthTipQuoteContainer: {
    width: 250
  },
  healthTipQuote: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'NunitoSans_7pt-Regular',
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
    textTransform: 'uppercase',
    fontSize: 17,
    color: '#49b2e9',
    fontFamily: 'Domine-Bold',
  },
});
