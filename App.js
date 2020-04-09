/**
 * @author zhenghui
 * @Email zhenghui@zinete.com
 * @Modified time: 2020-03-31 14:50:29
 * @Description: root
 **/
import React from 'react';
import Root from './application/Root';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from "react-native-splash-screen"

class App extends React.Component {
  componentWillMount() {
    SplashScreen.hide()
  }

  render() {
    return <Root />;
  }
}

// 屏蔽黄屏警告
console.disableYellowBox = true;
export default App;
