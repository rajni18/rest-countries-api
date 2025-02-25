import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const [isDark, setIsDark] = useTheme();

  if (isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <>
      <header className={`${isDark ? "dark" : ""}`}>
        <div className="header-container">
          <div className="header-content">
            <div className="title">
              <a href="/">Where in the world?</a>
            </div>
            <div
              className="theme-changer"
              onClick={() => {
                setIsDark(!isDark);
                localStorage.setItem("isDark", !isDark);
              }}
            >
              <i className={`fa-solid fa-${isDark ? "sun" : "moon"}`}>
                &nbsp;&nbsp;{isDark ? "Light Mode" : "Dark Mode"}
              </i>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
