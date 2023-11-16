import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Rootnavigator from './Src/Navigation/Rootnavigator'
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-toast-message';

// const firebaseConfig = {

//   apiKey: "AIzaSyA5xXkeRYVy08bT9bvDkyrB9OPEQYbO7OE",
//   authDomain: "klinixkare-2d93c.firebaseapp.com",
//   // databaseURL: "https://phoneauth-2d93c.firebaseio.com",
//   projectId: "klinixkare-2d93c",
//   storageBucket: "klinixkare-2d93c.appspot.com",
//   messagingSenderId: "657714363965",
//   appId: "1:657714363965:android:3e6069e40bfa6e2d993454",
// };


export class App extends Component {
  // componentDidMount() {
  //   firebase.initializeApp(firebaseConfig);
  // }
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