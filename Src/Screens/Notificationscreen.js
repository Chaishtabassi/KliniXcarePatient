import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';
import Notificationheader from '../Component/Notificationheader';
import Notificationdata from '../Data/Notificationdata';

const Notificationscreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
   <View style={{flexDirection:'column'}}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={{padding:10}}>
        <Text style={{fontFamily:'NunitoSans_7pt-light',fontSize:14}} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={{flexDirection:'row',alignItems:'center',top:10}}>
            <Text style={{fontFamily:'NunitoSans_7pt-light',fontSize:14}} numberOfLines={2}>
              {item.date}
            </Text>
            <Text style={{fontFamily:'NunitoSans_7pt-light',fontSize:14}}> at </Text>
            <Text style={{fontFamily:'NunitoSans_7pt-light',fontSize:14}} numberOfLines={2}>
              {item.time}
            </Text>
        </View>
        </View>
        </View>   
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
       <View style={{ backgroundColor: '#4a87d7',alignItems:'center' }}>
    <Text style={styles.bottomText}>NOTIFICATIONS</Text>
  </View>
      <FlatList
        data={Notificationdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} 
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    marginRight: 16,
    flexDirection:'row',
  },
  bottomText: {
    margin: 10,
    fontSize:18,
    color:'white',
    fontFamily:'Domine-Bold'
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1, 
  },
  title: {
    fontSize: 18,
     left:15,
     fontFamily:'Domine-Bold'
  },
  separator: {
    height: 1,
    backgroundColor: '#e3e1da',
  },
});

export default Notificationscreen;
