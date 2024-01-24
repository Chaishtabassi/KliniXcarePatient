import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';

const Appointment = ({ navigation }) => {

  const [apiData, setApiData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [completedChecked, setCompletedChecked] = useState(false);
  const [pendingChecked, setPendingChecked] = useState(false);
  const [declinedChecked, setDeclinedChecked] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {

    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    const storeuserid = await AsyncStorage.getItem('userid');
    console.log(storeuserid)

    try {
      const api =
        `http://teleforceglobal.com/doctor/api/v1/user/fetchPatientAppointment`;

      const authToken = bearerToken

      const formData = new FormData();

      formData.append('user_id', storeuserid);
      // formData.append('status', 0);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        // body: JSON.stringify(),
        body: formData,
      });

      if (response) {
        if (response.status === 200) {

          const responseText = await response.text();
          const parsed_res = JSON.parse(responseText);

          console.log('Response Text:', parsed_res.data);
          setApiData(parsed_res.data);
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

  const details = (id) => {
    navigation.navigate('appointmentdetails', { id: id, })
  }

  const getStatusDescription = status => {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Accepted';
      case 2:
        return 'Completed';
      case 3:
        return 'Declined';
      default:
        return 'Unknown Status';
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <View style={{ backgroundColor: 'white', elevation: 3 }}>
        <View style={{ alignItems: 'center', backgroundColor: '#add4fd' }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black', padding: 7 }}>
            {getStatusDescription(item.status)}
          </Text>


        </View>
        <View style={{ flexDirection: 'row', top: 10 }}>
          <Image style={{ height: 80, width: 80 }} source={require('../../Assets/doctor.jpg')} />
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontFamily: 'NunitoSans_7pt-Bold', color: 'black', textTransform: 'uppercase' }}>
              DR {item.doctor.name} , {item.doctor.degrees}
            </Text>

            <Text style={{ fontFamily: 'Domine-Regular' }}>{item.doctor.designation}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', top: 5 }}>
              <Image style={{ height: 12, width: 12 }} source={require('../../Assets/calendar.png')} />
              {/* <Text style={{ fontFamily: 'Domine-Regular',marginLeft:10 }}>{item.date}</Text> */}

              <Text style={{ fontFamily: 'Domine-Regular', marginLeft: 10 }}>
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 7, paddingTop: 7 }}>
              <Image style={{ height: 12, width: 12 }} source={require('../../Assets/clock.png')} />
              <Text style={{ fontFamily: 'Domine-Regular' }}> {item.time_range}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
            <Image style={{ height: 15, width: 15 }} source={require('../../Assets/peso.png')} />
            <Text style={{
              fontSize: 13,
              fontFamily: 'NunitoSans_7pt-Bold',
              color: 'black',
              marginLeft: 5,
            }}>
              {item.doctor.consultation_fee}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {/* <TouchableOpacity style={styles.button1}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Image  style={{height:12,width:12}}source={require('../../Assets/loader.png')}/>
        <Text style={styles.buttonText}> In Process</Text>
        </View>
    </TouchableOpacity> */}
          <TouchableOpacity style={styles.button2} onPress={() => details(item.id)}>
            <Text style={styles.buttonText}> View Details</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>

  );

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [selectedStatus, setSelectedStatus] = useState({
    completed: true,
    pending: true,
    declined: true,
  });
  const [filteredApiData, setFilteredApiData] = useState([]);

  const filter = useCallback(() => {
    const filteredData = apiData.filter((item) => {
      if (
        (completedChecked && item.status === 2) ||
        (pendingChecked && item.status === 0) ||
        (declinedChecked && item.status === 3)
      ) {
        return true;
      }
      return false;
    });

    setFilteredApiData(filteredData);
    toggleModal(); // Close the modal after applying the filter
  }, [completedChecked, pendingChecked, declinedChecked, apiData]);


  const handleCompletedPress = useCallback(() => {
    setCompletedChecked((prev) => !prev);
  }, []);

  const handlePendingPress = useCallback(() => {
    setPendingChecked((prev) => !prev);
  }, []);

  const handleDeclinedPress = useCallback(() => {
    setDeclinedChecked((prev) => !prev);
  }, []);


  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4989d9',
          padding: 10
          // height: '5%',
        }}>
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={{ marginLeft: 10 }}>
          <Icon name="chevron-left" size={14} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>
            My Appointment
          </Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Image style={{ height: 25, width: 25 }} source={require('../../Assets/sort.png')} />
        </TouchableOpacity>
      </View>


      <View style={{ margin: 15 }}>
        <View>
          <FlatList
            data={filteredApiData.length > 0 ? filteredApiData : apiData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

      </View>


      <Modal
        // animationType="slide" // Slide animation from bottom to top
        transparent={true}
        visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title1}>Filter</Text>
              <TouchableOpacity onPress={toggleModal} style={{ padding: 5 }}>
                <Image resizeMode="contain" style={{ height: 15, width: 15 }} source={require('../../Assets/CloseIcon.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  checked={completedChecked}
                  onPress={handleCompletedPress}
                  checkedColor="#49b2e9"
                />
                <Text style={{ marginLeft: 10 }}>Completed</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  checked={pendingChecked}
                  onPress={handlePendingPress}
                  checkedColor="#49b2e9"
                />
                <Text style={{ marginLeft: 10 }}>Pending</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  checked={declinedChecked}
                  onPress={handleDeclinedPress}
                  checkedColor="#49b2e9"
                />
                <Text style={{ marginLeft: 10 }}>Declined</Text>
              </View>
            </View>


            <TouchableOpacity style={styles.buttons} onPress={filter}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default Appointment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#49B2E9',
    height: '8%'
  },
  buttons: {
    backgroundColor: '#4d91e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    // height: height * 0.1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    height: '44%',
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  title1: {
    fontSize: 20,
    fontFamily: 'Domine-Bold',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#49b2e9'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e1da',
    marginTop: 10
  },
  button1: {
    backgroundColor: '#49b2e9',
    // paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '34%',
    marginRight: 15,
    alignItems: 'center'
  },
  button2: {
    backgroundColor: '#4a87d7',
    // paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 5,
    width: '34%',
    alignItems: 'center',
    margin: 10,
    // top:8
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
})