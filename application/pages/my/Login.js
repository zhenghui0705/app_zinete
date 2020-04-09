/**
 * @ Author: zhenghui
 * @ Create Time: 2020-04-09 13:59:58
 * @ Modified by: zhenghui
 * @ Modified time: 2020-04-09 16:42:20
 * @ Description: 登录注册
 */

import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Input } from 'beeshell/dist/components/Input';
import { Button } from 'beeshell/dist/components/Button';
import Axios from "../../request/http";
import AsyncStorage from "@react-native-community/async-storage"
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      userpwd: null
    }
  }

  async _loginAction(username, userpwd) {
    let data = await Axios.get('/user/login', {
      username,
      userpwd
    })

    console.log(this)
    if(data.code === -1) {
      alert(data.msg)
    } else if (data.code === 200) {
      try {
        this.props.route.params.onCallBack(data.verifyToken.uid)
        this.props.navigation.goBack()
        await AsyncStorage.setItem('logintoken', data.token)
      } catch (error) {
        console.warn(error, '登录接口有误')
      }
    }
    
    console.log(data, '登录回调')
  }
  render() {
    const { navigation } = this.props
    const { username, userpwd } = this.state
    console.log(`用户名${username}`, `密码${userpwd}`)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text onPress={() => navigation.goBack()}>返回</Text>
          <View style={styles.login_box}>
            <Input
              style={styles.login_input_sty}
              multiline
              textAlign="left"
              value={username}
              placeholder='请输入用户名'
              onChange={(value) => {
                this.setState({
                  username: value
                })
              }}
            />
            <Input
              style={[styles.login_input_sty, {
                marginTop: 10
              }]}
              multiline
              textAlign='left'
              value={userpwd}
              placeholder='请输入密码'
              onChange={(value) => {
                this.setState({
                  userpwd: value
                })
              }}
            />
          </View>
          <View style={{marginHorizontal: 80}}>
            <Button type='info' size="md" onPress={() => this._loginAction(username, userpwd)}>
              登录
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  login_box: {
    margin: 20,
    paddingVertical: 20
  },
  login_input_sty: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    // backgroundColor: "#000",
    borderWidth:1,
    borderColor: "#e7e7e7",
    borderRadius: 30
  }
})

export default LoginPage