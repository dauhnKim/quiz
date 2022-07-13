import { useState } from "react";
import { LightDarkToggle } from "react-light-dark-toggle";

import { useAtom } from "jotai";
import { themeAtom } from "../utils/store";

const ThemeToggle = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [isDark, setIsDark] = useState<boolean>(theme === "dark" ? true : false);

  const darkModeHandler = () => {
    setIsDark(!isDark);
    theme === `light` ? setTheme(`dark`) : setTheme(`light`);
  };

  return <LightDarkToggle isLight={!isDark} onToggle={darkModeHandler} />;
};

export default ThemeToggle;
