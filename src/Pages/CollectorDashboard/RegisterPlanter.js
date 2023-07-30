import React, { useState } from 'react';


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
    const [inputss,setInputss]=useState({
      first_name: "",
        last_name: "",
        address: "",

       telephone: "",
       email: "",
       estatename: "",
       teatype: "",
        nic: "",
        
       
        
        username: "",
        password: "",
        usertype: "planter",
    });
  
    const handleChange = (event) => {
      const id = event.target.id;
      const value = event.target.value;

      const onlyLetters = /^[A-Za-z]*$/;

  if (id === 'first_name' || id === 'last_name') {
    if (!value.match(onlyLetters)) {
      return; // Skip updating the state if input contains non-letter characters
    }
  }

      


      setInputss(values => ({...values, [id]: value}))
      if (id === 'estate') {
        setInputss(values => ({ ...values, estate: value }));
      }
    }
      
      
  
   
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      setValidated(true);
      event.preventDefault();
      console.log(inputss);
      
     axios.post('http://127.0.0.1:8000/planter/planter/' , inputss)
      .then (res => {
        alert(res.data)
        // setInputss({});
       setValidated(false);
      }).catch (err => {
        console.error(err)
      })
    };
  
  

    return(
        <div className="form">
       
        <div className="formitems" style={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
          <h2>planter Registration</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <FormGroup as={Col} >
                      
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
                <FormGroup as={Col} >
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
              <Form.Group as={Col} md="10" >
                <FloatingLabel controlId='email' label='email' className='mb-3'>
               
                <Form.Control
                  required
                  type="email"
                  
                  value={inputss.email || ""}
                  onChange={handleChange}
                  
                  placeholder="email"
                  autoComplete="email"
                  // defaultValue="Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter email here.
                </Form.Control.Feedback>
                  
                </FloatingLabel>

               
              </Form.Group>
            </Row>
            


            <Row className="mb-3">
            <Form.Group as={Col} md="8">
              <FloatingLabel controlId='estatename' label='Estate Name' className='mb-3'>
                <Form.Control
                  required
                  type="text"
                  value={inputss.estatename || ""}
                  onChange={handleChange}
                  placeholder="estate name"
                  autoComplete="estate name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter estate name here.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
              <Form.Group as={Col} md="8">
              <FloatingLabel controlId='teatype' label='Tea Type' className='mb-3'>
                <Form.Control
                  required
                  type="text"

                  value={inputss.teatype || ""}
                  onChange={handleChange}
                  placeholder="tea type"
                  autoComplete="tea type"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter tea type here.
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

            <Row className="mb-3">
              <Form.Group as={Col} md="10" >
                <FloatingLabel controlId='username' label='username' className='mb-3'>
               
                <Form.Control
                  required
                  type="username"
                  
                  value={inputss.username || ""}
                  onChange={handleChange}
                  
                  placeholder="username"
                  autoComplete="usename"
                  // defaultValue="Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter name here.
                </Form.Control.Feedback>
                  
                </FloatingLabel>

               
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="10" >
                <FloatingLabel controlId='password' label='password' className='mb-3'>
               
                <Form.Control
                  required
                  type="password"
                  
                  value={inputss.password || ""}
                  onChange={handleChange}
                  
                  placeholder="password"
                  autoComplete="password"
                  // defaultValue="Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter name here.
                </Form.Control.Feedback>
                  
                </FloatingLabel>

               
              </Form.Group>
            </Row>
           
            <Button type="submit">Submit </Button>
          </Form>
          
        </div>
        
        
        
      </div>

     
    );
}

export default RegisterPlanter;