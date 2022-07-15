import React from "react";
import StopWatch from "./StopWatch";
import ThemeToggle from "./ThemeToggle";

interface Props {
  children: React.ReactNode;
}

const url = "https://www.classting.com/";

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="dark:bg-[#0c0c0c] dark:text-[#fafafa] h-full min-h-screen w-screen flex items-center justify-center flex-col relative">
      <img src="/assets/classting_logo.png" alt="logo" className="h-10 w-10 absolute left-5 top-5 cursor-pointer" onClick={() => window.open(url, "_blank", "noopener,noreferrer")} />
      <div className="absolute right-5 top-5 flex items-center space-x-5">
        <StopWatch />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-[400px] pb-24">{children}</div>

      <footer className="absolute bottom-10 dark:text-[#ddd] text-[#777]">Copyright &copy; Quiz. All Rights Reserved.{new Date().getFullYear()}</footer>
    </div>
  );
};

export default Layout;
