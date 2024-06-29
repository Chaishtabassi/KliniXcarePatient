import { StyleSheet, Text, View ,FlatList,TouchableOpacity,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/EvilIcons';
import Backbutton from '../Component/Backbutton';

const Diseasescreen = ({navigation}) => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const fetchDat = async () => {
          try {
            const access_token = await AsyncStorage.getItem('get_token');
            const bearerToken = access_token;
    
            const formData = new FormData();
            formData.append('start', 1);
            formData.append('count', 100);
    
    
            const response = await fetch(
              'https://espinarealty.com/doctor/api/fetchDisease',
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
              setApiData(data.data);
            } else {
              console.error('Error fetching data. Status:', response.status);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDat();
      }, []);
  
    const doctorslist = item => {
      console.log('heloo', item);
      navigation.navigate('doctors', { title:item.category.title, id:item.category.id });
    };
  
    const renderItem = ({item}) => (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => doctorslist(item)}>
          <View style={styles.imageContainer}>
            <Image source={{uri: item.image_url}} style={styles.image} />
          </View>
          <Text style={styles.text}>{item.disease}</Text>
        </TouchableOpacity>
      </View>
    );
  
    const numColumns = 2;

    const handleBackButtonPress = () => {
      navigation.goBack();
    };

  return (
    <View style={{flex: 1, backgroundColor: 'white' }}>
<View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4989d9',
          height: '7%',
        }}>
       <Backbutton/>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>DISEASES</Text>
        </View>
      </View>
<View style={{width: '100%'}}>
      <FlatList
        data={apiData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        // horizontal={true}
        // showsHorizontalScrollIndicator={false}
      />
    </View>
</View>
  )
}

export default Diseasescreen

const styles = StyleSheet.create({
    imageContainer: {
        marginBottom: 5,
        alignItems: 'center',
      },
      image: {
        width: 50,
        height: 50,
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
        color:'#4a87d7',
        fontSize: 15,
        fontFamily: 'Domine-Bold',
      },
    bottomText: {
        margin: 10,
        fontSize:18,
        color:'white',
        fontFamily:'Domine-Bold'
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
})