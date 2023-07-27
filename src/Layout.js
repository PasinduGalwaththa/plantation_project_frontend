import React, { useEffect } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Sidebar1 from "./Components/Sidebar/Sidebar1";
import { useContext } from "react";
import AuthContext from "./Pages/context/AuthContext";

const Layout = ({ children }) => 
{

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* {contextData.user.userType === "planter" ? <Sidebar /> : <Sidebar1/>} */}
      <Sidebar />
      <div style={{ flex: 1, padding: "16px" }}>{children}</div>
      {/* The children will be the content that you want to render in the middle */}
    </div>
  );
};

export default Layout;
