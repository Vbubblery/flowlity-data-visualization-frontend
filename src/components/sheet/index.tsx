import React, { useState, useEffect } from "react";
import { Table, Spin, Select, Icon } from "antd";
import { productsView } from "../../graphql/query";
import { client } from "../..";
import {
  updateProductDataParse,
  deleteDataFromProductParse
} from "../../graphql/mutation";
const { Option } = Select;

const Sheet = ({ location }: any) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchMyAPI = async () => {
      const res = await client.query({
        query: productsView,
        variables: {
          names: [new URLSearchParams(location.search).get("name")]
        },
        fetchPolicy: "network-only"
      });
      console.log(res);
      setDataSource(
        res.data.ProductsView.map((item: any, index: number) => {
          return {
            key: index,
            ...item
          };
        })
      );
    };
    fetchMyAPI();
    // if []. means only execute once time, for this case, if the location.search changed, and it will run again.
  }, [location.search]);

  // let dataSource = data.ProductsView.map((item:any,index:number)=>{
  //   return {
  //     key:index,
  //     ...item
  //   }
  // })
  const selectOptions = [0, 1, 2, 3, 4, 5];
  const columns: any = [
    {
      title: "Product Name",
      dataIndex: "productName"
      // render: (text:string) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a: any, b: any) => +a.date - +b.date,
      defaultSortOrder: "descend",
      sortDirections: ["descend", "ascend"],
      render: (text: string) => new Date(+text).toLocaleString()
    },
    {
      title: "Inventory Level",
      key: "inventoryLevel",
      dataIndex: "inventoryLevel",
      sorter: (a: any, b: any) => +a.inventoryLevel - +b.inventoryLevel,
      sortDirections: ["descend", "ascend"],
      render: (text: string, record: any) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={async (value: string) => {
            console.log(record);
            await client.mutate({
              mutation: updateProductDataParse,
              variables: {
                productName: record.productName,
                date: +record.date,
                inventoryLevel: +value
              }
            });
          }}
        >
          {selectOptions.map((i: number) => (
            <Option key={i}>{i}</Option>
          ))}
        </Select>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <span>
          {/* <a>Delete {record.productName}</a> */}
          <Icon
            onClick={async e => {
              const res = await client.mutate({
                mutation: deleteDataFromProductParse,
                variables: {
                  productName: record.productName,
                  date: +record.date
                }
              });
              if (
                res &&
                res.data &&
                res.data.deleteDataFromProductParse &&
                res.data.deleteDataFromProductParse.status === "Successful"
              )
                setDataSource(
                  dataSource.filter((i: any) => i.date !== record.date)
                );
            }}
            type="delete"
          />
        </span>
      )
    }
  ];

  return (
    <React.Fragment>
      <div
        style={{
          padding: 24,
          background: "#fff",
          boxShadow: "0 6px 10px 0 rgba(0,0,0,.3)",
          minHeight: 500
        }}
      >
        {dataSource.length > 0 ? (
          <Table columns={columns} dataSource={dataSource} />
        ) : (
          <Spin size="large" />
        )}
      </div>
    </React.Fragment>
  );
};

export default Sheet;
