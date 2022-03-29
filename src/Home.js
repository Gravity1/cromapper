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
  );
}

export default Home;
