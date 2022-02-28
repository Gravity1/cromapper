import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#827717",
    },
    secondary: {
      main: "#8BC34A",
      contrastText: "#ffffff",
    },
    divider: "#ffffff",
    background: {
      default: "#ffffff",
    },
    success: {
      main: "#4BDE97",
    },
    warning: {
      main: "#FFB648",
    },
    danger: {
      main: "#F26464",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2F49D1",
    },
    secondary: {
      main: "#B6C1E9",
      contrastText: "#B9B9B9",
    },
    divider: "#ffffff",
    background: {
      default: "#F0F2FA",
    },
    success: {
      main: "#4BDE97",
    },

    warning: {
      main: "#FFB648",
    },
    danger: {
      main: "#F26464",
    },
  },
});

export { lightTheme, darkTheme };
