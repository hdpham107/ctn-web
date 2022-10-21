import React from "react";
import LoginPopup from "../Auth/LoginPopup";
import { Header } from "../../components/Common/Header";
export const HeaderLayout = ({ children }) => {
  return (
    <div className="wrraper-layout">
      <Header />
      <LoginPopup />
      {children}
    </div>
  );
};
