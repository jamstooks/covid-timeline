import { createMuiTheme } from "@material-ui/core/styles";

import { colors } from "./colors";
console.log("color", colors.cases[7]);

export const theme = createMuiTheme({
  palette: {
    // type: "dark"
    // background: { default: "lightgray" }
    // background: { default: "#37474f" }
    primary: { main: colors.cases[7] },
    secondary: { main: colors.deaths[7] }
  }
});

export { colors };
