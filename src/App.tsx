/*
 * File: App.tsx
 * Description: 项目入口
 * Created: 2020-08-05 11:53:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from 'react';
import {HashRouter} from "react-router-dom";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";
import MyRouter from "./router/MyRouter";

function App() {
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <div className="App">
          <MyRouter></MyRouter>
        </div>
      </ConfigProvider>
    </HashRouter>
  );
}

export default App;