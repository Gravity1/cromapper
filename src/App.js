import "./App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import ForgotPass from "./ForgotPass";
import Weather from "./components/Weather";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./config/theme";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/recovery" element={<ForgotPass />}></Route>
          <Route path="/weather" element={<Weather />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
