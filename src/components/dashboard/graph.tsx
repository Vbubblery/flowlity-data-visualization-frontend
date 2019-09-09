import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import { useQuery } from "react-apollo-hooks";
import { productsFilter } from "../../graphql/query";
import { Spin } from "antd";

const Graph = ({ chartFilter, names }: any) => {
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(productsFilter, {
    variables: {
      names,
      ...chartFilter
    }
  });
  if (loading) return <Spin size="large" />;

  const cols = {
    // date: {
    //   range: [0, 1]
    // }
  };
  return (
    <React.Fragment>
      <div
        style={{
          padding: 24,
          marginTop: 10,
          minHeight: document.documentElement.clientHeight - 80 - 80 - 80 - 20,
          background: "#fff",
          boxShadow: "0 6px 10px 0 rgba(0,0,0,.3)"
        }}
      >
        <Chart
          height={document.documentElement.clientHeight - 80 - 80 - 80 - 20}
          data={data.ProductsFilter}
          scale={cols}
          forceFit
        >
          <Legend />
          <Axis name="date" />
          <Axis
            name="inventoryLevel"
            label={{
              formatter: val => ` Level: ${val}`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="date*inventoryLevel"
            size={1}
            shape="smooth"
            color={"productName"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    </React.Fragment>
  );
};

export default Graph;
