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
import PreviewIcon from '@mui/icons-material/Preview';
import LogoutIcon from '@mui/icons-material/Logout';
import { BrowserRouter, Link } from 'react-router-dom';
const App = () => {

  const { contextData } = useContext(AuthContext);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1" icon={<MenuRoundedIcon />}>
          
            <h2>Welcome </h2>
          </MenuItem>
          <MenuItem style={{ fontSize: "18px" }}  component={<Link to="/planterdashboard" className="link" />} icon={<SpeedOutlinedIcon/>}> Dashboard </MenuItem>
          <MenuItem style={{ fontSize: "18px" }} component={<Link to="/viewupdates" className="link" />} icon={<ViewListIcon/>} > View Updates</MenuItem>
          <MenuItem style={{ fontSize: "18px" }} component={<Link to="/prediction" className="link" />} icon={<QueryStatsIcon/>}> Payments </MenuItem>
          <MenuItem style={{ fontSize: "18px" }} component={<Link to="/weather" className="link" />} icon={<WbSunnyIcon/>}> Weather </MenuItem>
          <MenuItem style={{ fontSize: "18px" }} icon={<LogoutIcon/>} onClick={contextData.logOutUser}> Sign Out </MenuItem>
          
          
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
