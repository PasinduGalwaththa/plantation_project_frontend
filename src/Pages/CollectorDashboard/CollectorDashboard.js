import React from "react";
import './UpdateForm.css';
import { useContext } from "react";
import  AuthContext  from "../../Pages/context/AuthContext";
import Navbar from "react-bootstrap/Navbar";

export const CollectorDashboard =()=>{
    const {contextData } = useContext(AuthContext);
    console.log(contextData.user);
    return (
        <div className="form">
            <div><Navbar bg="light" variant="light" expand="lg" style={{ width: "100%" }}>
      <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
          <img
            src={process.env.PUBLIC_URL + '/ha.png'}
            alt="Logo"
            height="60"
            style={{ maxHeight: "100%", marginRight: "10px" }} // Adjust the height as needed
          />
          <div style={{ borderLeft: "2px solid #ccc", height: "60px", margin: "0 10px" }}></div>
          <h2 style={{ display: "inline", fontWeight: "bold" }}>Collector Dashboard </h2>
        </Navbar.Brand>
        


        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Navbar.Text style={{ whiteSpace: "nowrap" }}>collector <strong>{contextData.user.username}</strong></Navbar.Text>
        </Navbar.Collapse>
      </Navbar></div>

        
        
        
    </div>
    );
}

export default CollectorDashboard;