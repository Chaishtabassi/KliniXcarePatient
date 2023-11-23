import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react';
import Backbutton from '../../Component/Backbutton'
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Faqscreen = () => {

  const [apiData, setApiData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await AsyncStorage.getItem('access_token');
        const bearerToken = access_token;

        const response = await fetch('http://teleforceglobal.com/doctor/api/v1/user/fetchFaqCats', {
          method: 'POST',
          headers: {
            'Authorization':`Bearer ${bearerToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApiData(data.data[0].faqs);
          console.log(data.data[0].faqs);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

      const [expandedItems, setExpandedItems] = useState({});

      const toggleItem = (question) => {
        setExpandedItems((prevState) => ({
          ...prevState,
          [question]: !prevState[question],
        }));
      };

      const renderFAQItem = ({ item }) => (
        <View style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleItem(item.question)}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Icon
                name={expandedItems[item.question] ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#333"
              />
            </View>
          </TouchableOpacity>
          {expandedItems[item.question] && <Text style={styles.answer}>{item.answer}</Text>}
        </View>
      );

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
          padding:10
          // height: '5%',
        }}>
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={{marginLeft: 10}}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
           FAQ
          </Text>
        </View>
       </View>
       <FlatList
      data={apiData}
      renderItem={renderFAQItem}
      keyExtractor={(item) => item.question}
      style={{padding:15}}
    />
    </View>
  )
}

export default Faqscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
      },
      title: {
        flex: 1,
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        textAlign: 'center',
        alignSelf: 'center',
      },
      textContainer: {
        margin: 10,
        padding: 10,
        alignItems: 'center', 
      },
      faqItem: {
        marginBottom: 16,
      },
      questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      question: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
      },
      answer: {
        fontSize: 16,
        marginTop: 8,
        color: '#555',
      },
})