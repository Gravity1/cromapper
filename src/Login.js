import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@emotion/react";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Backdrop,
  Card,
  CardContent,
  CircularProgress,
  FormHelperText,
  Link,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Form from "./components/form/Form";
import InputComponent from "./components/form/InputComponent";
import SubmitButton from "./components/form/SubmitButton";
import { login } from "./actions/userActions";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label("Email").email(),
  password: Yup.string().required().label("Password").min(4),
});
const Login = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, success, error, userInfo } = userLogin;

  if (userInfo) {
    navigate("/home", { replace: true });
    toast(`Logged in as ${userInfo.name}`);
  }

  useEffect(() => {
    if (success) {
      navigate("/home", { replace: true });
    }
  }, [userInfo, navigate, success, dispatch]);

  const handleSubmit = async ({ email, password }) => {
    dispatch(login(email, password));
  };

  //digital clock

  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: palette.primary.main,
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
      className="LoginApp"
    >
      <Container maxWidth="sm">
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid item xs={12} md={12} m={"auto"}>
            <Card
              sx={{
                backgroundColor: palette.primary.contrastText,
              }}
            >
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {error && (
                    <Alert severity="error" color="error">
                      {error}{" "}
                    </Alert>
                  )}
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    Login
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    {time}
                  </Typography>
                  <Form
                    onSubmit={handleSubmit}
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                  >
                    <InputComponent label="email" type="email" />
                    <InputComponent label="password" type="password" />
                    <SubmitButton title={`Login`} />
                  </Form>
                  <Typography variant="body1">
                    Don't have an account?
                    <Link href="/signup" color="primary">
                      Sign Up
                    </Link>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
