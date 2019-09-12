import React, { useState, useEffect } from "react";
import { Table, Spin, Select, Icon } from "antd";
import { productsView } from "../../graphql/query";
import { client } from "../..";
import {
  updateProductDataParse,
  deleteDataFromProductParse
} from "../../graphql/mutation";
import SheetFilter from "./filter";
import { levelOptions } from "../../interfaces/utils";
const { Option } = Select;

const Sheet = ({ location }: any) => {
  const [dataSource, setDataSource] = useState([]);
  const [editKey, setEditKey] = useState("");
  const [dateFilter, setDateFilter] = useState<any>({
    dateStart: -1,
    dateEnd: -1
  });
  const [levelFilter, setLevelFilter] = useState(-1);
  useEffect(() => {
    const fetchMyAPI = async () => {
      const res = await client.query({
        query: productsView,
        variables: {
          names: [new URLSearchParams(location.search).get("name")],
          ...dateFilter,
          level: levelFilter
        },
        fetchPolicy: "network-only"
      });
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
  }, [location.search, dateFilter, levelFilter]);

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
      render: (text: string, record: any) => {
        if (record.key !== editKey)
          return <div onClick={() => setEditKey(record.key)}>{text}</div>;
        else
          return (
            <Select
              autoFocus
              onBlur={() => {
                setEditKey("");
              }}
              defaultValue={record.inventoryLevel}
              style={{ width: 120 }}
              onChange={async (value: string) => {
                await client.mutate({
                  mutation: updateProductDataParse,
                  variables: {
                    productName: record.productName,
                    date: +record.date,
                    inventoryLevel: +value
                  }
                });
                // eslint-disable-next-line require-atomic-updates
                record.inventoryLevel = value;
              }}
            >
              {levelOptions.map((i: number) => (
                <Option key={i}>{i}</Option>
              ))}
            </Select>
          );
      }
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
        <SheetFilter
          setDateFilter={setDateFilter}
          setLevelFilter={setLevelFilter}
        />
        {dataSource.length > 0 ? (
          <React.Fragment>
            <Table columns={columns} dataSource={dataSource} />
          </React.Fragment>
        ) : (
          <Spin size="large" />
        )}
      </div>
    </React.Fragment>
  );
};

export default Sheet;
