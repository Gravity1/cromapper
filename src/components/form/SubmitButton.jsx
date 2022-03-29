import { Button, FormControl } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <FormControl>
      <Button
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
