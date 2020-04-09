/**
 * @ Author: zhenghui
 * @ Create Time: 2020-04-02 13:41:48
 * @ Modified by: zhenghui
 * @ Modified time: 2020-04-07 14:48:43
 * @ Description: Swiper
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

import Swiper from 'react-native-swiper';

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="#ffae00">
        <View style={styles.slide1}>
          <Image
            resizeMode="contain"
            source={{url: 'http://s1.dgtle.com/dgtle_img/carouselItem/2020/04/03/66bfe20200403173519468.png'}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={styles.slide3}>
          <Image
            resizeMode="contain"
            source={{url: 'http://s1.dgtle.com/dgtle_img/carouselItem/2020/04/03/97e1b202004031733269124.png'}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
