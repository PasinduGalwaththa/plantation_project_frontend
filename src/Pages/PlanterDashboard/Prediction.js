import React from "react";
import { useEffect, useState  , useContext} from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap"; // Import react-bootstrap components
import './PlanterDashboard.css'
import  AuthContext from "../context/AuthContext";
import { Check , Close  } from "@mui/icons-material";
import Navbar from "react-bootstrap/Navbar";
import { Card } from 'react-bootstrap';
import {  ListGroup } from "react-bootstrap";


export const Predictions = () => {

  const { contextData } = useContext(AuthContext);
  const [ paymentDetails, setPaymentDetails] = useState({});
  const [ getPayment, setGetPayment] = useState(false);
  const [ planterId, setPlanterId] = useState();
  const [ paymentRecords, setPaymentRecords] = useState([]);


  const  getPlanterID = (id) => {
    axios.get(`http://127.0.0.1:8000/planter/id/${id}/`)
    .then((res) => {
      setPlanterId(res.data.id);
    })
  }

  const getFormattedDate = () => {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
    const day = String(currentDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  };

  const getPaymentData = (id) => {
    axios.get(`http://127.0.0.1:8000/payments/planter/${id}/`)
      .then((res) => {
        setPaymentRecords(res.data);
      })
      .catch((error) => {
        console.log("Error fetching payment data:", error);
      });
  }


 async function postPaymentData(id) {
  console.log(id);
    try{
        const data = {
            "planter": planterId,
            "date": getFormattedDate(),
        }
        console.log(data);
        const response2 = await axios.post(`http://127.0.0.1:8000/payments/`, data);
        setPaymentDetails(response2.data);
        setGetPayment(true);
    }
    catch(error){
        console.log(error);
    }
    }




  useEffect(() => {
    getPlanterID(contextData.user.userid);

  }, [])

  useEffect(() => {
    if(planterId){
      getPaymentData(planterId);
      
    } 
  }, [planterId])

  const handleSubmit = (event) => {
    event.preventDefault();
    postPaymentData(contextData.user.userid);
  }

  const handleClickReceived = (id) => {
    updateGotpaid(id);
  }
  
  const updateGotpaid = (id) => {
    const data = {
      "got_paid": true,
    };
  
    axios.patch(`http://127.0.0.1:8000/payments/${id}/`, data)
      .then((res) => {
        // Optionally, you can update the paymentRecords state after the successful update.
        // For example, if you want to update the "got_paid" field in the table immediately.
        // Here, I'm assuming the response data has an updated field "got_paid" that indicates if it was updated successfully.
        const updatedRecords = paymentRecords.map((record) =>
          record.id === id ? { ...record, got_paid: res.data.got_paid } : record
        );
        setPaymentRecords(updatedRecords);
      })
      .catch((error) => {
        console.log("Error updating got_paid status:", error);
      });
  };
  
  
  
  
  return (
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
          <h2 style={{ display: "inline", fontWeight: "bold" }}>Payments</h2>
        </Navbar.Brand>
        


        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Navbar.Text style={{ whiteSpace: "nowrap" }}>Planter <strong>{contextData.user.username}</strong></Navbar.Text>
        </Navbar.Collapse>
      </Navbar></div>

      <div style={{ paddingTop: "20px" }}>
      <Button variant="primary" onClick={handleSubmit}>Get Payment</Button>
        
      </div>
     
      {getPayment && (
  <Card style={{ marginTop: "20px" }}>
    <Card.Body>
      <Card.Title>Payment Details</Card.Title>
      <ListGroup variant="flush">
            
            <ListGroup.Item style={{ fontSize: "18px" }}><strong>Date:</strong> {paymentDetails.date}</ListGroup.Item>
            <ListGroup.Item style={{ fontSize: "18px" }}><strong>Gross Weight:</strong> {paymentDetails.gross_weight}kg</ListGroup.Item>
            <ListGroup.Item style={{ fontSize: "18px" }}><strong>Amount need to be paid:</strong> Rs{paymentDetails.calculated_amount}</ListGroup.Item>
          </ListGroup>
      
    </Card.Body>
  </Card>
)}


        <div style={{ borderRadius: "10px", paddingTop: "20px", overflow: "hidden" }}>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ fontSize: "15px" }}>#</th>
            <th style={{ fontSize: "15px" }}>Planter</th>
            <th style={{ fontSize: "15px" }}>Date</th>
            <th style={{ fontSize: "15px" }}>Calculated Amount</th>
            <th style={{ fontSize: "15px" }}>Gross Weight</th>
            <th style={{ fontSize: "15px" }}>Got Paid</th>
            <th style={{ fontSize: "15px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentRecords.map((paymentRecord, index) => (
            <tr key={paymentDetails.id}>
              <td style={{ fontSize: "13px" }}>{index + 1}</td>
              <td style={{ fontSize: "13px" }}>{paymentRecord.planter}</td>
              <td style={{ fontSize: "13px" }}>{paymentRecord.date}</td>
              <td style={{ fontSize: "13px" }}>{paymentRecord.calculated_amount}</td>
              <td style={{ fontSize: "13px" }}>{paymentRecord.gross_weight}</td>
              <td style={{ fontSize: "13px" }}>{paymentRecord.got_paid ? <Check/> : <Close/>}</td>
              <td><Button variant="outline-primary" onClick={() => handleClickReceived(paymentRecord.id)}>Received</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

          
        </div>
      

        </div>
       
       
    </div>
  );
}

export default Predictions;
