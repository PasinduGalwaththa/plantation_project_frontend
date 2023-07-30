import React from "react";
import { useEffect, useState  , useContext} from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap"; // Import react-bootstrap components
import './PlanterDashboard.css'
import  AuthContext from "../context/AuthContext";
import { Check , Close  } from "@mui/icons-material";

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
      <Button variant="primary" onClick={handleSubmit}>Get Payment</Button>
      {getPayment &&
      <>
        <div> 
            <h1>Payment Details</h1>
            <h3>Amount need to be paid: {paymentDetails.calculated_amount}</h3>
            <h3>Date: {paymentDetails.date}</h3>
            <h3>Gross Weight: {paymentDetails.gross_weight}</h3>
        </div> 
        </>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Planter</th>
            <th>Date</th>
            <th>Calculated Amount</th>
            <th>Gross Weight</th>
            <th>Got Paid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentRecords.map((paymentRecord, index) => (
            <tr key={paymentDetails.id}>
              <td>{index + 1}</td>
              <td>{paymentRecord.planter}</td>
              <td>{paymentRecord.date}</td>
              <td>{paymentRecord.calculated_amount}</td>
              <td>{paymentRecord.gross_weight}</td>
              <td>{paymentRecord.got_paid ? <Check/> : <Close/>}</td>
              <td><Button variant="outline-primary" onClick={() => handleClickReceived(paymentRecord.id)}>Received</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

       
    </div>
  );
}

export default Predictions;
