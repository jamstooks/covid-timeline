import Trianglify from "trianglify";

import { colors } from "./colors";

export const headerBackground = () => {
  return getFromPalette([
    colors.cases[11],
    colors.cases[2],
    colors.cases[9],
    colors.deaths[2],
    colors.cases[13],
  ]);
};

export const footerBackground = () => {
  return getFromPalette([colors.cases[2], colors.cases[0], colors.cases[1]]);
};

const getFromPalette = (palette) => {
  const pattern = Trianglify({
    width: window.innerWidth * 1.3,
    height: 150,
    cell_size: 50,
    x_colors: palette,
    y_colors: false,
  });

  // Serialize the SVG object to a String
  var m = new XMLSerializer().serializeToString(pattern.svg());

  // Perform the base64 encoding of the String
  var k = window.btoa(m);

  // Query the element to set the background image property
  return `url("data:image/svg+xml;base64,${k}")`;
};
