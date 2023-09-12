interface ChartProps {
  w: number;
  h: number;
  data?: any;
  x?: string;
  y?: string;
}

type RequiredDataProps<T> = T extends { data: any } ? { x: string; y: string } : {};
export type FinalChartProps = ChartProps & RequiredDataProps<ChartProps>;
