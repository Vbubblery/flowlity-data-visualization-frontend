import React, { useState } from "react";
import Graph from "./graph";
import DashboardHeader from "./dashboardHeader";
const Dashboard = ({ client }: any) => {
  const [chartFilter, setChartFilter] = useState({
    dateStart: -1,
    dateEnd: -1
  });
  const [names, setNames] = useState([]);
  return (
    <React.Fragment>
      <DashboardHeader
        setChartFilter={setChartFilter}
        setNames={setNames}
        client={client}
      />
      <Graph chartFilter={chartFilter} names={names} />
    </React.Fragment>
  );
};

export default Dashboard;
