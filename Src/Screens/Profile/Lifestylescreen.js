import { StyleSheet, Text, View ,TextInput} from 'react-native'
import React, { useState } from 'react'

const Lifestylescreen = ({navigation}) => {
    
    const [smoking,setsmoking]=useState();
    const [alcohol,setalcohol]=useState();
    const [activity,setactivity]=useState();
    const [food,setfood]=useState();
    const [occupation,setoccupation]=useState();

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <View style={{margin:10}}>
        
    <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'NunitoSans_7pt-Regular',
            // bottom: 10,
          }}>
        Smoking Habits
        </Text>
   <TextInput
            style={styles.input}
            placeholder="Allergies"
            mode="outlined"
            outlineColor="#e4efff"
            onChangeText={setsmoking}
            value={smoking}
            theme={{ colors: { primary: '#478ffd' } }}
          />
          
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'NunitoSans_7pt-Regular',
            // bottom: 10,
          }}>
       Alcohol Consumption
        </Text>
        <TextInput
          placeholder="Current Medications"
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          onChangeText={setalcohol}
          value={alcohol}
          theme={{ colors: { primary: '#478ffd' } }}
        />
        
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'NunitoSans_7pt-Regular',
            // bottom: 10,
          }}>
         Activity Level
        </Text>
        <TextInput
          placeholder="Past Medications"
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          onChangeText={setactivity}
          value={activity}
          theme={{ colors: { primary: '#478ffd' } }}
        />
        
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'NunitoSans_7pt-Regular',
            // bottom: 10,
          }}>
          Food Preference
        </Text>
          <TextInput
          placeholder="Past Medications"
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          onChangeText={setfood}
          value={food}
          theme={{ colors: { primary: '#f5f5f5' } }}
        />
        
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'NunitoSans_7pt-Regular',
            // bottom: 10,
          }}>
          Occupation
        </Text>
          <TextInput
          placeholder="Past Medications"
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          onChangeText={setoccupation}
          value={occupation}
          theme={{ colors: { primary: '#478ffd' } }}
        />
        </View>
</View>
  )
}

export default Lifestylescreen

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginVertical: 8,
        backgroundColor: '#f5f5f5',
        marginVertical: 8,
        height: 50
      },
})