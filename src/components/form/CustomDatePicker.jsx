import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useFormikContext } from "formik";
import { FormHelperText } from "@mui/material";

export default function CustomDatePicker({ label }) {
  const [value, setValue] = React.useState(null);
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext();

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        showTodayButton={false}
        label={label}
        onBlur={() => setFieldTouched(label, true)}
        value={values[label]}
        onChange={(e) => setFieldValue(label, e)}
        renderInput={(params) => <TextField {...params} />}
      />
      {touched[label] && errors[label] && (
        <FormHelperText variant="outlined" error={true}>
          {errors[label]}
        </FormHelperText>
      )}
    </LocalizationProvider>
  );
}
