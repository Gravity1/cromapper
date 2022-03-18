import React from "react";
import { useTheme } from "@emotion/react";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CloudOutlined,
  CollectionsOutlined,
  GrassOutlined,
  MapOutlined,
  SettingsOutlined,
  StorageOutlined,
} from "@mui/icons-material";
const RightSideBar = () => {
  const { palette } = useTheme();
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1000",
        left: 20,
        top: 100,
        backgroundColor: palette.secondary.main,
        width: "20%",
        borderRadius: 10,
        display: "flex",
        justifyContent: "space-evenly",
        height: "80vh",
      }}
    >
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
