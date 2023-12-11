// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const Dashboardbanner = () => {
//   return (
//     <View style={{backgroundColor:'#4a87d7',height:150}}>
//         <View style={{alignItems:'center',top:8,flexDirection:'row',justifyContent:'center'}}>
//         <Icon name='local-offer' color='white' size={22}/>
//         <Text style={{color:'white',fontSize:15,fontWeight:'500'}}>Best Offer For You</Text>
//         </View>
      
//     </View>
//   )
// }

// export default Dashboardbanner

// const styles = StyleSheet.create({})



import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';

const Dashboardbanner = () => {
  const carouselData = [
    { id: '1', image: require('../Assets/dashboardbanner/crousal1.jpg'), title: 'Slide 1' },
    { id: '2', image: require('../Assets/dashboardbanner/crousal2.jpg'), title: 'Slide 2' },
    { id: '3', image: require('../Assets/dashboardbanner/crousal3.jpg'), title: 'Slide 3' },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      {/* Customize the content of each carousel item */}
      {/* For example, you can use Image component here */}
      <Image source={item.image} style={styles.carouselImage} />
    </View>
  );

  return (
    <View style={styles.container}>
          <View style={{ backgroundColor: '#4a87d7', height: 30, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <Icon name="local-offer" color="white" size={22} />
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}> Best Offer For You</Text>
        </View>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          data={carouselData}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
        />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  carouselContainer: {
    height: 150,
    backgroundColor:'#4a87d7'
  },
  carouselItem: {
    width: Dimensions.get('window').width,
    height: 150,
    alignItems:'center'
    // Customize styling for each carousel item
  },
  carouselImage: {
    width: '90%',
    height: '90%',
    borderRadius:20,
    resizeMode: 'cover',
  },
});

export default Dashboardbanner;
