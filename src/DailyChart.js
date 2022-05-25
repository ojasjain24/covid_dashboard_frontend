import React, { useState, useEffect } from "react";
import axios from "axios";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { Switch } from "@mui/material";

export default function DailyChart() {
  const [MonthlyData, setMonthlyData] = useState([]);
  const [monthly, setMonthly] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8000/periodwise/monthly").then((response) => {
      const month = response.data;
      setMonthlyData(month);
    });
  }, []);

  const [WeeklyData, setWeeklyData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/periodwise/weekly").then((response) => {
      const month = response.data;
      setWeeklyData(month);
    });
  }, []);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  let Confirmed = [];
  let date = [];
  let Deceased = [];
  let Recovered = [];

  if (monthly) {
    Confirmed = MonthlyData.map((e) => e["dailyconfirmed"]);
    date = MonthlyData.map((e) => e["date"]);
    Deceased = MonthlyData.map((e) => e["dailydeceased"]);
    Recovered = MonthlyData.map((e) => e["dailyrecovered"]);
  } else {
    Confirmed = WeeklyData.map((e) => e["dailyconfirmed"]);
    date = WeeklyData.map((e) => e["date"]);
    Deceased = WeeklyData.map((e) => e["dailydeceased"]);
    Recovered = WeeklyData.map((e) => e["dailyrecovered"]);
  }

  var MyChart = echarts.init(document.getElementById("root"));
  var option = {
    title: {
      text: monthly ? "Monthly" : "Weekly",
    },
    tooltip: {},
    legend: {
      data: ["confirmed", "Deceased", "Recovered"],
    },
    xAxis: {
      data: date,
    },
    yAxis: {},
    series: [
      {
        name: "confirmed",
        type: "line",
        data: Confirmed,
      },
      {
        name: "Deceased",
        type: "line",
        stack: "Total",
        data: Deceased,
      },
      {
        name: "Recovered",
        type: "line",
        stack: "Total",
        data: Recovered,
      },
    ],
  };
  MyChart.setOption(option);

  return (
    <div className="Chart">
      <Switch
        {...label}
        checked={monthly}
        onChange={(ev, val) => {
          setMonthly(val);
        }}
      />
      <ReactEcharts
        style={{
          height: "500px",
          width: "90%",
          margin: "auto",
          marginTop: "50px",
        }}
        option={option}
      />
    </div>
  );
}
