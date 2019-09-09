import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Row, Col, DatePicker, Select, Spin } from "antd";
import moment from "moment";
import { allProductsName } from "../../graphql/query";
const { RangePicker } = DatePicker;
const { Option } = Select;

const DashboardHeader = ({ setChartFilter, setNames }: any) => {
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(allProductsName);
  if (loading) return <Spin size="large" />;
  const children = data.products.map((i: any) => {
    return <Option key={i.productName}>{i.productName}</Option>;
  });

  const handleSelectChange = (value: string[]) => {
    setNames(value);
    console.log(`Selected: ${value}`);
  };
  const handleTimeChange = (dates: any, dateStrings: any) => {
    console.log("From: ", +dates[0], ", to: ", +dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    const dateStart = +moment(dateStrings[0] || -1);
    const dateEnd = +moment(dateStrings[1] || -1);
    setChartFilter({
      dateStart,
      dateEnd: dateEnd === -1 ? dateEnd : dateEnd + 86400000
    });
  };
  // const disabledDate = (current:any) => {
  //   return current && current > moment().endOf('day');
  // }
  return (
    <React.Fragment>
      <div
        style={{
          padding: 24,
          background: "#fff",
          boxShadow: "0 6px 10px 0 rgba(0,0,0,.3)",
          minHeight: 50
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col span={4}>
            <Select
              size="default"
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select products"
              // defaultValue={["productA"]}
              onChange={handleSelectChange}
            >
              {children}
            </Select>
          </Col>
          <Col span={12}>
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                "This Week": [moment().startOf("week"), moment().endOf("week")],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month")
                ]
              }}
              // disabledDate={disabledDate}
              onChange={handleTimeChange}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DashboardHeader;
