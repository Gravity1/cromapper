import React, { useRef, useEffect, useState } from "react";
import ReactMapboxGl, {
  Feature,
  Layer,
  ScaleControl,
  ZoomControl,
} from "react-mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import "./MapBoxGl.css";
import turf from "@turf/area";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DrawControl from "react-mapbox-gl-draw";
import * as Yup from "yup";
import useLocation from "./hooks/useLocation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  crop: Yup.string().required("Crop is required"),
  sowingDate: Yup.string().required("Sowing date is required"),
  harvestDate: Yup.string().required("Harvest date is required"),
  area: Yup.string().required("Area is required"),
  acres: Yup.string().required("Acres is required"),
  center: Yup.string().required("Center is required"),
});

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ3Jhdml0eTEiLCJhIjoiY2t6YTRmbXBwMDA3YzJ2cWZrZzljbDBnNCJ9.IbOTaJUNv9gVCkjmgdjkrQ",
});

function MapBoxGl() {
  const [open, setOpen] = useState(false);
  const [acre, setAcre] = useState(0);

  const loc = useLocation();

  console.log(loc);
  const handleClose = () => {
    if (
      window.confirm("Are you sure you want to close?All data will be lost")
    ) {
      setOpen(false);
    }
  };

  const onDrawCreate = ({ features }) => {
    console.log(features);
    setAcre(turf(features[0].geometry).area);
    setOpen(true);
  };

  const onDrawUpdate = ({ features }) => {
    console.log("features");
  };
  const fileSave = useSelector((state) => state.fileSave);

  const { file } = fileSave;

  // const mapboxStyles;

  const { palette } = useTheme();

  // his return

  return (
    <>
      <Map
        style="mapbox://styles/mapbox/satellite-streets-v11"
        containerStyle={{
          height: "90vh",
          width: "100vw",
        }}
        center={
          loc && loc.latitude && loc.longitude
            ? [loc.latitude, loc.longitude]
            : [36.7065, 0.6115]
        }
        zoom={[15]}
      >
        <div>
          <ZoomControl
            style={{
              backgroundColor: palette.primary,
              color: palette.secondary,
            }}
            position="bottom-right"
          />
          {/* <ScaleControl /> */}
          <DrawControl
            position="top-right"
            onDrawCreate={onDrawCreate}
            onDrawUpdate={onDrawUpdate}
          />
        </div>
      </Map>

      <div>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <form>
              <label>
                Field name:
                <input type="text" />
              </label>
              <label>
                Crop planted:
                <input type="text" />
              </label>
              <label>
                Sowing date:
                <input type="date" />
              </label>
              <label>
                Harvest date:
                <input type="date" />
              </label>
              <label>
                Area:
                <input type="number" value={acre} />
              </label>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "min-content",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "1.5em",
// };

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiZ3Jhdml0eTEiLCJhIjoiY2t6YTRmbXBwMDA3YzJ2cWZrZzljbDBnNCJ9.IbOTaJUNv9gVCkjmgdjkrQ";

// function MapBoxGl() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [acre, setAcre] = React.useState(0);

//   const { palette } = useTheme();

//   function BasicModal() {
//     return (
//       <div>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <form>
//               <label>
//                 Field name:
//                 <input type="text" />
//               </label>
//               <label>
//                 Crop planted:
//                 <input type="text" />
//               </label>
//               <label>
//                 Sowing date:
//                 <input type="date" />
//               </label>
//               <label>
//                 Harvest date:
//                 <input type="date" />
//               </label>
//               <label>
//                 Area:
//                 <input type="number" value={acre} />
//               </label>
//             </form>
//           </Box>
//         </Modal>
//       </div>
//     );
//   }
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(36.449);
//   const [lat, setLat] = useState(-0.288);
//   const [zoom, setZoom] = useState(13);

//   const draw = new MapboxDraw({
//     displayControlsDefault: true,
//     // Select which mapbox-gl-draw control buttons to add to the map.
//     controls: {
//       polygon: true,
//       trash: true,
//       line_string: true,
//       point: false,
//       combine_features: false,
//       uncombine_features: false,
//     },
//     // Set mapbox-gl-draw to draw by default.
//     // The user does not have to click the polygon control button first.
//     defaultMode: "draw_polygon",
//   });

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/gravity1/ckza7g0v0001q14p9jw3idvkg",
//       center: [lng, lat],
//       zoom: zoom,
//       attributionControl: false,
//       logoPosition: "bottom-right",
//     });

//     map.current.addControl(draw, "bottom-right");

//     map.current.on("draw.create", updateArea);
//     map.current.on("draw.delete", updateArea);
//     map.current.on("draw.update", updateArea);
//   });

//   function updateArea(e) {
//     console.log("update area starting...");
//     console.log(e.type);
//     if (e.type === "draw.create") setOpen(true);

//     const data = draw.getAll();
//     console.log(data);
//     const answer = document.getElementById("calculated-area");

//     if (data.features.length > 0) {
//       const area = turf(data);
//       // Restrict the area to 2 decimal points.
//       const rounded_area = Math.round(area * 100) / 100;
//       // convert to acres
//       setAcre(rounded_area / 4046.86);
//       answer.innerHTML = `<p><strong>${acre}</strong></p><p>acres</p>`;
//     } else {
//       answer.innerHTML = "";
//       if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
//     }
//   }
//   return (
//     <div className="MapBox_div">
//       {/* <ZoomControl
//         style={{
//           backgroundColor: palette.primary.main,
//         }}
//         position="bottom-left"
//       /> */}
//       {/* <ScaleControl /> */}
//       <div ref={mapContainer} className="map-container" id="map-container-id" />
//       <div className="calculation-box">
//         <BasicModal />
//         <p>Click the map to draw a polygon.</p>
//         <div id="calculated-area"></div>
//       </div>
//     </div>
//   );
// }

// // my end

export default MapBoxGl;

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
// his fx

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "min-content",
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//     borderRadius: "1.5em",
//   };

//   const Map= ReactMapboxGl({
//     accessToken:
//       "pk.eyJ1IjoiZ3Jhdml0eTEiLCJhIjoiY2t6YTRmbXBwMDA3YzJ2cWZrZzljbDBnNCJ9.IbOTaJUNv9gVCkjmgdjkrQ",
//   });
//   export default function MapBoxGl() {
//     const onDrawCreate = ({ features }) => {
//       console.log("features");
//     };

//   const onDrawUpdate = ({ features }) => {
//     console.log("features");
//   };
//   const fileSave = useSelector((state) => state.fileSave);

//   const { file } = fileSave;

//   // const mapboxStyles;

//   const { palette } = useTheme();

//   // his return

//   return (
//     <>
//       <LayersOutlined
//         style={{
//           position: "absolute",
//           zIndex: "1000",
//           top: 300,
//           backgroundColor: palette.secondary.main,
//           color: palette.primary.contrastText,
//           padding: 10,
//           fontSize: 50,
//           cursor: "pointer",
//         }}
//       >
//         <Tooltip title="Change Map Style" style={{ position: "absolute" }} />
//       </LayersOutlined>

//       <Map
//         style="mapbox://styles/mapbox/satellite-streets-v11"
//         containerStyle={{
//           height: "90vh",
//           width: "100vw",
//         }}
//         center={[36.7065, 0.6115]}
//         zoom={[15]}
//       >
//         <ZoomControl
//           style={{
//             backgroundColor: palette.primary.main,
//           }}
//           position="bottom-left"
//         />
//         <ScaleControl />
//         <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />
//       </Map>
//     </>
//   );
// }
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// my return
