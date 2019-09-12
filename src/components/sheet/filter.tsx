import React from "react";
import { Row, Col, DatePicker, Select } from "antd";
import moment from "moment";
import { levelOptions } from "../../interfaces/utils";
const { RangePicker } = DatePicker;
const { Option } = Select;
const SheetFilter = ({ setDateFilter, setLevelFilter }: any) => {
  const handleTimeChange = (dates: any, dateStrings: any) => {
    const dateStart = +moment(dateStrings[0] || -1);
    const dateEnd = +moment(dateStrings[1] || -1);
    setDateFilter({
      dateStart,
      dateEnd: dateEnd === -1 ? dateEnd : dateEnd + 86400000
    });
  };
  const handleLevelSelectChange = (value: string) => {
    setLevelFilter(+value);
  };
  return (
    <React.Fragment>
      <div
        style={{
          padding: 24,
          background: "#fff",
          boxShadow: "0 6px 10px 0 rgba(0,0,0,.3)",
          minHeight: 50,
          marginBottom: 20
        }}
      >
        <Row gutter={8}>
          <Col span={8}>
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
          <Col span={8}>
            <Select
              style={{ width: "100%" }}
              placeholder="Please select a level"
              allowClear
              onChange={handleLevelSelectChange}
            >
              {levelOptions.map((i: number) => (
                <Option key={i}>{i}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>3</Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default SheetFilter;
