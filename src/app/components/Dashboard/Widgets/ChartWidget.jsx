import WidgetCard from "./WidgetCard";
import { useEffect, useState } from "react";

import {
  CartesianGrid,
} from "recharts";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { getTelemetryValue } from "../../../core/telemetry/telemetryResolver";

export default function ChartWidget({
  widget,
  telemetry,
}) {

  const value = getTelemetryValue(
  widget,
  telemetry
);

const [data, setData] = useState([]);

useEffect(() => {

  setData((prev) => {

    const updated = [

      ...prev,

      {
        time: new Date().toLocaleTimeString(),
        value,
      },

    ];

    return updated.slice(-20);

  });

}, [value]);

  return (

    <WidgetCard title="Live Chart">

      <div className="
    w-full
    h-65
  ">

        <ResponsiveContainer
          width="100%"
          height={260}
        >

          <LineChart data={data}>

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <CartesianGrid strokeDasharray="3 3" />

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