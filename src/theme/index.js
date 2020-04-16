import { createMuiTheme } from "@material-ui/core/styles";

import { colors } from "./colors";

export const theme = createMuiTheme({
  palette: {
    primary: { main: colors.cases[7] },
    secondary: { main: colors.deaths[7] }
  }
});

export { colors };
