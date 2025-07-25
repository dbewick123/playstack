import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    playstackSelected: Palette["primary"];
    playstackDisabled: Palette["primary"];
    playstackPrimary: Palette["primary"];
    playstackPrimaryChip: Palette["primary"];
    playstackContrast: Palette["primary"];
    playstackPrimaryPaging: Palette["primary"];
  }
  interface PaletteOptions {
    playstackSelected?: PaletteOptions["primary"];
    playstackDisabled?: PaletteOptions["primary"];
    playstackPrimary?: PaletteOptions["primary"];
    playstackPrimaryChip?: PaletteOptions["primary"];
    playstackContrast?: PaletteOptions["primary"];
    playstackPrimaryPaging?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    playstackSelected: true;
    playstackDisabled: true;
    playstackPrimary: true;
    playstackPrimaryChip: true;
    playstackContrast: true;
    playstackPrimaryPaging: true;
  }
}

export const theme = createTheme({

  palette: {
    playstackSelected: {
      main: "#2c433b",
      contrastText: "#2fa98c",
    },
    playstackDisabled: {
      main: "#9e9e9e",
      contrastText: "#000",
    },
    playstackPrimary: {
      main: "#ffffff1f",
      light: "#2c433b",
      contrastText: "#2fa98c",
    },
    playstackPrimaryChip: {
      main: "#ffffff1f",
      light: "#2c433b",
      contrastText: "rgba(255, 255, 255, 0.871)",
    },
    playstackPrimaryPaging: {
      main: "rgba(255, 255, 255, 0.871)",
      light: "#1e1e1e",
    },
    playstackContrast: {
      main: "#1e1e1e",
    },
  },
});

