import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useFilePicker } from "use-file-picker";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Fade,
  Paper,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import {
  CloudOutlined,
  CollectionsOutlined,
  GrassOutlined,
  MapOutlined,
  SettingsOutlined,
  StorageOutlined,
  z,
} from "@mui/icons-material";
import DataManagerTab from "./DataMagerTab";
// box has already been declared
// import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { saveFile } from "../actions/fileActions";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

const RightSideBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // cannot redeclare open areound line 54
  // const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  let navigate = useNavigate();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const dispatch = useDispatch();

  const fileSave = useSelector((state) => state.fileSave);

  const { file } = fileSave;

  const { palette } = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openCollections, setOpenCollections] = React.useState(false);
  const handleOpenCollections = () => setOpenCollections(true);
  const handleCloseCollections = () => setOpenCollections(false);
  // const handleOpenCollections = () => setOpen(true);

  const [openManuals, setOpenManuals] = React.useState(false);
  const handleOpenManuals = () => setOpenManuals(true);
  const handleCloseManuals = () => setOpenManuals(false);

  const [ismanualModalVideoOpen, setmanualModalVideoOpen] =
    React.useState(false);
  //file selector
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    //accept kml csv tiff
    accept: ".kml, .csv, .tiff",
  });

  const [cropManualVideoId, setCropManualVideoId] = React.useState("");
  function handleCropManual(videoId) {
    setCropManualVideoId(videoId);
    console.log(
      "video id passed should be UBnX5TNoZjA. compare :",
      videoId,
      "const cropManualVideoId to change is ",
      cropManualVideoId,
      " there is a problem if they do not match up"
    );
  }

  useEffect(() => {
    if (filesContent) {
      dispatch(saveFile(filesContent));
    }
  }, [filesContent]);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1000",
        top: 100,
        backgroundColor: palette.secondary.main,
        borderRadius: 10,
        display: "flex",
        justifyContent: "space-evenly",
        height: "80vh",
        opacity: 0.8,
      }}
    >
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              left: 225,
              top: 135,
              bgcolor: "rgb(139, 195, 74)",
              width: 200,
              p: 1,
              borderRadius: 2,
              color: palette.background.default,
            }}
          >
            <List
              sx={{
                flexDirection: "column",
                pl: 1,
              }}
            >
              <ListItem button>
                <ListItemText
                  primary="View my fields"
                  color={palette.primary.main}
                />
              </ListItem>
              <ListItem onClick={() => openFileSelector()} button>
                <ListItemText
                  primary="Import file"
                  color={palette.primary.main}
                />
              </ListItem>
            </List>
          </Box>
        </Modal>
      </div>
      {/* FOR COLLECTIONS */}
      <div>
        <Modal
          open={openCollections}
          onClose={handleCloseCollections}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              left: "225px",
              top: "513px",
              bgcolor: "rgb(139, 195, 74)",
              width: 200,
              p: 1,
              borderRadius: 2,
              opacity: 0.8,
              color: palette.background.default,
            }}
          >
            <List
              sx={{
                flexDirection: "column",
                pl: 1,
              }}
            >
              <ListItem button>
                <ListItemText
                  primary="Create new"
                  color={palette.primary.main}
                />
              </ListItem>

              <ListItem button>
                <ListItemText
                  primary="View existing"
                  color={palette.primary.main}
                />
              </ListItem>

              <ListItem button>
                <ListItemText primary="Drafts" color={palette.primary.main} />
              </ListItem>

              <ListItem button>
                <ListItemText primary="Archived" color={palette.primary.main} />
              </ListItem>

              <ListItem button>
                <ListItemText
                  primary="Recently deleted"
                  color={palette.primary.main}
                />
              </ListItem>
            </List>
          </Box>
        </Modal>
      </div>
      {/* FOR CROP MANUALS */}
      <div>
        <Modal
          open={openManuals}
          onClose={handleCloseManuals}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              left: 225,
              top: 330,
              bgcolor: "rgb(139, 195, 74)",
              width: 200,
              p: 1,
              borderRadius: 2,
              color: palette.background.default,
            }}
          >
            <List
              sx={{
                flexDirection: "column",
                pl: 1,
              }}
            >
              <ListItem
                onClick={() => {
                  handleCropManual("UBnX5TNoZjA");
                  setmanualModalVideoOpen(true);
                }}
                button
              >
                <ListItemText primary="Peas" color={palette.primary.main} />
              </ListItem>

              <ListItem
                onClick={() => {
                  handleCropManual("k5knhlIE1_4");
                  setmanualModalVideoOpen(true);
                }}
                button
              >
                <ListItemText primary="Cabbages" color={palette.primary.main} />
              </ListItem>

              <ListItem
                onClick={() => {
                  handleCropManual("7LxpmjOhaqs");
                  setmanualModalVideoOpen(true);
                }}
                button
              >
                <ListItemText
                  primary="Peas, potatoes, beans mixed"
                  color={palette.primary.main}
                />
              </ListItem>
              <ListItem
                onClick={() => {
                  handleCropManual("ly6zhFAEVqY");
                  setmanualModalVideoOpen(true);
                }}
                button
              >
                <ListItemText
                  primary="Tree tomatoes"
                  color={palette.primary.main}
                />
              </ListItem>
              <ListItem
                onClick={() => {
                  handleCropManual("YnIKxyctFVw");
                  setmanualModalVideoOpen(true);
                }}
                button
              >
                <ListItemText primary="Carrots" color={palette.primary.main} />
              </ListItem>
              <ListItem
                onClick={() => {
                  handleCropManual("w2L4PPc4TV4");
                  setmanualModalVideoOpen(true);
                }}
                button
              >
                <ListItemText primary="Dairy cattle" color={palette.primary.main} />
              </ListItem>
            </List>
          </Box>
        </Modal>
      </div>
      <div>
        <ModalVideo
          channel="youtube"
          autoplay
          controls
          isOpen={ismanualModalVideoOpen}
          videoId={cropManualVideoId}
          onClose={() => setmanualModalVideoOpen(false)}
        />
      </div>
      <List
        sx={{
          flexDirection: "column",
          width: "fitContent",
          pl: 5,
        }}
      >
        <ListItem button sx={{}} onClick={handleOpen}>
          <ListItemIcon>
            <StorageOutlined style={{ color: palette.primary.contrastText }} />
          </ListItemIcon>
          <ListItemText
            primary="Data manager"
            style={{ color: palette.primary.contrastText }}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate("/weather");
          }}
          sx={{}}
        >
          <ListItemIcon>
            <CloudOutlined style={{ color: palette.primary.contrastText }} />
          </ListItemIcon>
          <ListItemText
            primary="Weather"
            style={{ color: palette.primary.contrastText }}
          />
        </ListItem>
        <ListItem button sx={{}} onClick={handleOpenManuals}>
          <ListItemIcon>
            <GrassOutlined
              sx={{
                fontSize: 40,
              }}
              fontSize="30px"
              style={{ color: palette.primary.contrastText }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Crop manuals"
            style={{ color: palette.primary.contrastText }}
          />
        </ListItem>
        <ListItem button sx={{}}>
          <ListItemIcon>
            <MapOutlined
              sx={{
                fontSize: 40,
              }}
              fontSize="30px"
              style={{ color: palette.primary.contrastText }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Vegetation map"
            style={{ color: palette.primary.contrastText }}
          />
        </ListItem>
        <ListItem onClick={handleOpenCollections} button sx={{}}>
          <ListItemIcon>
            <CollectionsOutlined
              sx={{
                fontSize: 40,
              }}
              fontSize="30px"
              style={{ color: palette.primary.contrastText }}
            />
          </ListItemIcon>
          <ListItemText
            primary="My collections"
            style={{ color: palette.primary.contrastText }}
          />
        </ListItem>
        {/* popper was here lol */}

        <ListItem button sx={{}}>
          <ListItemIcon>
            <SettingsOutlined
              sx={{
                fontSize: 40,
              }}
              fontSize="30px"
              style={{ color: palette.primary.contrastText }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            style={{ color: palette.primary.contrastText }}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default RightSideBar;
