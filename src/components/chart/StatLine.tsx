import { FinalChartProps } from '@/utils/type/chart';

import { Chart as ChartTS, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartTS.register(
  LinearScale, PointElement, LineElement, Filler
);

const options = {
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
      borderColor: "rgba(47,97,68,1)",
      fill: "start",
      backgroundColor: "rgba(47,97,68,0.3)"
    }
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
  plugins: {
    legend: {
      display: false,
    }
  },
};

const datas = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3]
    }
  ]
};

export default function StatLineChart({ w, h, data, x, y }: FinalChartProps) {
  return (
    <Line data={datas || data} width={w} height={h} options={options} />
  )
}