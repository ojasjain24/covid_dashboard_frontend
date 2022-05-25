import React, { useState, useEffect } from "react";
import axios from "axios";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export default function AverageChart() {
  const [AvgData, setAvgData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/average").then((response) => {
      const api = response.data;
      setAvgData(api);
    });
  }, []);

  const dailyConfirmed = AvgData.map((e) => e["moving_average_dailyconfirmed"]);
  const date = AvgData.map((e) => new Date(e["time"]).toLocaleDateString());
  const dailyDeceased = AvgData.map((e) => e["moving_average_dailydeceased"]);
  const dailyRecovered = AvgData.map((e) => e["moving_average_dailyrecovered"]);

  var MyChart = echarts.init(document.getElementById("root"));
  var option = {
    title: {
      text: "Three Day Average",
    },
    tooltip: {},
    legend: {
      data: ["confirmed", "Deceased", "Recovered"],
    },
    xAxis: {
      data: [...date],
    },
    yAxis: {},
    series: [
      {
        name: "confirmed",
        type: "line",
        data: [...dailyConfirmed],
      },
      {
        name: "Deceased",
        type: "line",
        stack: "Total",
        data: dailyDeceased,
      },
      {
        name: "Recovered",
        type: "line",
        stack: "Total",
        data: dailyRecovered,
      },
    ],
  };
  MyChart.setOption(option);

  return (
    <div className="Chart">
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
