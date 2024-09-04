import { useState, useEffect, Fragment } from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import "chart.js";
import "chart.js/auto";

const DashboardChart = ({ dashchartData, timeRange }) => {
 
  const [chartData, setChartData] = useState(getChartData(dashchartData));
  useEffect(() => {
    setChartData(getChartData(dashchartData));
  }, [dashchartData]);
  function getChartData(dashchartData) {
    const labels = [];
    const values = [];
    dashchartData?.forEach((dayData) => {
      const day = Object.keys(dayData)[0];
      const value = Object.values(dayData)[0];
      labels.push(day);
      values.push(value);
    });
    const data = {
      labels: labels,
      datasets: [
        {
          label:
            timeRange === 1
              ? "Weekly Data"
              : timeRange === 2
              ? "Monthly Data"
              : "Last 5 Years Data",

          data: values,
          borderWidth: 1,
          fill: true,
          backgroundColor: "rgba(64, 196, 255, 1)",
        },
      ],
    };
    return data;
  }

  return (
    <Box
      sx={{ background: "#EFFAFF", padding: "20px 20px", borderRadius: "20px" }}
    >
      <Typography
        sx={{ fontSize: { xs: "16px", sm: "20px" }, fontWeight: "550" }}
      >
        Number Of Users
      </Typography>
      <Box className="mt-10">
        <Line
          data={chartData}
          height={250}
          width={600}
          options={{
            tension: 0.5,
            maintainAspectRatio: false,
            scales: {
              y: {
                suggestedMin: 1,
                suggestedMax: 10,
              },
            },
            legend: { display: false },
          }}
        />
      </Box>
    </Box>
  );
};

export default DashboardChart;
