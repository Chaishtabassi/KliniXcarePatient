import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, PermissionsAndroid, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Medicalprescription = ({ route, navigation }) => {
  const { id } = route.params;
  const [certificateUrl, setCertificateUrl] = useState('');
  const [prescriptionUrl, setPrescriptionUrl] = useState('');
  const [instructionsUrl, setInstructionsUrl] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      callApi();
      prescriptionview()
      certificateview()
      instructionview()
    }, []),
  );

  const certificateview = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/printMedicalCertificate';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', id);

      console.log(formData);

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
        setCertificateUrl(responseData.pdf_url); 
      } else {
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  const prescriptionview = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/printPrescription';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', id);

      console.log(formData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('certificate', responseData.pdf_url);

        setPrescriptionUrl(responseData.pdf_url);

      } else {
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  const instructionview = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/printInstruction';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', id);

      console.log(formData);

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

        setInstructionsUrl(responseData.pdf_url);
      } else {
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  useEffect(() => {
    requestExternalStoragePermission();
  }, []);

  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permission Required',
          message: 'This app needs access to your external storage to download files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('External storage permission granted');
        // Proceed with file download
      } else {
        console.log('External storage permission denied');
        // Handle denial of permission
      }
    } catch (error) {
      console.error('Error requesting external storage permission:', error);
    }
  };


  const handleDownloadButtonClick = () => {
    medicalcertificate();
  };


  const [medicine, setMedicine] = useState(null);
  const [prescriptionid, setprescriptionid] = useState('')

  const medicalcertificate = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/printMedicalCertificate';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', id);

      console.log(formData);

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
        setCertificateUrl(pdfUrl); 
        const pdfUrl = responseData.pdf_url;
        const { config, fs } = RNFetchBlob;

        const dest = fs.dirs.DownloadDir + '/medical_certificate.pdf';

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

  const Prescriptionapi = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/printPrescription';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', id);

      console.log(formData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('certificate', responseData.pdf_url);

        setPrescriptionUrl(pdfUrl);

        const pdfUrl = responseData.pdf_url;
        const { config, fs } = RNFetchBlob;

        const dest = fs.dirs.DownloadDir + '/Prescription.pdf';

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

  const Instructionapi = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/user/printInstruction';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', id);

      console.log(formData);

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

        setInstructionsUrl(pdfUrl);
        const pdfUrl = responseData.pdf_url;
        const { config, fs } = RNFetchBlob;

        const dest = fs.dirs.DownloadDir + '/Instructions.pdf';

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


  const handleOpenUrl = (url) => {
    console.log(url)
    if (url) {
      console.log('Opening URL:', url);
      Linking.openURL(url);
    }
  };

  const callApi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const bearerToken = access_token;

      const api = 'http://teleforceglobal.com/doctor/api/v1/user/fetchAppointmentPrescription';

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
        setMedicine(parsed_res.data);
        setprescriptionid(parsed_res.data.id)
      } else {
        console.error('Non-200 status code:', response?.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
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
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>Medical Prescription</Text>
        </View>
      </View>

      {medicine && medicine.prescription_details && medicine.prescription_details.length > 0 ? (
        <View style={{ margin: 10 }}>
          <View key={medicine.id} style={{ marginTop: 10 }}>
            <Text>Medicine Name: {medicine.prescription_details[0].medicine.name}</Text>
            <Text>Dosage: {medicine.prescription_details[0].dosage}</Text>
            <Text>Duration: {medicine.prescription_details[0].dose_duration.name} days</Text>
            <Text>Dose Interval: {medicine.prescription_details[0].dose_interval.name} hours</Text>
          </View>
        </View>
      ) : (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            style={{ height: 200, width: '65%' }}
            resizeMode="contain"
            source={require('../../Assets/null.png')}
          />
        </View>
      )}

      <View style={{ marginHorizontal: 10, top: 15, flexDirection: 'column', justifyContent: 'space-between', height: '25%' }}>

        <View style={styles.buttons}>
          <Text style={styles.buttonText}>Medical Certificate</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                console.log('Opening URL:', certificateUrl);
                certificateUrl && Linking.openURL(certificateUrl);
              }}
            >
              <Icon name="eye" color="black" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownloadButtonClick}>
              <AntDesignIcon name="download" color="black" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttons}>
          <Text style={styles.buttonText}>Prescription</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginRight: 10 }}
             onPress={() => {
              console.log('Opening URL:', prescriptionUrl);
              prescriptionUrl && Linking.openURL(prescriptionUrl);
            }}
            >
              <Icon name="eye" color="black" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={Prescriptionapi} >
              <AntDesignIcon name="download" color="black" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttons} onPress={Instructionapi} >
          <Text style={styles.buttonText}>Instructions</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginRight: 10 }}
             onPress={() => {
              console.log('Opening URL:', instructionsUrl);
              instructionsUrl && Linking.openURL(instructionsUrl);
            }}
            >
              <Icon name="eye" color="black" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={Instructionapi} >
              <AntDesignIcon name="download" color="black" size={20} />
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </View>
  );
};

export default Medicalprescription;

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: '#e4e7ed',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: 'black',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
