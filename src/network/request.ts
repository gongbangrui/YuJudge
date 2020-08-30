/*
 * File: request.ts
 * Description: 请求总配置，最终返回一个request对象
 * Created: 2020-7-18 18:00:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import axios from 'axios';
import {TIME_OUT, BASE_URL, LOADING_MIN_TIME, NO_CONNECTION_RESPONSE, AUTHORIZATION_KEY} from "../config/config";
import {removeLoading, showLoading} from "../utils/dom";
import {getTokenFromStorage} from "../utils/dataPersistence";


// 加载loading
const loading = () => {
  if (requestCount === 0) {
    showLoading();
    requestCount++;
  }
}

// 删除loading
const deleteLoading = () => {
  requestCount--;
  if (requestCount <= 0) {
    requestCount = 0;
    setTimeout(() => {
      removeLoading();
    }, LOADING_MIN_TIME);
  }
}

const request = axios.create({
  timeout: TIME_OUT,
  baseURL: BASE_URL
});

let requestCount = 0;


request.interceptors.request.use(config => {
  if (config.headers.loading) {
    loading();
  }
  // 添加权限请求头
  config.headers[AUTHORIZATION_KEY] = getTokenFromStorage();

  return config;
}, err => {
  return Promise.reject(err);
})

request.interceptors.response.use(response => {
  deleteLoading();
  return response.data;
}, err => {
  deleteLoading();
  return Promise.reject(err.response ? err.response.data : NO_CONNECTION_RESPONSE);
})

export default request;
