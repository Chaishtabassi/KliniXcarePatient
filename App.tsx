import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Rootnavigator from './Src/Navigation/Rootnavigator'
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-toast-message';

const firebaseConfig = {
  apiKey: "AIzaSyCx1cP8bAY06QNb00EQiY4pPsm3ZBlmhY8",
  authDomain: "klinixcarepatient.firebaseapp.com",
  // databaseURL: "https://klinixcarepatient.firebaseio.com",
  projectId: "klinixcarepatient",
  storageBucket: "klinixcarepatient.appspot.com",
  messagingSenderId: "547184458432",
  appId: "1:547184458432:android:b232aff2c2f5561d50cb25",
};


export class App extends Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <View style={{flex:1}}>
      <Rootnavigator/>
      <Toast/>
    </View>
    )
  }
}

export default App