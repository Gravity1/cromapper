import React, { useEffect } from "react";
import ReactMapboxGl, { Feature, Layer, ScaleControl } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { ZoomControl } from "react-mapbox-gl";
import { GeolocateControl } from "mapbox-gl";
import { LayersOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ3Jhdml0eTEiLCJhIjoiY2t6YTRmbXBwMDA3YzJ2cWZrZzljbDBnNCJ9.IbOTaJUNv9gVCkjmgdjkrQ",
});

export default function MapBoxGl() {
  const onDrawCreate = ({ features }) => {
    console.log("features");
  };

  const onDrawUpdate = ({ features }) => {
    console.log("features");
  };
  const fileSave = useSelector((state) => state.fileSave);

  const { file } = fileSave;

  // const mapboxStyles;

  const { palette } = useTheme();

  return (
    <>
      <LayersOutlined
        style={{
          position: "absolute",
          zIndex: "1000",
          top: 300,
          backgroundColor: palette.secondary.main,
          color: palette.primary.contrastText,
          padding: 10,
          fontSize: 50,
          cursor: "pointer",
        }}
      >
        <Tooltip title="Change Map Style" style={{ position: "absolute" }} />
      </LayersOutlined>

      <Map
        style="mapbox://styles/mapbox/satellite-streets-v11"
        containerStyle={{
          height: "90vh",
          width: "100vw",
        }}
        center={[36.7065, 0.6115]}
        zoom={[15]}
      >
        <ZoomControl
          style={{
            backgroundColor: palette.primary.main,
          }}
          position="bottom-left"
        />
        <ScaleControl />
        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />
      </Map>
    </>
  );
}
