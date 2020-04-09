/**
 * @ Author: zhenghui
 * @ Create Time: 2020-04-01 10:55:08
 * @ Modified by: zhenghui
 * @ Modified time: 2020-04-09 13:19:36
 * @ Description:
 */

import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import NewsIndexPage from "./NewPage"

class HomeIndexPage extends React.PureComponent {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NewsIndexPage />
      </SafeAreaView>
    );
  }
}

export default HomeIndexPage;
