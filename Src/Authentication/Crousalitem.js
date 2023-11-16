import { Image, StyleSheet, Text, View,useWindowDimensions,TouchableOpacity,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState }  from 'react'
import Slides from '../Data/Slides';

const Crousalitem = ({item ,scrollto, currentIndex}) => {

    const [currentindex, setcurrentindex] = useState(0);
    const{width}=useWindowDimensions();

    const renderDots = () => {
        return Slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentIndex ? '#49b2e9' : 'gray',
              },
            ]}
          />
        ));
      };

  return (
    <View style={[styles.container,{width}]}>
         <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={[ styles.image],{width, resizeMode:'contain'}}/>
      <View style={styles.dotsContainer}>{renderDots()}</View>
      <View style={{flex:0.5,marginTop:15}}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={scrollto}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Crousalitem

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    image:{
        flex:0.7,
        justifyContent:'center'
    },
    title:{
        fontSize:28,
        marginBottom:10,
        color:'#49b2e9',
        textAlign:'center',
        fontFamily:'Domine-Bold'
    },
    description:{
        color:'black',
        textAlign:'center',
        paddingHorizontal:64,
        fontFamily:'NunitoSans_7pt-light'
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      dot: {
        width: 18,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      button: {
        backgroundColor: '#49b2e9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        width:Dimensions.get('window').width * 0.8, 
        height:50,
      },
      buttonText: {
        color: 'white',
        fontFamily:'NunitoSans_7pt-Bold',
        textAlign:'center',
        fontSize:16
      },
})