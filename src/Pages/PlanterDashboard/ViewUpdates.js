import React, { useState , useEffect } from "react";
import './PlanterDashboard.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import axios from "axios";


export const ViewUpdates =()=>{

    const [values , setValues] = useState([])

    useEffect(() => {
      
        axios.get('http://127.0.0.1:8000/updates/')
        .then(res => {
            console.log(res.data)
            setValues(res.data)
            
        })
    
      
    }, [])
    
    return(
        <div>
           
            <div className="form">
            
            <div>
            {values.map((item) => (
        <table key={item.id} style={{ border: "1px solid black" , margin: "10px"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Estate Number</th>
              <th>Planter Name</th>
              <th>Collected Date</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>{item.estate_number}</td>
              <td>{item.planter_name}</td>
              <td>{item.collected_date}</td>
              <td>{item.weight}</td>
            </tr>
          </tbody>
        </table>
      ))}
            </div>
        </div>
        </div>
    );
}

export default ViewUpdates;