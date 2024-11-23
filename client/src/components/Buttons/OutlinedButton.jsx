import { Button } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const OutlinedButton = ({ sx = {}, arrow, arrowRev, children, fit, ...props }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: 2,
        color: "text.primary",
        borderColor: "text.primary",
        width: fit ? "fit-content" : "100%",
        ...sx,
      }}
      {...props}
    > {arrowRev && <KeyboardArrowLeftIcon fontSize="small" />}
      {children}
      {arrow && <KeyboardArrowRightIcon fontSize="small" sx={{ ml: 0.5 }} />}
    </Button>
  );
};

export default OutlinedButton;