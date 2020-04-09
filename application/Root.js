import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import getActiveRouteName from './component/getActiveRouteName';
import getScreenOptions from './component/getScreenOptions';
import {navigationRef} from './component/NavigationService';

// 主页面
import MyScreen from './pages/my/index';
import HomeScreen from './pages/home/index';
import LinkScreen from './pages/links/index';
//路由
import NewsScreen from './pages/home/NewPage';
import WebViewScreen from './component/WebView';
import HotScreen from "./pages/hot/index";
import LoginScreen from "./pages/my/Login";
// 初始化组件
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabScreen = () => (
  <BottomTab.Navigator
    initialRouteName={"MyScreen"} //默认进来显示的路由
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'HomeScreen') {
          iconName = focused ? 'home' : 'home';
          return (
            <Icon
              size={size}
              color={color}
              name={iconName}
              backgroundColor="#3b5998"
            />
          );
        } else if (route.name === 'MyScreen') {
          iconName = focused ? 'user' : 'user';
          return (
            <Icon
              size={size}
              color={color}
              name={iconName}
              backgroundColor="#3b5998"
            />
          );
        } else if (route.name === 'LinkScreen') {
          iconName = focused ? 'globe' : 'globe';
          return (
            <Icon
              size={size}
              color={color}
              name={iconName}
              backgroundColor="#3b5998"
            />
          );
        } else if (route.name === 'HotScreen') {
          iconName = focused ? 'fire' : 'fire';
          return (
            <Icon
              size={size}
              color={color}
              name={iconName}
              backgroundColor="#3b5998"
            />
          );
        }
        return null;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{tabBarLabel: '首页'}}
    />
     <Stack.Screen
      name="HotScreen"
      component={HotScreen}
      options={{tabBarLabel: 'Hot'}}
    />
    <Stack.Screen
      name="LinkScreen"
      component={LinkScreen}
      options={{tabBarLabel: 'Links'}}
    />
    <Stack.Screen
      name="MyScreen"
      component={MyScreen}
      options={{tabBarLabel: '我的'}}
    />
  </BottomTab.Navigator>
);
const App = () => {
  const routeNameRef = React.useRef();
  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={(state) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);
          if (previousRouteName !== currentRouteName) {
            console.log('[onStateChange]', currentRouteName);
            if (currentRouteName === 'HomeScreen') {
              StatusBar.setBarStyle('dark-content'); // 修改 StatusBar
            } else {
              StatusBar.setBarStyle('dark-content'); // 修改 StatusBar
            }
          }
          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName;
        }}>
        <Stack.Navigator
          
          // 页面共享的配置
          screenOptions={getScreenOptions()}>
          <Stack.Screen
            name="BottomTabScreen"
            component={BottomTabScreen}
            options={{headerShown: false, title: 'ZINETE.COM', headerRight: () => (
              <TouchableOpacity onPress={() => alert(1)} style={{marginRight: 20}}>
                <Icon name="qrcode" color="#fff" size={25}/>
              </TouchableOpacity>
            ),}}
          />
          <Stack.Screen name="NewsScreen" component={NewsScreen} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
            headerShown: false
          }}/> 
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
