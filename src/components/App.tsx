import React, { useState } from "react";
import "./App.css";

import { Layout, Menu, Icon } from "antd";
import { Switch, Route } from "react-router";
import Dashboard from "./dashboard";
import Sheet from "./sheet";
import { Link } from "react-router-dom";
import { client } from "..";
import { allProductsName } from "../graphql/query";
import AddData from "./add/data";

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [names, setNames] = useState<any>(["productA"]);
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
          <span className="logoName">F</span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          onOpenChange={async open => {
            if (open.includes("productSheet")) {
              const { data } = await client.query({
                query: allProductsName
              });
              setNames(data.products.map((i: any) => i.productName));
            }
          }}
        >
          <Menu.Item key="dashboard">
            <Link to="/">
              <Icon type="line-chart" />
              <span>DashBoard</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="productSheet"
            title={
              <span>
                <Icon type="form" />
                <span>Products</span>
              </span>
            }
          >
            {names.map((i: string) => (
              <Menu.Item key={i}>
                <Link
                  to={{
                    pathname: "/sheet",
                    search: `?name=${i}`
                  }}
                >
                  {i}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item key="AddAProductByWebSite">
              <Link to="/add/data">Add +</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
        <Content style={{ margin: "16px 16px" }}>
          <Switch>
            <Route exact path="/" render={props => <Dashboard />} />
            <Route
              path="/sheet"
              render={(props: any) => <Sheet {...props} />}
            />
            <Route
              path="/add/data"
              render={(props: any) => <AddData {...props} />}
            />
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
