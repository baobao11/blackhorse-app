import * as echarts from "echarts";
import { useEffect, useRef } from "react";
const BarChart = ({ title }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    var chartDom = chartRef.current;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);
  return (
    <div
      id="main"
      ref={chartRef}
      style={{ width: "600px", height: "400px" }}
    ></div>
  );
};

export default BarChart;
