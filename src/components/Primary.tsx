import React from "react";
import { Button } from "@mui/material";
import { useAtomValue } from "jotai";

import { themeAtom } from "../utils/store";
import { PrimaryProps } from "../utils/metrics";

const Primary: React.FC<PrimaryProps> = ({ text, className, type, onClick }) => {
  const theme = useAtomValue(themeAtom);
  return (
    <Button
      variant="outlined"
      size="large"
      sx={
        theme === "dark"
          ? {
              borderColor: "rgb(229 231 235)",
              backgroundColor: "#171717",
              color: "rgb(209 213 219)",
              "&:hover": {
                color: "#00c896",
                borderColor: "#00c896",
                backgroundColor: "rgba(0, 200, 150, 0.1)",
              },
            }
          : {
              borderColor: "black",
              color: "black",
              "&:hover": {
                color: "#00a37a",
                borderColor: "#00a37a",
                backgroundColor: "rgba(0, 200, 150, 0.1)",
              },
            }
      }
      onClick={onClick}
      type={type}
      className={className}
    >
      {text}
    </Button>
  );
};

export { Primary as PrimaryButton };
