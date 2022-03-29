import { Button, FormControl } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const SubmitButton = ({ title,...otherProps }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <FormControl>
      <Button
      {...otherProps}
        size="large"
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        {title}
      </Button>
    </FormControl>
  );
};

export default SubmitButton;
