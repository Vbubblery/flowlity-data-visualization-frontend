import React, { useState } from "react";
import "./App.css";

import { Layout, Menu, Icon } from "antd";
import { Switch, Route } from "react-router";
import Dashboard from "./dashboard";
import Sheet from "./sheet";

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={collapsed => {
          setCollapsed(collapsed);
        }}
      >
        <div className="logo">
          <span className="logoName">Flowlity</span>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["dashboard"]} mode="inline">
          <Menu.Item key="dashboard">
            <Icon type="line-chart" />
            <span>DashBoard</span>
          </Menu.Item>
          <SubMenu
            key="subSheet"
            title={
              <span>
                <Icon type="form" />
                <span>Products</span>
              </span>
            }
          >
            <Menu.Item onClick={() => console.log(123)} key="2">
              Tom
            </Menu.Item>
            <Menu.Item key="3">Bill</Menu.Item>
            <Menu.Item key="AddProduct">Add +</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
        <Content style={{ margin: "16px 16px" }}>
          <Switch>
            <Route exact path="/" render={props => <Dashboard />} />
            <Route exact path="/sheet" render={props => <Sheet />} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Flowlity Design ©2018 Created by Juncheng ZHOU
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
