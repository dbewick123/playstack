import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    playstackSelected: Palette["primary"];
    playstackDisabled: Palette["primary"];
    playstackPrimary: Palette["primary"];
    playstackPrimaryChip: Palette["primary"];
    playstackContrast: Palette["primary"];
    playstackPrimaryPaging: Palette["primary"];
    playstackAction: Palette["primary"];
  }
  interface PaletteOptions {
    playstackSelected?: PaletteOptions["primary"];
    playstackDisabled?: PaletteOptions["primary"];
    playstackPrimary?: PaletteOptions["primary"];
    playstackPrimaryChip?: PaletteOptions["primary"];
    playstackContrast?: PaletteOptions["primary"];
    playstackPrimaryPaging?: PaletteOptions["primary"];
    playstackAction?: PaletteOptions["primary"];
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
    playstackAction: true;
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
    // Primary call-to-action button (modal submit, etc.) — green fill, dark text.
    playstackAction: {
      main: "#2fa98c",
      dark: "#17876d",
      contrastText: "#1e1e1e",
    },
  },

  components: {
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          margin: "0 !important",
        },
      },
    },

    // Buttons — base typography applied globally so per-component CSS isn't needed.
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-sm)",
          fontWeight: "var(--font-weight-medium)",
          lineHeight: 1.75,
          textTransform: "none",
        },
      },
    },

    // Pagination — used as a visual progress indicator for infinite scroll (all items disabled).
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-family-base)",
          color: "var(--color-text-highemp)",
          backgroundColor: "var(--color-background)",
          // All items are intentionally disabled — suppress MUI's opacity reduction.
          "&.Mui-disabled": {
            opacity: 1,
            color: "var(--color-text-highemp)",
            backgroundColor: "var(--color-background)",
          },
          "&.Mui-disabled.Mui-selected": {
            border: "1px solid var(--overlay-08dp)",
            backgroundColor: "var(--overlay-01dp)",
            color: "var(--color-text-highemp)",
          },
        },
      },
    },

    // Dialogs share one surface across the app (auth modal, game description, etc.).
    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: "var(--z-modal)",
        },
        paper: {
          backgroundColor: "var(--modal-background-color)",
          backgroundImage:
            "linear-gradient(var(--modal-overlay), var(--modal-overlay))",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--modal-title-font-size)",
          fontWeight: "var(--modal-title-font-weight)",
          color: "var(--modal-title-color)",
        },
      },
    },

    // Account menu (Header) — shares the modal's surface look.
    MuiMenu: {
      styleOverrides: {
        root: {
          zIndex: "var(--z-popover)",
        },
        paper: {
          backgroundColor: "var(--modal-background-color)",
          backgroundImage:
            "linear-gradient(var(--modal-overlay), var(--modal-overlay))",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--modal-input-font-size)",
          color: "var(--modal-text-color)",
          "&:hover": {
            backgroundColor: "var(--overlay-08dp)",
            color: "var(--modal-menu-hover-color)",
          },
        },
      },
    },

    // Form inputs — currently only used in the auth modal.
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--modal-input-font-size)",
          color: "var(--modal-input-text-color)",
        },
        notchedOutline: {
          borderColor: "var(--modal-input-border-color)",
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--modal-input-border-hover-color)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--modal-input-border-focus-color)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--modal-input-font-size)",
          color: "var(--modal-input-label-color)",
          "&.Mui-focused": {
            color: "var(--modal-input-label-focus-color)",
          },
        },
      },
    },

    // Tabs — currently only used in the auth modal.
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--modal-accent-color)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-sm)",
          fontWeight: "var(--font-weight-regularplus)",
          color: "var(--modal-tab-color)",
          textTransform: "none",
          "&.Mui-selected": {
            color: "var(--modal-tab-selected-color)",
          },
        },
      },
    },
  },
});

