import React from "react";
import headerLogo from "../images/logo.png";
import "../blocks/header.css";

function AppHeader() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Logo header" className="header__logo" />
      <div className="header__line"></div>
    </header>
  );
}

export default AppHeader;
