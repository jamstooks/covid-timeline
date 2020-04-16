// import { generateAdaptiveTheme } from "@adobe/leonardo-contrast-colors";
// import _ from "lodash";


// Disabling until leonardo release
// const ratios = _.range(1.2, 2.6, 0.1);

// const themeColors = generateAdaptiveTheme({
//   baseScale: "Cases",
//   colorScales: [
//     {
//       name: "Cases",
//       colorKeys: ["#206993"],
//       colorspace: "CAM02",
//       ratios: ratios
//     },
//     {
//       name: "Deaths",
//       colorKeys: ["#ed553b", "#de0a03"],
//       colorspace: "CAM02",
//       ratios: ratios
//     }
//   ],
//   brightness: "100",
//   contrast: "3.83"
// }).reduce((acc, c) => {
//   if ("name" in c) {
//     acc[c.name.toLowerCase()] = c.values.map(v => v.value);
//   }
//   return acc;
// }, {});

const themeColors = {
  cases: [
    "#b5c4cf",
    "#9eb3c2",
    "#8ba6b9",
    "#7b9bb1",
    "#6e91ab",
    "#6189a6",
    "#5683a1",
    "#4a7c9d",
    "#40779a",
    "#367297",
    "#2a6d95",
    "#206992",
    "#23648b",
    "#246084"
  ],
  deaths: [
    "#f4b2a3",
    "#f39985",
    "#f2836c",
    "#f06f56",
    "#ee5e44",
    "#eb4d34",
    "#e73e27",
    "#e32d19",
    "#e0180a",
    "#d81206",
    "#cc1a0c",
    "#c11f0f",
    "#b72212",
    "#af2414"
  ]
};

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
