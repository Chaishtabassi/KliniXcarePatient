import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, PermissionsAndroid, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Labrequest = ({ navigation, route }) => {
  const { id } = route.params;
  const [labRequestData, setLabRequestData] = useState(null);

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

      const api = 'http://teleforceglobal.com/doctor/api/v1/user/getLabRequest';

      const authToken = bearerToken;

      const formData = new FormData();
      formData.append('appointment_id', id);
      console.log(formData)

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
        console.log(parsed_res.data)
        setLabRequestData(parsed_res.data);
      } else {
        console.error('Non-200 status code:', response?.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const Printlabrequest = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/printLabRequest';
      const access_token = await AsyncStorage.getItem('access_token');
      console.log(access_token)
      const authToken = access_token;

      const formData = new FormData();
      formData.append('appointment_id', id);

      console.log(formData)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('certificate', responseData);

        // Download the PDF
        const pdfUrl = responseData.pdf_url;
        const { config, fs } = RNFetchBlob;

        const dest = fs.dirs.DownloadDir + '/Lab Request.pdf';

        config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: dest,
            description: 'Downloading PDF',
          },
        })
          .fetch('GET', pdfUrl)
          .then((res) => {
            console.log('File downloaded to:', res.path());
          })
          .catch((error) => {
            console.error('Download error:', error);
          });
      } else {
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };


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
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>Lab Request</Text>
        </View>

        <TouchableOpacity onPress={Printlabrequest}>
          <AntDesignIcon style={{ marginRight: 10 }} name='printer' color='white' size={23} />
        </TouchableOpacity>
      </View>

      {labRequestData ? (
        <View style={styles.labRequestContainer}>
          <Text style={styles.sectionTitle}>Hematology:</Text>
          {Object.values(labRequestData.hematology).map((test, index) => (
            <Text key={index}>{test}</Text>
          ))}
          <Text style={styles.sectionTitle}>Serology:</Text>
          {Object.values(labRequestData.serology).map((test, index) => (
            <Text key={index}>{test}</Text>
          ))}
          <Text style={styles.sectionTitle}>Other Clinical:</Text>
          <Text>{labRequestData.other}</Text>
          <Text style={styles.sectionTitle}>X-Ray:</Text>
          {Object.values(labRequestData.x_Ray).map((test, index) => (
            <Text key={index}>{test}</Text>
          ))}
          <Text style={styles.sectionTitle}>Clinical Chemistry:</Text>
          {Object.values(labRequestData.clinicalChemistry).map((test, index) => (
            <Text key={index}>{test}</Text>
          ))}
        </View>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ height: '65%', width: '65%' }}
            resizeMode="contain"
            source={require('../Assets/null.png')}
          />
        </View>
      )}
    </View>
  )
}

export default Labrequest

const styles = StyleSheet.create({
  labRequestContainer: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
})