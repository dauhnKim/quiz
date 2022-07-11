import { useState } from "react";
import { LightDarkToggle } from "react-light-dark-toggle";

import { useAtom } from "jotai";
import { isDarkAtom } from "../utils/store";

const ThemeToggle = () => {
  const [theme, setTheme] = useAtom(isDarkAtom);
  const [isDark, setIsDark] = useState<boolean>(theme === "dark" ? true : false);

  console.log("theme :>> ", theme);
  const darkModeHandler = () => {
    setIsDark(!isDark);
    theme === `light` ? setTheme(`dark`) : setTheme(`light`);
  };

  return <LightDarkToggle isLight={!isDark} onToggle={darkModeHandler} />;
};

export default ThemeToggle;
