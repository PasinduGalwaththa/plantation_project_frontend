import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Space } from 'antd';
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";


function ViewUpdates() {
  const { contextData } = useContext(AuthContext);
  const [updates, setUpdates] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  async function getUpdates(id) {
    try {
      const response1 = await axios.get(`http://127.0.0.1:8000/planter/id/${id}`);
      const planterId = response1.data.id;
      const response2 = await axios.get(`http://127.0.0.1:8000/updates/getbyidplanter/${planterId}`);
      setUpdates(response2.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUpdates(contextData.user.userid);
  }, []);


  return (
    <>
      <div>
      <div><Navbar bg="light" variant="light" expand="lg" style={{ width: "100%" }}>
      <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
          <img
            src={process.env.PUBLIC_URL + '/ha.png'}
            alt="Logo"
            height="60"
            style={{ maxHeight: "100%", marginRight: "10px" }} // Adjust the height as needed
          />
          <div style={{ borderLeft: "2px solid #ccc", height: "60px", margin: "0 10px" }}></div>
          <h2 style={{ display: "inline", fontWeight: "bold" }}>View Updates</h2>
        </Navbar.Brand>
        


        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Navbar.Text style={{ whiteSpace: "nowrap" }}>Planter <strong>{contextData.user.username}</strong></Navbar.Text>
        </Navbar.Collapse>
      </Navbar></div>

      <div style={{ paddingTop: "40px", maxHeight: "300px", overflowY: "auto"  }}>
      <Table striped bordered hover >
        <thead>
          <tr>
            
            <th style={{ fontSize: "18px" }}>Collected Date</th>
            <th style={{ fontSize: "18px" }}>Collector</th>
            <th style={{ fontSize: "18px" }}>Planter</th>
            <th style={{ fontSize: "18px" }}>Weight</th>
            
          </tr>
        </thead>
        <tbody>
          {updates.map((update, index) => (
            <tr key={index}>
              <td style={{ fontSize: "18px" }}>{update.collected_date}</td>
              <td style={{ fontSize: "18px" }}>{update.collector}</td>
              <td style={{ fontSize: "18px" }}>{update.planter}</td>
              <td style={{ fontSize: "18px" }}>{update.weight}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>


        
      </div>
      
      
      </div>
      
      
      
    </>
  );
}

export default ViewUpdates;
