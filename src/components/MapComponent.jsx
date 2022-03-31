import React from "react";
import ReactMapboxGl, { RotationControl, ZoomControl } from "react-mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useTheme } from "@emotion/react";
import DrawControl from "react-mapbox-gl-draw";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ3Jhdml0eTEiLCJhIjoiY2t6YTRmbXBwMDA3YzJ2cWZrZzljbDBnNCJ9.IbOTaJUNv9gVCkjmgdjkrQ",
});

function MapComponent({ children }) {
  const onDrawCreate = ({ features }) => {};

  const onDrawUpdate = ({ features }) => {
    console.log("features");
  };

  // const mapboxStyles;

  const { palette } = useTheme();

  return (
    <>
      <Map
        style="mapbox://styles/mapbox/satellite-streets-v11"
        containerStyle={{
          height: "90vh",
          width: "100vw",
        }}
        center={
          // loc && loc.latitude && loc.longitude
          //   ? [loc.latitude, loc.longitude]
          //   : [36.7065, 0.6115]
          [36.7065, 0.6115]
        }
      >
        {children}
        <div>
          <ZoomControl
            style={{
              backgroundColor: palette.primary,
              color: palette.secondary,
            }}
            position="bottom-right"
          />
          {/* <ScaleControl /> */}
         
          <RotationControl position="bottom-left" />
        </div>
      </Map>
    </>
  );
}

export default MapComponent;
