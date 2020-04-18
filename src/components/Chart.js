import React, { useState } from "react";
import { format } from "date-fns";
import numeral from "numeral";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { startCase } from "lodash";

import { COMPARE_COUNTRIES } from "../data/global";
import { colors } from "../theme";

const useStyles = makeStyles({
  toggle: {
    paddingRight: "5em",
    textAlign: "right",
  },
  chart: {
    height: "30vh",
    width: "100vw",
  },
});

export default function Chart({ data, date }) {
  const [dataSet, setDataSet] = useState("cases");
  const classes = useStyles();

  const lines = COMPARE_COUNTRIES.map((c, i) => {
    return (
      <Line
        key={c}
        type="monotone"
        dataKey={c}
        stroke={colors.chartColors[i % 5]}
        dot={false}
      />
    );
  });

  const toggleDataSet = () => {
    setDataSet((prev) => (prev === "cases" ? "deaths" : "cases"));
  };

  return (
    <>
      <div className={classes.chart}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={data[dataSet]}
            margin={{
              top: 5,
              right: 20,
              left: 75,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              type="number"
              domain={["dataMin", "dataMax"]}
              scale="linear"
              tickFormatter={(x) => format(new Date(x), "MMM-d")}
              tickCount={20}
            />
            <YAxis
              type="number"
              orientation="right"
              stroke={colors.cases[7]}
              tickFormatter={(y) => numeral(y).format("0a").toUpperCase()}
            />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={(d) => (
                <strong>{format(new Date(d), "MMM do")}</strong>
              )}
              isAnimationActive={false}
            />
            <Legend
              iconType="plainline"
              formatter={(v) => startCase(v)}
              margin={{ top: 10, left: 0, right: 0, bottom: 0 }}
            />
            {lines}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.toggle}>
        Cases
        <Switch onChange={toggleDataSet} color="default" />
        Deaths
      </div>
    </>
  );
}

const numberFormatter = (n) => numeral(n).format("0a").toUpperCase();

const tooltipFormatter = (value, name) => {
  return [numberFormatter(value), startCase(name)];
};
