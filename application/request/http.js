/**
 * @ Author: ZhengHui
 * @ Create Time: 2020-01-07 15:08:29
 * @ Modified by: zhenghui
 * @ Modified time: 2020-04-09 16:59:19
 * @ Description:Axios 配置  用于替代Fetch，请求数据。
 */

import axios from 'axios';
import { baseUrl } from './env';
import AsyncStorage from "@react-native-community/async-storage"

axios.defaults.withCredentials = true; //让ajax携带cookie

// 新创建一个axios实例，并进行基础配置
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 2000,
  // headers: {'X-Requested-With': 'XMLHttpRequest'}
});

// 添加请求拦截器
instance.interceptors.request.use(async(config)=>{
  let token = await AsyncStorage.getItem('logintoken')
  console.log(token, 'tokentokentoken')
  config.headers.token = token;  //将token设置成请求头
  // 再次设置tkoen或者添加loading等请求前的操作
  // 添加一个loading
  console.log(config, '请求拦截器')
  return config;
})

// 添加响应拦截器
instance.interceptors.response.use(
  (response)=>{
    //响应数据后做点什么
    // 添加一个loadinga
    alert(1)
    console.log(response, '响应拦截器')
    return response;
  },
  (error)=>{
    // 对响应错误做点什么
    return Promise.reject(error);
  }
)


/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
let get = function(url, params) {
  return new Promise((resolve, reject) => {
    {
      params: params
    }
    instance
      .get(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
let post = function(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then(res => {
        console.log(res);
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export default { get, post };

