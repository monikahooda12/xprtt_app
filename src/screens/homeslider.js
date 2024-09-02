import React, {useEffect, useState} from 'react';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {httpRequest} from '../api/http';

import {API} from '../constants';

function Homeslider() {
  const width = Dimensions.get('window').width;
  const ITEM_WIDTH = width * 0.9; // 80% of screen width
  const ITEM_HEIGHT = ITEM_WIDTH / 2; // Assuming 2:1 aspect ratio
  const [currIndex, setIndex] = useState(0);

  const [banners, setBanners] = useState([]);

  const loadData = async () => {
    try {
      const result = await httpRequest({method: 'GET', url: API.DASHBOARD});
      setBanners(result.data.banners);
      // console.log(result.data.banners);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Carousel
        onScrollEnd={setIndex}
        loop
        pagingEnabled
        width={width}
        height={ITEM_HEIGHT}
        autoPlay={true}
        data={banners}
        scrollAnimationDuration={1000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            //   borderWidth: 1,
            }}>
            <View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={{uri: item.banner}}
                resizeMode="cover"
              />
            </View>
          </View>
        )}
      />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          bottom: 10,
          columnGap: 5,
          alignSelf: 'center',
        }}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currIndex === index ? styles.dotSelected : {}]}
          />
        ))}
      </View>
    </View>
  );
}

export default Homeslider;
const styles = StyleSheet.create({
  dot: {
    height: 6,
    width: 6,
    borderRadius: 100,
    
    backgroundColor: '#FFFFFF'
    // '#9999',
  },
  dotSelected: {
    backgroundColor: '#000000',
    
  },
});
