import WidgetCard from "./WidgetCard";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ChartWidget() {

  const data = [

    { time: "1", value: 20 },
    { time: "2", value: 35 },
    { time: "3", value: 28 },
    { time: "4", value: 50 },
    { time: "5", value: 42 },

  ];

  return (

    <WidgetCard title="Live Chart">

      <div className="
    w-full
    h-full
    flex
    items-center
    justify-center
  ">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#ff5700"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </WidgetCard>
  );
}