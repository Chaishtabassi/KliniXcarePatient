import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';

const Scanscreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          // value={qrCodeData}
          size={250}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Scanscreen
