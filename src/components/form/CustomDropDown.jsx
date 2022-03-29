import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormikContext } from "formik";
import { Autocomplete, FormHelperText, TextField } from "@mui/material";
export const CustomDropDown = ({ name, item, ...otherProps }) => {
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext();

  return (
    <>
      <FormControl sx={{ mt: 2, mb: 2 }} fullWidth>
        {/* {item && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={item && item}
            value={values[name]}
            onChange={(e, value) => {
              setFieldValue(name, value);
            }}
            getOptionLabel={(option) => option.name || option.item}
            renderInput={(params) => (
              <TextField
                error={errors[name] && touched[name]}
                {...params}
                label={name}
              />
            )}
          />
        )} */}
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>

        <Select
          {...otherProps}
          onBlur={() => setFieldTouched(name)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values[name]}
          label={name}
          onChange={(e) => setFieldValue(name, e.target.value)}
          className="form-note-control-selection"
          error={touched[name] && !!errors[name]}
        >
          {item &&
            item.map((itm) => (
              <MenuItem selected value={itm._id || itm.value}>
                {itm.name ||
                  itm.item ||
                  itm.givenName ||
                  itm.title ||
                  itm.label ||
                  itm.firstName + " " + itm.lastName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {touched[name] && errors[name] && (
        <FormHelperText variant="outlined" error={true}>
          {" "}
          {errors[name]}{" "}
        </FormHelperText>
      )}
    </>
  );
};
