import React, { useRef, useEffect, useState } from "react";
import ReactMapboxGl, {
  Feature,
  Image,
  Layer,
  RotationControl,
  ScaleControl,
  ZoomControl,
} from "react-mapbox-gl";
import * as geolib from "geolib";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import "./MapBoxGl.css";
import turf from "@turf/area";
import Box from "@mui/material/Box";
import DrawControl from "react-mapbox-gl-draw";
import * as Yup from "yup";
import useLocation from "./hooks/useLocation";
import { Button, Container, Grid, Typography, Modal } from "@mui/material";
import Form from "./components/form/Form";
import InputComponent from "./components/form/InputComponent";
import { CustomDropDown } from "./components/form/CustomDropDown";
import { crops } from "./data/data";
import CustomDatePicker from "./components/form/CustomDatePicker";
import SubmitButton from "./components/form/SubmitButton";
import ee from "@google/earthengine";
import { CREATE_FIELD_RESET } from "./constants/fieldConstants";
import { toast } from "react-toastify";
import { createField } from "./actions/fieldActions";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  crop: Yup.string().required("Crop is required"),
  sowingDate: Yup.string().required("Sowing date is required"),
  harvestDate: Yup.string().required("Harvest date is required"),
});

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ3Jhdml0eTEiLCJhIjoiY2t6YTRmbXBwMDA3YzJ2cWZrZzljbDBnNCJ9.IbOTaJUNv9gVCkjmgdjkrQ",
});

function MapBoxGl() {
  const [open, setOpen] = useState(false);
  // const [acre, setAcre] = useState(0);
  const [poly, setPoly] = useState(null);
  const [polygon, setPolygon] = useState(null);

  const loc = useLocation();

  const handleClose = () => {
    if (
      window.confirm("Are you sure you want to close?All data will be lost")
    ) {
      setOpen(false);
    }
  };

  const onDrawCreate = ({ features }) => {
    console.log(features[0].geometry.coordinates);
    const area = geolib.getAreaOfPolygon(features[0].geometry.coordinates);
    setPoly(features[0].geometry.coordinates[0]);
    setPolygon(features);

    setOpen(true);
  };
  let acre;
  let center;

  if (poly && poly.length > 0) {
    const area = geolib.getAreaOfPolygon(poly);
    acre = area / 4046.86;
    center = geolib.getCenter(poly);
  }
  console.log(acre, "acre");
  console.log(center, "center");

  const onDrawUpdate = ({ features }) => {
    console.log("features");
  };
  const fileSave = useSelector((state) => state.fileSave);

  const { file } = fileSave;

  // const mapboxStyles;

  const { palette } = useTheme();

  useEffect(() => {
    if (poly && poly.length >= 3) {
      const area = geolib.getAreaOfPolygon(poly);
      const acre = geolib.convertArea(area, "a");
    }
  }, [poly]);

  const fieldCreate = useSelector((state) => state.fieldCreate);
  const { loading, success, error } = fieldCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setOpen(false);

      dispatch({
        type: CREATE_FIELD_RESET,
      });
      toast("Field created successfully", {
        type: "success",
      });
    }
  }, [success, dispatch]);

  //submit form
  const handleSubmit = ({ name, crop, sowingDate, harvestDate }) => {
    dispatch(
      createField({
        name,
        crop,
        sowingDate,
        harvestDate,
        area: polygon,
        acres: acre,
        center,
      })
    );
  };

  return (
    <>
      <Container fluid>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "max-content",
              bgcolor: palette.secondary.main,
              p: 4,
              borderRadius: "1.5em",
              height: "max-content",
            }}
          >
            <>
              <Typography component={"h1"} variant="h5">
                Enter field details
              </Typography>

              <Grid container>
                <Form
                  initialValues={{
                    name: "",
                    crop: "",
                    sowingDate: "",
                    harvestDate: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Grid item xs={12}>
                    <InputComponent label={"name"} type="text" />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomDropDown
                      style={{
                        flexDiretion: "row",
                      }}
                      item={crops}
                      name="crop"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomDatePicker label="sowingDate" />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomDatePicker label="harvestDate" />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent="center"
                    alignContent={"center"}
                  >
                    <SubmitButton
                      style={{
                        marginTop: "10px",
                      }}
                      title={"Submit"}
                    />
                  </Grid>
                </Form>

                <Button
                  color="info"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                  }}
                  style={{
                    margin: "auto",
                  }}
                >
                  Close
                </Button>
              </Grid>
            </>
          </Box>
        </Modal>
      </Container>
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
        <Image 
        id="mike"
        url="https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/thumbnails/d9fb3a65fe42841d18ae06f945f4e50c-17ac6cfd89ec15941cddb68b3efb8169:getPixels"

        
        />
        
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
          <RotationControl position="bottom-left" />
        </div>
      </Map>
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
