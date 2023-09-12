import { FinalChartProps } from '@/utils/type/chart';

import { Chart as ChartTS, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartTS.register(
  LinearScale, PointElement, LineElement, Filler, Tooltip, Legend
);

const options = {
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
      borderColor: "rgba(47,97,68,1)",
      fill: "start",
    },
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
};

const datas = {
  labels: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September"
  ],
  datasets: [
    {
      label: "Visitors",
      borderRadius: 5,
      data: [15000, 16000, 18000, 17000, 20000, 19000, 21000, 22000, 21000],
      borderColor: "rgba(32,214,155,1)",
    },
    {
      label: "Sales",
      borderRadius: 5,
      data: [13000, 13500, 13200, 13300, 13800, 13600, 14000, 14200, 14000],
      borderColor: "rgba(47,97,68,1)",
    }
  ]
};



export default function LineChartComponent({ data, x, y }: { data?: any, x?: number, y?: number }) {
  return (
    <Line data={data || datas} options={options} />
  )
}