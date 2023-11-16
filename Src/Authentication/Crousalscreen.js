import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Slides from '../Data/Slides';
import Crousalitem from './Crousalitem';

const Crousalscreen = ({ navigation }) => {
    const [currentindex, setcurrentindex] = useState(0);
    const scrollx = useRef(new Animated.Value(0)).current;
    const slideref = useRef(null);

    const vieableitemchange = useRef(({ viewableItems }) => {
    setcurrentindex(viewableItems[0].index);
    }).current;

  const viewconfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollto = () => {
    if (slideref.current && currentindex < Slides.length - 1) {
      slideref.current.scrollToIndex({ index: currentindex + 1 });
    } else {
        navigation.navigate('SignInScreen');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={Slides}
          renderItem={({ item }) =>  <Crousalitem item={item} scrollto={scrollto} currentIndex={currentindex} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollx } },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={vieableitemchange}
          viewabilityConfig={viewconfig}
          ref={slideref}
        />
      </View>
    </View>
  );
};

export default Crousalscreen;
