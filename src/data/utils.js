import _ from "lodash";

import { colors } from "../theme";

const colorStops = {
  cases: _.range(1, 14).map((v, i) => Math.pow(2, i)),
  deaths: [..._.range(1, 14).map((v, i) => Math.pow(2, i)), Infinity]
};

export const getColor = state => {
  if (state.deaths > 0) {
    let index = _.sortedIndex(colorStops.deaths, state.deaths);
    let color =
      colors.deaths[
        index > colorStops.deaths.length - 1 ? colors.deaths.length - 1 : index
      ];

    if (!color) {
      console.error("d: ", colorStops.deaths, state.deaths);
      console.error(color, index, colors.deaths.length);
    }
    return color;
  }
  if (state.cases > 0) {
    let index = _.sortedIndex(colorStops.cases, state.cases);
    let color =
      colors.cases[
        index > colorStops.cases.length - 1 ? colors.cases.length - 1 : index
      ];
    if (!color) {
      console.error("c: ", colorStops.cases, state.cases);
      console.error(color, index, colors.cases.length);
    }
    return color;
  }
  return null;
};
