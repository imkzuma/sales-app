import { FinalChartProps } from "@/utils/type/chart";

import { Chart as ChartTS, CategoryScale, LinearScale, PointElement, BarElement, Filler, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartTS.register(
  CategoryScale, LinearScale, PointElement, BarElement, Filler, Title, Tooltip, Legend
);
const options = {
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        boxWidth: 7,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
  },
  elements: {
    bar: {
      barPercentage: 1,
      categoryPercentage: 1,
    },
  },
};


const datas = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      borderRadius: 5,
      data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3],
      backgroundColor: "rgba(32,214,155,1)",
    },
    {
      label: "Orders",
      borderRadius: 5,
      data: [0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3, 0.1],
      backgroundColor: "rgba(47,97,68,1)",
    }
  ]
};

export default function BarChartComponent({ data, x, y }: { data?: any, x?: number, y?: number }) {
  return (
    <Bar data={data || datas} options={options} />
  )
}