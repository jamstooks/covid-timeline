import { generateAdaptiveTheme } from "@adobe/leonardo-contrast-colors";
import _ from "lodash";

const ratios = _.range(1.2, 2.6, 0.1);

// returns theme colors as JSON
const themeColors = generateAdaptiveTheme({
  baseScale: "Cases",
  colorScales: [
    {
      name: "Cases",
      colorKeys: ["#206993"],
      colorspace: "CAM02",
      ratios: ratios
    },
    {
      name: "Deaths",
      colorKeys: ["#ed553b", "#de0a03"],
      colorspace: "CAM02",
      ratios: ratios
    }
  ],
  brightness: "100",
  contrast: "3.83"
}).reduce((acc, c) => {
  if ("name" in c) {
    acc[c.name.toLowerCase()] = c.values.map(v => v.value);
  }
  return acc;
}, {});

export const colors = {
  ...themeColors,
  chartColors: [
    "#173f5f",
    "#20639b",
    "#3caea3",
    "#f6d55c",
    "#ed553b",
    "#d0021b",
    "#899e2a",
    "#6f6f96"
  ]
};
