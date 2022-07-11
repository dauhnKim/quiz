import React from "react";
import ThemeToggle from "./ThemeToggle";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="dark:bg-black dark:text-white h-screen">
      <ThemeToggle />
      {children}
    </div>
  );
};

export default Layout;
