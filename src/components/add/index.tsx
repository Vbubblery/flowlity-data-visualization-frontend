import React, { useState } from "react";
import {
  Divider,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Modal
} from "antd";
import { client } from "../..";
import { allProductsName } from "../../graphql/query";
import { addDataParse, createProductParse } from "../../graphql/mutation";
import { Redirect } from "react-router";
const { Option } = Select;
const selectOptions = [0, 1, 2, 3, 4, 5];

const errorModal = (msg: string) => {
  Modal.error({
    title: "This is an error message",
    content: msg
  });
};

const successModal = () => {
  Modal.success({
    title: "This is a success message",
    content: "You can add data to the product now."
  });
};

const AddData = ({ names, setNames }: any) => {
  const [data, setData] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<number>(0);
  const [level, setLevel] = useState<number>(-1);
  const [redirect, setRedirect] = useState(false);
  const children =
    data.products &&
    data.products.map((i: any) => {
      return <Option key={i.productName}>{i.productName}</Option>;
    });

  const handleProductSelectChange = (value: string) => {
    setName(value);
  };
  const handleLevelSelectChange = (value: string) => {
    setLevel(+value);
  };
  const onDateChange = (value: any, dateString: string) => {
    setDate(+value);
  };

  const onDataSubmit = async () => {
    if (name && date !== 0 && level !== -1) {
      const res = await client.mutate({
        mutation: addDataParse,
        variables: { productName: name, date: date, inventoryLevel: level }
      });
      if (res.data.addDataParse.status === "Successful") setRedirect(true);
      else {
        errorModal(res.data.addDataParse.errors);
      }
    }
  };

  const onNewProductNameChange = (e: any) => {
    setName(e.target.value);
  };
  const onProductSubmit = async () => {
    if (name) {
      const res = await client.mutate({
        mutation: createProductParse,
        variables: { productName: name }
      });
      if (res.data.createProductParse.status === "Failed") {
        errorModal(res.data.createProductParse.errors);
      }
      if (res.data.createProductParse.status === "Successful") {
        if (names.length > 0) setNames([...names, name]);
        successModal();
      }
    }
  };

  return (
    <React.Fragment>
      {redirect ? (
        <Redirect
          to={{
            pathname: "/sheet",
            search: `?name=${name}`
          }}
        />
      ) : (
        <React.Fragment>
          <div
            style={{
              padding: 24,
              margin: "auto",
              background: "#fff",
              boxShadow: "0 6px 10px 0 rgba(0,0,0,.3)",
              height: 200,
              width: 350,
              textAlign: "center"
            }}
          >
            Add a product
            <Divider />
            <Row style={{ margin: 20 }}>
              <Col span={24}>
                <Input
                  placeholder="Basic usage"
                  allowClear
                  onChange={onNewProductNameChange}
                />
              </Col>
            </Row>
            <Button type="primary" onClick={onProductSubmit}>
              Add
            </Button>
          </div>
          <div
            style={{
              padding: 24,
              margin: "auto",
              background: "#fff",
              boxShadow: "0 6px 10px 0 rgba(0,0,0,.3)",
              height: 300,
              width: 350,
              textAlign: "center",
              marginTop: 24
            }}
          >
            Add a data to product
            <Divider />
            <Row style={{ margin: 20 }}>
              <Col span={24}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Please select a product"
                  onChange={handleProductSelectChange}
                  onDropdownVisibleChange={async open => {
                    if (open) {
                      const { data } = await client.query({
                        query: allProductsName
                      });
                      setData(data);
                    }
                  }}
                >
                  {children}
                </Select>
              </Col>
            </Row>
            <Row style={{ margin: 20 }}>
              <Col span={24}>
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  placeholder="Select Time"
                  onChange={onDateChange}
                />
              </Col>
            </Row>
            <Row style={{ margin: 20 }}>
              <Col span={24}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Please select a level"
                  onChange={handleLevelSelectChange}
                >
                  {selectOptions.map((i: number) => (
                    <Option key={i}>{i}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Button type="primary" onClick={onDataSubmit}>
              Add
            </Button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AddData;
