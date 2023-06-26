import React, { useEffect, useState } from "react";
import './UserCharts.scss'
import PercisionController from "./PercisionController";
import LineCharts from "./LineCharts";
import PeriodSelector from "./PeriodSelector";
const UserCharts = ({ lcwidth }) => {
  return (
    <div className="user-charts">
      <h5 className="text-center mb-3 mt-2">Activity charts for </h5>
      <PeriodSelector />
      <LineCharts lcwidth={lcwidth} />
      <PercisionController />
    </div>
  );
};

export default UserCharts;
