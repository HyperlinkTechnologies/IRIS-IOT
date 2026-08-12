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

export default function TelemetryChart({
    data,
    timeRange,
}) {

 const formatXAxis = (value) => {

    const date = new Date(value);

    if (timeRange === "7d" || timeRange === "30d") {

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
        });

    }

    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });

};

const getTicks = () => {
  if (timeRange !== "7d" && timeRange !== "30d") {
    return undefined;
  }

  const days = timeRange === "7d" ? 7 : 30;
  const ticks = [];

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));

  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    ticks.push(d.getTime());
  }

  return ticks;
};
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
  type="number"
  scale="time"
  domain={
    timeRange === "7d" || timeRange === "30d"
      ? [getTicks()[0], getTicks().at(-1)]
      : ["dataMin", "dataMax"]
  }
  ticks={getTicks()}
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