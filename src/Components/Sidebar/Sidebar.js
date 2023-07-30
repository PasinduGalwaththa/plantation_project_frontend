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
import  { useContext} from "react";
import  AuthContext  from "../../Pages/context/AuthContext";

import { BrowserRouter, Link } from 'react-router-dom';
const App = () => {

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1" icon={<MenuRoundedIcon />}>
          <img margin src={process.env.PUBLIC_URL + '/logo.png'} alt="QuickPay Logo" style={{ width: "100px", height: "100px" }} />
            <h2>Welcome </h2>
          </MenuItem>
          <MenuItem component={<Link to="/planterdashboard" className="link" />} icon={<SpeedOutlinedIcon/>}> Dashboard </MenuItem>
          <MenuItem component={<Link to="/viewupdates" className="link" />} icon={<ViewListIcon/>} > View Updates</MenuItem>
          <MenuItem component={<Link to="/prediction" className="link" />} icon={<QueryStatsIcon/>}> Payments </MenuItem>
          <MenuItem component={<Link to="/weather" className="link" />} icon={<WbSunnyIcon/>}> Weather </MenuItem>
          
          
          
        </Menu>
      </Sidebar>
     
    </div>
  );
};

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//      <BrowserRouter> {/* Wrap the App component with BrowserRouter */}
//       <div>
//         <ProSidebarProvider>
//           <App />
//         </ProSidebarProvider>
//       </div>
//     </BrowserRouter>
//   </React.StrictMode>
// );

export default App;
