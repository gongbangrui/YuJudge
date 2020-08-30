/*
 * File: App.tsx
 * Description: 项目入口
 * Created: 2020-08-05 11:53:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from 'react';
import {BrowserRouter} from "react-router-dom";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";
import MyRouter from "./router/MyRouter";
import {Provider} from "react-redux";
import store from "./store"

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <div className="App">
          <Provider store={store}>
            <MyRouter></MyRouter>
          </Provider>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;