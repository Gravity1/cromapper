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
  Popper,
  Fade,
  Paper,
  Grid,
  Typography,
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
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { saveFile } from "../actions/fileActions";

const RightSideBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
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

  //file selector
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    //accept kml csv tiff
    accept: ".kml, .csv, .tiff",
  });

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
        right: 0,
        top: 100,
        backgroundColor: palette.secondary.main,
        width: "20%",
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
              right: 280,
              top: 200,
              bgcolor: palette.background.default,
              width: 200,
              p: 1,
              borderRadius: 2,
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
      <List
        sx={{
          flexDirection: "column",
          width: "100%",
          pl: 5,
        }}
      >
        <ListItem
          button
          sx={{
            p: 20,
          }}
          onClick={handleOpen}
        >
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
          sx={{
            p: 20,
          }}
        >
          <ListItemIcon>
            <CloudOutlined style={{ color: palette.primary.contrastText }} />
          </ListItemIcon>
          <ListItemText
            primary="Weather"
            style={{ color: palette.primary.contrastText }}
          />
        </ListItem>
        <ListItem
          button
          sx={{
            p: 20,
          }}
        >
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
        <ListItem
          button
          sx={{
            p: 20,
          }}
        >
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
        <ListItem
          onClick={handleClick("right-start")}
          button
          sx={{
            p: 20,
          }}
        >
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
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography sx={{ p: 2 }}>View Existing</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <ListItem
          button
          sx={{
            p: 20,
          }}
        >
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
