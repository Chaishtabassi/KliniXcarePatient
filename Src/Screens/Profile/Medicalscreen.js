import { StyleSheet, Text, View ,TextInput} from 'react-native'
import React, { useState } from 'react'

const Medicalscreen = ({navigation}) => {

    const [allergies,setallergies]=useState();
    const [currentmedications,setcurrentmedications]=useState();
    const [pastmedications,setpastmedications]=useState();
    const [injuries,setinjuries]=useState();
    const [surgeries,setsurgeries]=useState();

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
              Allergies
            </Text>
       <TextInput
                style={styles.input}
                placeholder="Allergies"
                mode="outlined"
                outlineColor="#e4efff"
                onChangeText={setallergies}
                value={allergies}
                theme={{ colors: { primary: '#478ffd' } }}
              />
              
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'NunitoSans_7pt-Regular',
                // bottom: 10,
              }}>
              Current Medications
            </Text>
            <TextInput
              placeholder="Current Medications"
              style={styles.input}
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setcurrentmedications}
              value={currentmedications}
              theme={{ colors: { primary: '#478ffd' } }}
            />
            
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'NunitoSans_7pt-Regular',
                // bottom: 10,
              }}>
              Past Medications
            </Text>
            <TextInput
              placeholder="Past Medications"
              style={styles.input}
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setpastmedications}
              value={pastmedications}
              theme={{ colors: { primary: '#478ffd' } }}
            />
            
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'NunitoSans_7pt-Regular',
                // bottom: 10,
              }}>
              Injuries
            </Text>
              <TextInput
              placeholder="Past Medications"
              style={styles.input}
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setinjuries}
              value={injuries}
              theme={{ colors: { primary: '#f5f5f5' } }}
            />
            
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'NunitoSans_7pt-Regular',
                // bottom: 10,
              }}>
              Surgeries
            </Text>
              <TextInput
              placeholder="Past Medications"
              style={styles.input}
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setsurgeries}
              value={surgeries}
              theme={{ colors: { primary: '#478ffd' } }}
            />
            </View>
    </View>
  )
}

export default Medicalscreen

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginVertical: 8,
        backgroundColor: '#f5f5f5',
        marginVertical: 8,
        height: 50
      },
})