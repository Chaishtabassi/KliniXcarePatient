import { Image, StyleSheet, Text, View, TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'

const Confirmrest = ({navigation}) => {

    const Confirm = ()=>{
        navigation.navigate('bottom');
    }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../Assets/Logo.png')} style={styles.image} />
        <Text style={styles.heading}>Congratulations, your registration has been successfully completed</Text>
        {/* <Text style={styles.description}>
          Qui ex aute ipsum duis. Incididunt adipisicing voluptate laborum
        </Text> */}
      </View>
      <TouchableOpacity style={styles.button} onPress={Confirm}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    // alignItems: 'center',
    padding: 20,
    backgroundColor:'white'
  },
  content: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#49b2e9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing:1
  },
})

export default Confirmrest
