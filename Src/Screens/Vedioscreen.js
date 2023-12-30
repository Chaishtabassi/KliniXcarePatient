import { View, Text } from 'react-native'
import React from 'react'
import AgoraUIKit from 'agora-rn-uikit';

const Vedioscreen = () => {
    const appId = '2d980e896e904bb09fbb85a4760cb957';
    const channelName = 'test';
  
    return (
      <View style={styles.container}>
        <AgoraUIKit style={styles.agoraContainer} rtcProps={{ appId, channelName }} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    agoraContainer: {
      flex: 1,
      width: '100%',
    },
  })


export default Vedioscreen