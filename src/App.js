import "./App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import ForgotPass from "./ForgotPass";
import Weather from "./components/Weather";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./config/theme";
import Welcome from "./Welcome";

import { Container, CssBaseline, Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FieldDateScreen from "./screens/FieldDateScreen";
function App() {
  return (
    <Grid container>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/recovery" element={<ForgotPass />}></Route>
            <Route path="/weather" element={<Weather />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/data/:id" element={<FieldDateScreen />}></Route>
            <Route path="*" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Grid>
  );
}

export default App;
