import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const Medicalprescription = ({ route, navigation }) => {
  const { id } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, []),
  );

  const handleDownloadButtonClick = () => {
    medicalcertificate();
  };

  const [medicine, setMedicine] = useState(null);
  const [prescriptionid, setprescriptionid] = useState('')

  const medicalcertificate = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/medicalCertificatePdf';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('prescription_id', prescriptionid);

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

        // Download the PDF
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

      {medicine ? (
        <View style={{ margin: 10 }}>
          <View key={medicine.id} style={{ marginTop: 10 }}>
            <Text>Medicine Name: {medicine.prescription_details[0].medicine.name}</Text>
            <Text>Dosage: {medicine.prescription_details[0].dosage}</Text>
            <Text>Duration: {medicine.prescription_details[0].dose_duration.name} days</Text>
            <Text>Dose Interval: {medicine.prescription_details[0].dose_interval.name} hours</Text>
          </View>

          <View style={{ flexDirection: 'column', top: 30 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Summary:</Text>
            <Text
              style={{ color: 'black', fontSize: 16, backgroundColor: '#f6f8fb', padding: 10 }}>
              {medicine.summary}
            </Text>
          </View>
        </View>
      ) : (
        <Text>No prescriptions available</Text>
      )}

      <View style={{ margin: 10, top: 50 }}>
        <Button title="Download PDF" onPress={handleDownloadButtonClick} />
      </View>

    </View>
  );
};

export default Medicalprescription;

const styles = StyleSheet.create({});
