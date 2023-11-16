import { StyleSheet, Text, View ,Image,Dimensions,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import Backbutton from '../../Component/Backbutton'
import { TextInput} from 'react-native-paper';
import PhoneInput from "react-native-phone-number-input";
import CountryPicker from 'react-native-country-picker-modal';

const Personalinfoscreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');


    const handlePhoneNumberChange = (newPhoneNumber) => {
      console.log("New phone number:", newPhoneNumber);
      setPhoneNumber(newPhoneNumber);
    };

    const [visible, setVisible] = useState(false);
    const [country, setCountry] = useState({
      cca2: 'IN',
    callingCode: '91'});
    const [username, setUsername] = useState('');
    const [verificationId, setVerificationId] = useState('');
    
    useEffect(() => {
      func();
    }, [])

    const openCountryPicker = () => {
        setVisible(true);
      }
      
    
    const func = async () => {
      const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      if(storedPhoneNumber != null || storedPhoneNumber != undefined){
        // navigation.navigate('Rootclienttab');
      }
    }
    
    const onSelectCountry = (country) => {
      setCountry(country);
      const callingCode = country?.callingCode ? `+${country.callingCode[0]}` : '';
      setVisible(false);
    };

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [city, setcity] = useState('');

    const handlename = (newText) => {
        setname(newText);
    };

    const handleemail = (newText) => {
        setemail(newText);
    };

    const handlecity=()=>{
        setcity(newText);
    }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Backbutton/>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={require('../../Assets/photo.png')} style={styles.profileImage} />
      </View>
 
      <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'center',top:10,margin:10}}>
      <TextInput
        label="First Name"
        style={styles.input1}
        mode="outlined"
        outlineColor="#e4efff"
        onChangeText={handlename}
        value={name}
        theme={{ colors: { primary: '#478ffd' } }}
        />
        <TextInput
        style={styles.input}
        label="Enter Email Id"
        mode="outlined"
        outlineColor="#e4efff"
        onChangeText={handleemail}
        value={email}
        theme={{ colors: { primary: '#478ffd' } }}
        />
          <TextInput
        style={styles.input}
        label="Enter City"
        mode="outlined"
        outlineColor="#e4efff"
        onChangeText={handlecity}
        value={city}
        theme={{ colors: { primary: '#478ffd' } }}
        />

<View>
       <View
      style={{
        // marginLeft: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        paddingHorizontal: 15,
        paddingTop: 25,
      }}
    >
      <Text style={{ fontSize:14,fontWeight:'500'}}>
      {`+${country.callingCode}`}
      </Text>
    </View>
    <TextInput
      value={username}
      onChangeText={setUsername}
      label={<Text style={{ fontFamily: 'NunitoSans_7pt-Light'}}>Enter Phone Number</Text>}
      mode="outlined"
      keyboardType='number-pad'
      fontSize={16}
      maxLength={10}
      outlineColor="#e4efff"
      style={{
        height: 60,
        backgroundColor: '#e4efff',
        zIndex: 0,
        paddingLeft: 35, 
        width:Dimensions.get('window').width * 0.9,
      }}
      theme={{ colors: { primary: '#478ffd' } }}
      dense={true}
      left={
        <TextInput.Icon
          style={{ borderRightWidth: 1, borderRadius: 0, alignSelf: 'center'}}
          icon="chevron-down"
          onPress={openCountryPicker}
        />
      }
    />
        <CountryPicker
          visible={visible}
          onClose={() => setVisible(false)}
          onSelect={onSelectCountry}
          withFilter
          // withFlag
          withCallingCode
          withCountryNameButton
          placeholder=""
        />
      </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity> 
       </View>    
    </View>
  )
}

export default Personalinfoscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
      },
      title: {
        flex: 1,
        fontSize: 15,
        color: 'black',
        fontFamily:'Domine-Bold',
        textAlign: 'center',
        alignSelf: 'center',
      },
      profileContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 35,
        margin: 10,
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
      profileInfo: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: '#49b2e9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        width: Dimensions.get('window').width * 0.9,
        height: 50,
      },
      buttonText: {
        color: 'white',
        fontFamily:'NunitoSans_7pt-Bold',
        textAlign: 'center',
        fontSize: 16,
      },
      input: {
        width: '90%',
        marginBottom: 15,
        backgroundColor: '#e4efff',
        borderRadius: 8,
      },
      input1: {
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: '#e4efff',
          zIndex: 0,
        width: '90%',
        },
})