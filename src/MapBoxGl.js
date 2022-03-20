import "./MapBoxGl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import turf from "@turf/area";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3Jhdml0eTEiLCJhIjoiY2t6YTRmbXBwMDA3YzJ2cWZrZzljbDBnNCJ9.IbOTaJUNv9gVCkjmgdjkrQ";

function MapBoxGl() {
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
    const data = draw.getAll();
    console.log(data);
    const answer = document.getElementById("calculated-area");
    if (data.features.length > 0) {
      const area = turf(data);
      // Restrict the area to 2 decimal points.
      const rounded_area = Math.round(area * 100) / 100;
      // convert to acres
      const acres = rounded_area / 4046.86;
      console.log("area in acres is ", acres);
      answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
      console.log("rounded area is : ", rounded_area);
    } else {
      answer.innerHTML = "";
      if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
    }
  }

  return (
    <div className="MapBox_div">
      <div ref={mapContainer} className="map-container" />
      <div className="calculation-box">
        <p>Click the map to draw a polygon.</p>
        <div id="calculated-area"></div>
      </div>
    </div>
  );
}

export default MapBoxGl;
