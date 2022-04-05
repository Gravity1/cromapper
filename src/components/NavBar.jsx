import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import mylog from "../images/logo.png";
import { Link, Modal } from "@mui/material";
import Form from "./form/Form";
import InputComponent from "./form/InputComponent";
import { CustomDropDown } from "./form/CustomDropDown";
import { roles } from "./../data/data";
import SubmitButton from "./form/SubmitButton";
import EditIcon from '@mui/icons-material/Edit';






const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleAccountOpen = () => {
    setAnchorElUser(null);
  }

  return (
    <AppBar position="static">
   
   
     <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              margin:"0 auto",
              bgcolor: "rgb(139, 195, 74)",
              width: "50%",
              p: 1,
              borderRadius: 2,
              color: "white",
              zIndex:999
            }}
          >
          <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* {error && (
                    <Alert severity="error" color="error">
                      {error}{" "}
                    </Alert>
                  )} */}
                 
                  <Form
                    // onSubmit={handleSubmit}
                    initialValues={{
                      name: "",
                      email: "",
                      password: "",
                      role: "",
                      phoneNumber: "",
                    }}
                    // validationSchema={validationSchema}
                  >
                  <Button variant="contained">
                  <EditIcon
                  color="#827717"
                  />
                  </Button>
                    <Typography variant="h4" style={{
                      color:"#827717",
                      fontWeight: "bold",
                      fontSize: "30px"}}>
                      Header Placeholder</Typography>
                    <InputComponent label="name" type="text" />
                    <InputComponent label="email" type="email" />
                    <InputComponent label="password" type="password" />
                    <CustomDropDown item={roles} name="role" />
                    <InputComponent label="phoneNumber" type="number" />
                    <SubmitButton title={`Submit`} />
                  </Form>
                  {/* <Typography variant="body1">
                    Already have an account?
                    <Link href="/" color="primary">
                      Sign In
                    </Link>
                  </Typography> */}
                </div>
          </Box>
        </Modal>


      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/home">
            <img
              src={mylog}
              style={{
                width: 60,
                height: 60,
                objectFit: "contain",
              }}
            />
          </Link>
          <Typography
            sx={{
              textTransform: "uppercase",
              flexGrow: 1,
              ml: 10,
            }}
            variant="h6"
          >
            Welcome to Cromap App
          </Typography>
          <div
            style={{
              position: "absolute",
              right: "0%",
            }}
          >
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, justifyContent: "flex-end" }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                {/* change to new fx to show sumn */}
                {/* Then show modal */}
                {/* add elements from sign up */}
                  <MenuItem onClick={
                    handleAccountOpen,
                    handleOpen
                    }>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
