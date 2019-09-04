import React from "react";
import "./App.css";

import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import { Spin, Alert } from "antd";

const App: React.FC = () => {
  const query = gql`
    query {
      products(sortBy: inventoryLevel, method: ASC) {
        productId
        productName
        date
        inventoryLevel
      }
    }
  `;
  const { data, error, loading } = useQuery(query);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <Spin tip="Loading...">
      <Alert
        message={data.products[0].productName}
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  );
};

export default App;
