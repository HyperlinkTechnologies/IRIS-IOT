import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function formatXAxis(value) {
  const date = new Date(value);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3">
      <p className="text-gray-500 text-sm">
        {new Date(label).toLocaleString()}
      </p>

      <p className="text-orange-500 font-semibold mt-1">
        Value : {payload[0].value}
      </p>
    </div>
  );
}

export default function TelemetryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 15,
        }}
      >
        <CartesianGrid
          stroke="#d1d5db"
          strokeDasharray="4 4"
          vertical={false}
        />

        <XAxis
          dataKey="time"
          tickFormatter={formatXAxis}
          tick={{ fontSize: 12 }}
          minTickGap={40}
          tickMargin={10}
        />

        <YAxis
          domain={["auto", "auto"]}
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend />

        <Line
          name="Telemetry"
          type="monotone"
          dataKey="value"
          stroke="#ff5700"
          strokeWidth={3}
          dot={{
            r: 3,
            strokeWidth: 2,
            fill: "#ffffff",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}