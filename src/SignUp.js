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
import { register } from "./actions/userActions";
import InputComponent from "./components/form/InputComponent";
import SubmitButton from "./components/form/SubmitButton";
import Form from "./components/form/Form";
import { CustomDropDown } from "./components/form/CustomDropDown";
import { roles } from "./data/data";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").label("Name ").min(4),
  email: Yup.string().required("Email is requored").label("Email ").email(),
  password: Yup.string()
    .required("Password is required")
    .label("Password")
    .min(4),
  role: Yup.string().required("Role is required").label("Role"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number is not valid"),
});
const SignUp = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error, userInfo } = userRegister;

  if (userInfo) {
    navigate("/home", { replace: true });
    toast(`Logged in as ${userInfo.name}`);
  }

  useEffect(() => {
    if (success) {
      navigate("/home", { replace: true });
    }
  }, [userInfo, navigate, success, dispatch]);

  const handleSubmit = async ({ name, email, password, role, phoneNumber }) => {
    dispatch(register(name, email, password, role, phoneNumber));
  };

  return (
    <div
      style={{
        backgroundColor: palette.primary.main,
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
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
              variant=""
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
                      color: palette.primary.main,
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    Sign up for an account
                  </Typography>
                  <Form
                    onSubmit={handleSubmit}
                    initialValues={{
                      name: "",
                      email: "",
                      password: "",
                      role: "",
                      phoneNumber: "",
                    }}
                    validationSchema={validationSchema}
                  >
                    <InputComponent label="name" type="text" />
                    <InputComponent label="email" type="email" />
                    <InputComponent label="password" type="password" />
                    <CustomDropDown item={roles} name="role" />
                    <InputComponent label="phoneNumber" type="number" />
                    <SubmitButton title={`Register`} />
                  </Form>
                  <Typography variant="body1">
                    Already have an account?
                    <Link href="/" color="primary">
                      Sign In
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

export default SignUp;
