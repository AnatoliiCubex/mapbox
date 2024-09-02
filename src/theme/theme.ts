import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

import { components } from "~/theme/options/components.theme";
import { palette } from "~/theme/options/palette.theme";
import { spacing } from "~/theme/options/spacing.theme";
import { typography } from "~/theme/options/typography.theme";

export const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
  palette,
  components,
  spacing,
  typography,
});

export default theme;
