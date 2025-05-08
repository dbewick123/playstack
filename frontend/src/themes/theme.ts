import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    playstackNegative: Palette["primary"];
    playstackDisabled: Palette["primary"];
    playstackPrimary: Palette["primary"];
  }
  interface PaletteOptions {
    playstackNegative?: PaletteOptions["primary"];
    playstackDisabled?: PaletteOptions["primary"];
    playstackPrimary?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    playstackNegative: true;
    playstackDisabled: true;
    playstackPrimary: true;
  }
}

export const theme = createTheme({
  palette: {
    playstackNegative: {
      main: "#d32f2f",
      contrastText: "#fff",
    },
    playstackDisabled: {
      main: "#9e9e9e",
      contrastText: "#000",
    },
    playstackPrimary: {
      main: "#ffffff1f",
      contrastText: "#2fa98c",
    },
  },
});
