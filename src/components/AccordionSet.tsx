import React, { ReactNode } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

import { useAtomValue } from "jotai";
import { themeAtom } from "../utils/store";

interface Props {
  title: string;
  children: ReactNode;
}

const AccordionSet: React.FC<Props> = ({ title, children }) => {
  const theme = useAtomValue(themeAtom);

  return (
    <Accordion className="p-2" sx={{ backgroundColor: "transparent", color: "inherit", boxShadow: "rgba(100, 100, 111, 0.2) 0px 0px 40px 9px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme === "dark" ? "white" : "#777" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className="!font-extralight">{title}</Typography>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionSet;
