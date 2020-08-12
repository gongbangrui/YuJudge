import React from "react";
import {Affix, Layout} from "antd";
import SideBar from "./childCmp/SideBar";
import routerConfig from "../../../router/config";
import Breadcrumb from "./childCmp/Breadcrumb";
import {RouteComponentProps} from "react-router-dom";
import CMSHeader from "./childCmp/CMSHeader";


const {Content, Sider} = Layout;

interface CMSLayoutProps {
  children: React.ReactNode;
}


const Header = React.forwardRef(((props, ref) => (
  <CMSHeader {...props} {...ref}/>
)))


const CMSLayout: React.FunctionComponent<CMSLayoutProps & RouteComponentProps> = (props) => {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        width={230}
        theme="dark" style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
        <div className="layout-logo"/>
        <SideBar
          menus={routerConfig.menus}
          theme={"dark"}
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0
          }}>
        </SideBar>
      </Sider>
      <Layout className="site-layout" style={{marginLeft: 230}}>
        {/*TODO:这里会报warning，需要处理*/}
        <Affix offsetTop={0}>
          <Header></Header>
        </Affix>
        <Content className={"site-layout-content"}>
          <Breadcrumb></Breadcrumb>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default CMSLayout;