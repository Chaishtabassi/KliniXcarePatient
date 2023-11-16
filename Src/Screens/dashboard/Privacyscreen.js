import { StyleSheet, Text, View,ScrollView } from 'react-native'
import Backbutton from '../../Component/Backbutton'
import { useEffect, useState } from 'react'

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

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
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
