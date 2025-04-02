import { PieChart as RechartPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartProps {
  municipalTax: number;
  educationTax: number;
}

export default function PieChart({ municipalTax, educationTax }: PieChartProps) {
  const data = [
    { name: "Municipal Tax", value: municipalTax },
    { name: "Education Tax", value: educationTax },
  ];

  const COLORS = ["#0088FE", "#00C853"]; // Blue for Municipal, Green for Education

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          animationDuration={1000}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartPieChart>
    </ResponsiveContainer>
  );
}
