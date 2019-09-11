import React, { useState } from "react";
import { Row, Col, DatePicker, Select } from "antd";
import moment from "moment";
import { allProductsName } from "../../graphql/query";
import { client } from "../..";
const { RangePicker } = DatePicker;
const { Option } = Select;

const DashboardHeader = ({ setChartFilter, setNames }: any) => {
  const [data, setData] = useState<any>([]);
  const children =
    data.products &&
    data.products.map((i: any) => {
      return <Option key={i.productName}>{i.productName}</Option>;
    });

  const handleSelectChange = (value: string[]) => {
    setNames(value);
  };
  const handleTimeChange = (dates: any, dateStrings: any) => {
    const dateStart = +moment(dateStrings[0] || -1);
    const dateEnd = +moment(dateStrings[1] || -1);
    setChartFilter({
      dateStart,
      dateEnd: dateEnd === -1 ? dateEnd : dateEnd + 86400000
    });
  };
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
              onChange={handleSelectChange}
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
              onChange={handleTimeChange}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DashboardHeader;
