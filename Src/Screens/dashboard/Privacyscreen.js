import { StyleSheet, Text, View,ScrollView ,TouchableOpacity} from 'react-native'
import Backbutton from '../../Component/Backbutton'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons';

const Privacyscreen = () => {

  const [apiData, setApiData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://teleforceglobal.com/doctor/api/fetchprivacypolicy', {
          method: 'POST',
        });

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

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
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
            Privacy Policy
          </Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold', color: 'black' }}>Privacy Policy</Text>
        <Text style={{ fontSize: 16, color: 'black', marginTop: 10 }}>{apiData}</Text>
      </View>
    </View>
    </ScrollView>
  )
}

export default Privacyscreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: 40,
    margin: 10
  },
})
