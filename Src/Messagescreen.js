import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React,{useEffect,useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import Backbutton from './Component/Backbutton';

const Messagesscreen = ({navigation}) => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = messageArray => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messageArray),
    );
  };
  
  const chat = () => {
   navigation.navigate('vedio')
  };

  const call = () => {
    // Add your call logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton/>
        <Text style={styles.title}>Emiley James</Text>
      </View>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={props => {
        return (
          <Bubble 
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#49b2e9'
              },
            }}
          />
        );
      }}
      
    />
    </View>
  );
};

export default Messagesscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // To place the icons on the right
    height: 40,
    margin: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
