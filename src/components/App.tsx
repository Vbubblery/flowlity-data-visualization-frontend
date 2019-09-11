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

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [names, setNames] = useState<any>(["productA"]);
  return (
    <React.Fragment>
      <div>123</div>
    </React.Fragment>
  );
};

export default App;
