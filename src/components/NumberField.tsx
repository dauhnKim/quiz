import { TextField } from "@mui/material";
import React from "react";

interface FieldProps {
  amount?: number;
  theme?: string;
  [key: string]: any;
}

const NumberField: React.FC<FieldProps> = ({ amount, theme, ...rest }) => {
  const textColor = theme === "dark" ? "#00c896" : "#00a37a";
  const conditiaonlColor = +amount === 0 ? "#d32f2f" : textColor;
  const textFiledStyle = {
    marginTop: 2,
    input: {
      color: theme === "dark" ? "#eee" : "#777",
    },
    label: { color: "#737373" },
    ".MuiFormHelperText-root": { color: conditiaonlColor },
    "& label.Mui-focused": {
      color: conditiaonlColor,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: conditiaonlColor,
        color: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: conditiaonlColor,
      },
    },
  };

  return (
    <TextField
      data-testid="number-field"
      size="small"
      sx={textFiledStyle}
      label="number"
      type={"number"}
      value={amount}
      error={+amount === 0}
      helperText={+amount === 0 && "Enter a number greather than 0."}
      {...rest}
    />
  );
};

export default NumberField;
