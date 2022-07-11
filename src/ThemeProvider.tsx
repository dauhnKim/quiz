import React from "react";
import { useAtomValue } from "jotai";
import { isDarkAtom } from "./utils/store";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = useAtomValue(isDarkAtom);
  return <div className={`${theme}`}>{children}</div>;
};

export default ThemeProvider;
