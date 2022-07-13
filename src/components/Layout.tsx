import React from "react";
import StopWatch from "./StopWatch";
import ThemeToggle from "./ThemeToggle";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="dark:bg-[#0c0c0c] dark:text-[#fafafa] h-screen w-screen flex items-center justify-center">
      <div className="absolute right-5 top-5 flex items-center space-x-5">
        <StopWatch />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-[600px]">{children}</div>
    </div>
  );
};

export default Layout;
