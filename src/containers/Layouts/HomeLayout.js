import React from "react";
import LoginPopup from "../Auth/LoginPopup";
import { Header } from "../../components/Common/Header";
import { Footer } from "../../components/Common/Footer";
export const HomeLayout = ({ children }) => {
  return (
    <div className="wrraper-layout">
      <Header />
      <LoginPopup />
      {children}
      <Footer />
    </div>
  );
};
