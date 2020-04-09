/**
 * @Author: ZhengHui
 * @Date: 2019-07-26
 * @Version: 1.0
 * @Last Modified by: ZhengHui
 * @Description: webview容器
 **/

import WebView from 'react-native-webview';
import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons"
class WebViewComponent extends Component {
  componentWillMount() {
    const {params} = this.props.route;

    console.log(this.state, this.props, '===================3')
    this.props.navigation.setOptions({
      title: params.title,
      headerLeft: () => (
        <Button onPress={() => this._goBackPage()} title="返回" color="#fff" />
      ),
      headerRight: () => (
        <Button
          onPress={() => this.refs.webView.reload()}
          title="刷新"
          color="#fff"
        />
      ),
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      backButtonEnabled: false,
      title: '加载中...',
    };
  }
  onNavigationStateChange = (navState) => {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      title: navState.title || this.props.title,
    });
  };

  //自定义返回事件
  _goBackPage = () => {
    //为true则表示该webView有回退事件
    if (this.state.backButtonEnabled) {
      this.refs.webView.goBack();
    } else {
      //否则返回到上一个页面
      this.props.navigation.goBack();
    }
  };
  render() {
    const {params} = this.props.route;
   
    const {progress} = this.state;
    const {navigation} = this.props
    return (
      <View style={{flex: 1}}>
        {this.state.progress !== 100 ? (
          <View
            style={{
              height: 4,
              width: progress + '%',
              backgroundColor: '#2b6ff6',
            }}
          />
        ) : null}

        <WebView
          ref="webView"
          onNavigationStateChange={this.onNavigationStateChange}
          source={{uri: params.uri}}
          //设置进度 progress值为0～100%
          onLoadProgress={({nativeEvent}) =>
            this.setState({progress: nativeEvent.progress * 100})
          }
          renderError={(err) => {
            return (
              <View>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 20,
                  }}>
                  <Text>美哦与和独具</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

export default WebViewComponent;
