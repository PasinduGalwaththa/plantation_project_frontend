import React, { useState } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import './UpdateForm.css';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import MaskedFormControl  from 'react-bootstrap-maskedinput';
import axios from "axios";

export const RegisterPlanter =()=>{

    const [validated, setValidated] = useState(false);
    const [inputss,setInputss]=useState({});
  
    const handleChange = (event) => {
      const id = event.target.id;
      const value = event.target.value;

      const onlyLetters = /^[A-Za-z]*$/;

  if (id === 'first_name' || id === 'last_name') {
    if (!value.match(onlyLetters)) {
      return; // Skip updating the state if input contains non-letter characters
    }
  }
      


      setInputss(values => ({...values, [id]: value}))}
      
  
   
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      setValidated(true);
      event.preventDefault();
      console.log(inputss);
     axios.post('http://127.0.0.1:8000/planter/' , inputss)
      .then (res => {
        alert(res.data)
        setInputss({});
       setValidated(false);
      }).catch (err => {
        console.error(err)
      })
    };
  
  

    return(
        <div className="form">
        <div>
          <Navbar />
        </div>
        <div className="formitems">
          <h2>Register planter by collector </h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <FormGroup as={Col} controlId="first_nmae">
                      
                <FloatingLabel controlId='first_name' label='First Name' className='mb-3'>
                <Form.Control
                    required
                    type="text"
                    
                    //id="first_name"
                    value={inputss.first_name || ""}
                    onChange={handleChange}
                    
                    placeholder="firstname"
                    autoComplete="first-name"
                    //defaultValue="Mark"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter first name here.
                  </Form.Control.Feedback>
                  </FloatingLabel>

                </FormGroup>
                <FormGroup as={Col} controlId="last_name">
                <FloatingLabel controlId='last_name' label='Last Name' className='mb-3'>
                <Form.Control
                    required
                    type="text"
                    //id="last_name"
                    value={inputss.last_name || ""}
                    onChange={handleChange}
                    
                    placeholder="lastname"
                    autoComplete="last-name"
                    //defaultValue="Mark"
                  
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter first name here.
                  </Form.Control.Feedback>
                  </FloatingLabel>

                </FormGroup>
                
                
              
              
                  
               

              
                
                

             

            </Row>
  
            <Row className="mb-3">
              <Form.Group as={Col} md="10" >
                <FloatingLabel controlId='address' label='Address' className='mb-3'>
               
                <Form.Control
                  required
                  type="text"
                  //id="address"
                  value={inputss.address || ""}
                  onChange={handleChange}
                  
                  placeholder="adress"
                  autoComplete="address"
                  // defaultValue="Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter name here.
                </Form.Control.Feedback>
                  
                </FloatingLabel>

               
              </Form.Group>
            </Row>
  
            <Row className="mb-3">
              <Form.Group as={Col} md="8" >
                <FloatingLabel controlId='telephone' label='telephone' className='mb-3'>
             
                
                  < MaskedFormControl


                    type="tel"
                    mask='1111111111'
                    //id="telephone"
                    placeholder="telephone"
                    autoComplete="telephone"
                    //pattern="07\d{8}"
                     
                    
                    //aria-describedby="inputGroupPrepend"
                    value={inputss.telephone || ""}
                    onChange={handleChange}
                    required
  
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid.
                  </Form.Control.Feedback>
                

                </FloatingLabel>
                
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="8" >
                <FloatingLabel controlId='estnumber' label='est number' className='mb-3'>
             
                
                  < MaskedFormControl


                    type="number"
                    mask='1111'
                    //id="telephone"
                    placeholder="est number"
                    autoComplete="est number"
                    //pattern="07\d{8}"
                     
                    
                    //aria-describedby="inputGroupPrepend"
                    value={inputss.estnumber || ""}
                    onChange={handleChange}
                    required
  
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid.
                  </Form.Control.Feedback>
                

                </FloatingLabel>
                
              </Form.Group>
            </Row>
  
            <Row className="mb-3">
              <Form.Group as={Col} md="8" >
                <FloatingLabel controlId='nic' label='NIC' className='mb-3'>
                
                
                  <MaskedFormControl
                    type="string"
                    mask='111111111V'
                    placeholder="NIC"
                    //id="nic"
                    autoComplete="nic"
                    //aria-describedby="inputGroupPrepend"
                    
                    value={inputss.nic || ""}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please ebnter weight here.
                  </Form.Control.Feedback>
                

                </FloatingLabel>
               
              </Form.Group>
            </Row>
            {/* <Form.Group className="mb-3">
              <Form.Check
                required
                label="rechecked"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group> */}
            <Button type="submit">Submit </Button>
          </Form>
        </div>
      </div>
    );
}

export default RegisterPlanter;