import { Typography } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Background from "./splash.png";

function Welcome() {
  return (
    <div
      style={{
        // backgroundImage:'url(${background})'
        backgroundImage: `url(${Background})`,
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "100vh",
          backgroundColor: "rgba(103, 97, 41, 0.9)",
        }}
      >
        <Navbar />
        <div
          style={{
            display: "flex",
            marginTop: "7em",
          }}
        >
          <div
            style={{
              padding: "10%",
              color: "white",
              backgroundColor: " rgba(129, 119, 22, 0.84)",
              borderRadius: "1em",
              marginLeft: "2em",
              marginRight: "2em",
            }}
          >
            Monitor the health of your crops, predict yields and daily weather
            forecast in CROMAP.
            <br />
            <Link to="*">View Live Webpage</Link>
          </div>
          <div
            style={{
              padding: "10%",
              color: "white",
              backgroundColor: " rgba(129, 119, 22, 0.84)",
              borderRadius: "1em",
              marginLeft: "2em",
              marginRight: "2em",
            }}
          >
            Control pests, manage your fields and learn about best farming
            practices in CROMAP.
            <br />
            <Link to="*">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "#817716",
        display: "flex",
        zIndex: 999,
        position: "relative",
        width: "100%",
        borderBottom: "3px solid white",
        borderTop: "3px solid white",
        color: "white",
      }}
    >
      <Typography variant="h3" component="h2">
        CROMAP
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        style={{
          position: "fixed",
          width: "100vw",
          textAlign: "center",
          paddingTop: "1em",
        }}
      >
        Improving farm efficiencies
      </Typography>
    </div>
  );
}

export default Welcome;
