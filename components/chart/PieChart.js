"use client";

import React from "react";

import { Box, Stack, Grid, Typography } from "@mui/material";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import PrimaryCard from "@/components/card/primaryCard";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({
  titleText,
  labels,
  labelText,
  dataLabel,
  backgroundColor,
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: labelText,
        data: dataLabel,
        backgroundColor: backgroundColor,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    aspectRatio: 2,
    plugins: {
      datalabels: {
        // Tambahkan konfigurasi ini
        color: "black",
        font: {
          size: 28,
        },
        formatter: (value, ctx) => {
          return value;
        },
      },
      legend: {
        position: "right",
        labels: {
          boxWidth: 25, // Atur lebar kotak warna di sini
          boxHeight: 25,
          padding: 25, // Atur padding antara kotak warna dan teks label
          color: "#101828",
          font: {
            size: "16px", // ukuran font
          },
        },
      },
    },
  };

  return (
    <Grid item sm={12} md={6} lg={4}>
      <PrimaryCard sx={{ paddingX: 0 }}>
        <Stack direction={"column"} spacing={2}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              paddingLeft: "40px",
            }}
          >
            {titleText}
          </Typography>
          <Box sx={{ width: "90%" }}>
            <Pie data={data} options={options}></Pie>
          </Box>
        </Stack>
      </PrimaryCard>
    </Grid>
  );
};

export default PieChart;
