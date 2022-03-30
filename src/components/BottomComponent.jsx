import React from "react";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Form from "./form/Form";
import * as Yup from "yup";
import { CustomDropDown } from "./form/CustomDropDown";
import { indeces } from "../data/data";
import CustomDatePicker from "./form/CustomDatePicker";
import moment from "moment";

const validationSchema = Yup.object().shape({
  dateStart: Yup.string().required("Required"),
  dateEnd: Yup.string().required("Required"),
  index: Yup.string().required("Required"),
});

const BottomComponent = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: palette.secondary.main,
        color: palette.secondary,
        p: 3,
        textAlign: "center",
        borderColor: palette.secondary,
        "&:hover": {
          cursor: "pointer",
        },
        height: "18rem",
        opacity: 0.8,
      }}
    >
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Box></Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Form
                validationSchema={validationSchema}
                initialValues={{
                  dateStart: "",
                  dateEnd: "",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CustomDropDown item={indeces} name="index" />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomDatePicker maxDate={moment()} label={"dateStart"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomDatePicker maxDate={moment()} label={"dateEnd"} />
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BottomComponent;
