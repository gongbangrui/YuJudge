import React from "react";
import {Layout, Menu} from "antd";
import SideBar from "./SideBar";
import routerConfig from "../../router/config";
import Breadcrumb from "./Breadcrumb";
import MyRouter from "../../router";

const {Header, Content, Sider} = Layout;


const CMSLayout: React.FunctionComponent = () => {
  return (
    <Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <SideBar
            menus={routerConfig.menus}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height: '100%', borderRight: 0}}>
          </SideBar>
        </Sider>

        <Layout style={{padding: '0 24px 24px'}}>
          <Breadcrumb></Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}>
            <MyRouter></MyRouter>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default CMSLayout;