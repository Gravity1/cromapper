import React from "react";
import MapBoxGl from "./MapBoxGl";
import RightSideBar from "./components/RightSideBar";
import Navbar from "./components/NavBar";
import { Container } from "@mui/material";

function Home() {
  return (
    <>
    
      <Navbar />
      <RightSideBar />
    
        <MapBoxGl />

      
    </>

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
          <li></li>
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
