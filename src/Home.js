import React from "react";
import Layers from "./Layers";
import MapBoxGl from "./MapBoxGl";
import Title from "./Title";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchBar from "material-ui-search-bar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import RightSideBar from "./components/RightSideBar";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <RightSideBar />
      <div className="MapView">
        {/* <Title /> */}
        {/* <Layers /> */}
        <MapBoxGl />
        <div className="nav_div"></div>
        <div className="not_nav_div"></div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="Navbar">
      <div className="leftside_nav">
        <div className="navbar_icon_div">
          <MenuIcon fontSize="large" />
        </div>
      </div>
      <div className="rightside_nav">
        <ul>
          <li>
            
          </li>
          <li>
            <Link to="/login">Log out</Link>
          </li>
          <li>
            <AccountCircleIcon />
          </li>
        </ul>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Home;
