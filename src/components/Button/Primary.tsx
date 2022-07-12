import React from "react";
import { Button, ButtonTypeMap, ExtendButtonBase } from "@mui/material";

interface PrimaryProps {
  text: string;
  className?: string;
  type?: "submit" | "button" | undefined;
  onClick: () => void;
}

const Primary: React.FC<PrimaryProps> = ({ text, className, type, onClick }) => {
  return (
    <Button
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
      onClick={onClick}
      type={type}
      className={className}
    >
      {text}
    </Button>
  );
};

export { Primary as PrimaryButton };
