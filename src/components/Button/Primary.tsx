import React from "react";
import { Button } from "@mui/material";

interface PrimaryProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Primary: React.FC<PrimaryProps> = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      size="large"
      sx={{
        borderColor: "rgb(229 231 235)",
        backgroundColor: "#171717",
        color: "rgb(209 213 219)",
        "&:hover": {
          color: "#00c896",
          borderColor: "#00c896",
          backgroundColor: "rgba(0, 200, 150, 0.1)",
        },
      }}
    >
      {text}
    </Button>
  );
};

export { Primary as PrimaryButton };
