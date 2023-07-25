import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Sidebar1 from '../../Components/Sidebar/Sidebar1'

import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from "react";
import { Sidebar } from "react-pro-sidebar";


function UpdateForm() {
  const [validated, setValidated] = useState(false);
  const [inputs,setInputs]=useState({});

  const [data, setData] = useState([]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  const fetchData = async (estateNumber) => {

    try {
      const response = await axios.get(`http://127.0.0.1:8000/planter/${estateNumber}`);
      setData(response.data);
      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };
  

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setInputs(values => ({...values, [id]: value}))
  }

  const handleSearchClick = () => {
    fetchData(inputs.estate_number);
    
}

 

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setValidated(true);
    event.preventDefault();
    console.log(inputs);
    axios.post('http://127.0.0.1:8000/updates/' , inputs)
    .then (res => {
      alert(res.data)
      setInputs({});
      setValidated(false);
    }).catch (err => {
      console.error(err)
    })
  };


  return (
    <div className="updateform">
      <div><Sidebar1/></div>
      <div className="container">   
      <div className="formitems">
        <h2>Update collection</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="estnum_search">
                <Form.Group as={Col} md="7">
                  <Form.Label>Estate Number</Form.Label>
                  <di className="estnum_search_estate">
                  <Form.Control
                    required
                    type="number"
                    id="estate_number"
                    value={inputs.estate_number || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter estate number here.
                  </Form.Control.Feedback>
                  <Button onClick={handleSearchClick}>Search</Button>
                  </di>
                  
                </Form.Group>
      

         </div>          

          <Row className="mb-3">
            <Form.Group as={Col} md="10" >
              <Form.Label>{data.first_name ? data.first_name  + " " + data.last_name : ""}</Form.Label>
              {/* <Form.Control
                required
                type="text"
                id="planter_name"
                value={inputs.planter_name || ""}
                onChange={handleChange}
                pattern="^[A-Za-z]+$"
                //placeholder="Planter Name"
                // defaultValue="Name"
              /> */}
              <Form.Control.Feedback type="invalid">
                Please enter name here.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="8" >
              <Form.Label>Date</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="date"
                  id="collected_date"
                  placeholder="date"
                  aria-describedby="inputGroupPrepend"
                  value={inputs.collected_date || ""}
                  onChange={handleChange}
                  required

                />
                <Form.Control.Feedback type="invalid">
                  Please choose a date.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" >
              <Form.Label>Weight</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="number"
                  placeholder="weight"
                  id="weight"
                  aria-describedby="inputGroupPrepend"
                  value={inputs.weight || ""}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please ebnter weight here.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            {/* <Form.Check
              required
              label="rechecked"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            /> */}
          </Form.Group>
          <Button type="submit">Submit </Button>
        </Form>
      </div>
      <div>
        pasindu
      </div>
      </div>

   
    </div>

  );
}

export default UpdateForm;
