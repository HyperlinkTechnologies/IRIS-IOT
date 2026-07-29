import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function TelemetryChart({
  data,
}) {

  return (

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <LineChart data={data}>

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="time"
        />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#ff5700"
          strokeWidth={3}
          dot={false}
        />

      </LineChart>

    </ResponsiveContainer>

  );

}