import React from "react";

import { useAtomValue } from "jotai";
import { Cell, Pie, PieChart as Chart, ResponsiveContainer } from "recharts";

import { themeAtom } from "../utils/store";
import { ChartType } from "../utils/metrics";

interface Props {
  data: Array<ChartType>;
  total: number;
}

const PieChart: React.FC<Props> = ({ data, total }) => {
  const theme = useAtomValue(themeAtom);

  const isDark = theme === "dark" ? true : false;
  const colors = ["#00c896", isDark ? "#777" : "#ddd"];

  return (
    <div className="w-full h-screen max-h-[260px] relative">
      <ResponsiveContainer>
        <Chart>
          <Pie stroke="none" data={data} innerRadius={75} outerRadius={80} paddingAngle={0} dataKey="value">
            {data.map((entry: ChartType, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </Chart>
      </ResponsiveContainer>
      <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] font-bold">
        {data[0].value} <span className="font-extralight"> / {total}</span>
      </div>
    </div>
  );
};

export default PieChart;
