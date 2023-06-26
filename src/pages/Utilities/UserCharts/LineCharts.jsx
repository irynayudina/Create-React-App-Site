import React, {useEffect, useState} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", discussions: 400, challenges: 2400, code: 2400 },
  { name: "Feb", discussions: 300, challenges: 1398, code: 2210 },
  { name: "Mar", discussions: 200, challenges: 9800, code: 2290 },
  { name: "Apr", discussions: 278, challenges: 3908, code: 2000 },
  { name: "May", discussions: 189, challenges: 4800, code: 2181 },
  { name: "Jun", discussions: 239, challenges: 3800, code: 2500 },
  { name: "Jul", discussions: 349, challenges: 4300, code: 2100 },
];

function generateRandomDataForMonth(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const data = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const discussions = Math.floor(Math.random() * 1000);
    const challenges = Math.floor(Math.random() * 2000);
    const code = Math.floor(Math.random() * 3000);
    data.push({
    //   name: `${year}-${month.toString().padStart(2, "0")}-${i
      name: `${i
        .toString()
        .padStart(2, "0")}`,
      discussions,
      challenges,
      code,
    });
  }
  return data;
}
const year = 2023;
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const data1 = {};

months.forEach((month) => {
  const monthData = generateRandomDataForMonth(year, month);
  data1[month] = monthData;
});
// console.log(data1);
const LineCharts = ({ lcwidth }) => {
  return (
    <LineChart width={lcwidth} height={300} data={data1[5]} className='charts'>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval={3} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="challenges" stroke="#8884d8" />
      <Line type="monotone" dataKey="discussions" stroke="#82ca9d" />
      <Line type="monotone" dataKey="code" stroke="#82ca9d" />
    </LineChart>
  );
};

export default LineCharts