import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import './Sidebar.css';

import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';;
const App = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1" icon={<MenuRoundedIcon />}>
             
            <h2>QUICKPAY</h2>
          </MenuItem>
          <MenuItem  icon={<SpeedOutlinedIcon/>}> Dashboard </MenuItem>
          <MenuItem icon={<ViewListIcon/>} > View Updates</MenuItem>
          <MenuItem icon={<QueryStatsIcon/>}> Predictions </MenuItem>
          <MenuItem icon={<WbSunnyIcon/>}> Weather </MenuItem>
          
        </Menu>
      </Sidebar>
      <h1>WELCOME TO QUICKPAY</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </div>
  </React.StrictMode>
);

export default App;
