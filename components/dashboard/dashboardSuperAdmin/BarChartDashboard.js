// ** MUI Imports
import PrimaryCard from "@/components/card/primaryCard";
import CardContent from "@mui/material/CardContent";

// ** Third Party Imports
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

import BarCardHeader from "./BarCardHeader";
import { useState } from "react";

const BarChartDashboard = ({
  barColor1,
  barColor2,
  labelColor,
  borderColor,
  monthlyChartData,
  selectYearValue,
}) => {
  const [monthlyChart, setMonthlyChart] = useState(monthlyChartData);

  const months = monthlyChart?.propertyGroup?.map((data) => data?.month);
  const dataChart = monthlyChart?.propertyGroup?.map((data) => data?.count);
  const highestData = monthlyChart?.greaterValue;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: { color: labelColor },
      },
      y: {
        min: 0,
        max: highestData,
        grid: {
          color: borderColor,
        },
        ticks: {
          stepSize: 40,
          color: labelColor,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        maxBarThickness: 40,
        backgroundColor: [barColor1, barColor2],
        borderColor: "transparent",
        data: dataChart,
      },
    ],
  };

  return (
    <PrimaryCard>
      <BarCardHeader
        selectYearValue={selectYearValue}
        setMonthlyChart={setMonthlyChart}
      />
      <CardContent sx={{ height: 350 }}>
        <Bar data={data} options={options} />
      </CardContent>
    </PrimaryCard>
  );
};

export default BarChartDashboard;
