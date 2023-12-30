import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator } from 'react-native';
import React,{useEffect,useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import Backbutton from './Component/Backbutton';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Messagesscreen = ({navigation,route}) => {

  const { appointmentId,doctorid} = route.params;
  console.log(doctorid)
  const { id } = route.params;
  const [messages, setMessages] = useState([]);
  const [appointmdata, setAppointmdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Load initial messages or set initial state
    setMessages([]);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      callApi();
      getmessage();
    }, []),
  );

  const callApi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const bearerToken = access_token;

      const api = 'http://teleforceglobal.com/doctor/api/v1/user/fetchAppointmentDetails';

      const authToken = bearerToken;

      const formData = new FormData();
      formData.append('appointment_id', appointmentId);

      console.log(formData);

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

        setAppointmdata([parsed_res.data]);
        setLoading(true);
      } else {
        console.error('Non-200 status code:', response?.status);
        setError('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const onSend = async (newMessages = []) => {
    // Update the local state with the new messages
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    // Extract the latest message
    const latestMessage = newMessages[0];

    // Call the API to send the message
    await sendMessageToApi(latestMessage.text);

    // Call the API to get the updated data after sending the message
    callApi();
  };

  const sendMessageToApi = async (text) => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const storeuserid = await AsyncStorage.getItem('userid');
      const storedoctorid = await AsyncStorage.getItem('doctorid');
      const bearerToken = access_token;

      const api = 'http://teleforceglobal.com/doctor/api/storeChat';

      const authToken = bearerToken;

      const formData = new FormData();
      formData.append('message', messageText);
      formData.append('patient_id', storeuserid);
      formData.append('doctor_id', doctorid);
      formData.append('sender_type', 'patient');
      formData.append('appointment_id', appointmentId);

      console.log(formData);

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

        console.log('hloooooooooooooooooooo', parsed_res);
        getmessage();
        setAppointmdata(parsed_res.data);
      } else {
        console.error('Non-200 status code:', response?.status);
        setError('Error fetching data');
      }
    } catch (error) {
        console.error('Error:', error);
        setError('Error fetching data');
      } finally {
      }
  };

  const getmessage = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const storeuserid = await AsyncStorage.getItem('userid');
      const storedoctorid = await AsyncStorage.getItem('doctorid');
      console.log(storedoctorid)
      const bearerToken = access_token;
  
      const api = 'http://teleforceglobal.com/doctor/api/getChats';
  
      const authToken = bearerToken;
  
      const formData = new FormData();
      formData.append('doctor_id', doctorid);
      formData.append('patient_id', storeuserid);
      formData.append('limit', '10');
      formData.append('offset', '0');
      formData.append('appointment_id', appointmentId);
  
      console.log(formData);
  
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
  
        console.log('hloooooooooooooooooooo', parsed_res);
  
        const newMessages = parsed_res.data.map((message) => ({
            _id: message.id,
            text: message.message,
            createdAt: new Date(message.created_at),
            user: {
              _id: message.user_id,
              name: message.sender_type === 'patient' ? 'Patient' : 'Doctor',
            },
            position: message.user_id === storeuserid ? 'right' : 'left',
          }));
  
        setMessages(newMessages);
      } else {
        console.error('Non-200 status code:', response?.status);
        setError('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching data');
    } finally {
      // Add any cleanup code here
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Backbutton />
      {appointmdata && appointmdata.length > 0 && appointmdata.map((scription, index) => ( <Text style={styles.title}>{appointmdata[0].doctor.name}</Text>))}
    </View>
    {loading ? (
        <View style={styles.loadingContainer}>
          {/* <ActivityIndicator size="large" color="#0000ff" />
          {appointmdata && appointmdata.length > 0 && appointmdata.map((scription, index) => ( <Text style={styles.loadingTitle}>{appointmdata[0].doctor.name}</Text>))} */}
        </View>
      ) : (
        <GiftedChat
        messages={messages}
        onSend={onSend}
        showAvatarForEveryMessage={true}
        onInputTextChanged={(text) => setMessageText(text)}
        user={{
          _id: 'patient',
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#ffffff',
                },
              }}
            />
          );
        }}
      />
      
      )}
  </View>
  );
};

export default Messagesscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '6%',
    backgroundColor: '#4a87d7',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    marginTop: 16,
    fontSize: 18,
  },
});
