import "./MapBoxGl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import turf from "@turf/area";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3Jhdml0eTEiLCJhIjoiY2t6YTRmbXBwMDA3YzJ2cWZrZzljbDBnNCJ9.IbOTaJUNv9gVCkjmgdjkrQ";

function MapBoxGl() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function BasicModal() {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(36.449);
  const [lat, setLat] = useState(-0.288);
  const [zoom, setZoom] = useState(13);

  const draw = new MapboxDraw({
    displayControlsDefault: true,
    // Select which mapbox-gl-draw control buttons to add to the map.
    controls: {
      polygon: true,
      trash: true,
      line_string: true,
      point: false,
      combine_features: false,
      uncombine_features: false,
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    defaultMode: "draw_polygon",
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/gravity1/ckza7g0v0001q14p9jw3idvkg",
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
      logoPosition: "bottom-right",
    });

    map.current.addControl(draw, "bottom-right");

    map.current.on("draw.create", updateArea);
    map.current.on("draw.delete", updateArea);
    map.current.on("draw.update", updateArea);
  });

  function updateArea(e) {
    console.log("update area starting...");
    console.log(e.type);
    if (e.type === "draw.create") setOpen(true);

    const data = draw.getAll();
    console.log(data);
    const answer = document.getElementById("calculated-area");

    if (data.features.length > 0) {
      const area = turf(data);
      // Restrict the area to 2 decimal points.
      const rounded_area = Math.round(area * 100) / 100;
      // convert to acres
      const acres = rounded_area / 4046.86;
      answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>acres</p>`;
    } else {
      answer.innerHTML = "";
      if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
    }
  }

  return (
    <div className="MapBox_div">
      <div ref={mapContainer} className="map-container" />
      <div className="calculation-box">
        <BasicModal />
        <p>Click the map to draw a polygon.</p>
        <div id="calculated-area"></div>
      </div>
    </div>
  );
}

export default MapBoxGl;
