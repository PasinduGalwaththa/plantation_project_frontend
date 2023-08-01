import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import axios from "axios";
import { useEffect } from 'react';

export const RegisterPlanter = () => {
  const [validated, setValidated] = useState(false);
  const [estateDetails, setEstateDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputss, setInputss] = useState({
    first_name: "",
    last_name: "",
    address: "",
    telephone: "",
    email: "",
    estatename: "",
    nic: "",
    username: "",
    password: "",
    usertype: "planter",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputss(values => ({ ...values, [id]: value }));
  };

  async function getEstateDetails() {
    const response = await axios.get('http://127.0.0.1:8000/estate/getnymbers/');
    setEstateDetails(response.data);
  };

  useEffect(() => {
    getEstateDetails().then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(estateDetails);
  }, [estateDetails]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();

    // Find the selected estate details based on the user input
    const selectedEstate = estateDetails.find(estate => estate.estatename === inputss.estatename);

    const requestData = {
      first_name: inputss.first_name,
      last_name: inputss.last_name,
      address: inputss.address,
      telephone: inputss.telephone,
      email: inputss.email,
      estate: selectedEstate ? selectedEstate.id : "",
      nic: inputss.nic,
      username: inputss.username,
      password: inputss.password,
      usertype: "planter",
    };

    console.log(requestData);

    axios.post('http://127.0.0.1:8000/planter/add/', requestData)
      .then(res => {
        alert(res.data);
        setValidated(false);
      }).catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="form">
      <div className="formitems" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <FormGroup as={Col}>
              <FloatingLabel controlId='first_name' label='First Name' className='mb-3'>
                <Form.Control
                  required
                  type="text"
                  value={inputss.first_name || ""}
                  onChange={handleChange}
                  placeholder="First Name"
                  autoComplete="first-name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter first name here.
                </Form.Control.Feedback>
              </FloatingLabel>
            </FormGroup>
            <FormGroup as={Col}>
              <FloatingLabel controlId='last_name' label='Last Name' className='mb-3'>
                <Form.Control
                  required
                  type="text"
                  value={inputss.last_name || ""}
                  onChange={handleChange}
                  placeholder="Last Name"
                  autoComplete="last-name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter last name here.
                </Form.Control.Feedback>
              </FloatingLabel>
            </FormGroup>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="10">
              <FloatingLabel controlId='address' label='Address' className='mb-3'>
                <Form.Control
                  required
                  type="text"
                  value={inputss.address || ""}
                  onChange={handleChange}
                  placeholder="Address"
                  autoComplete="address"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter address here.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="8">
              <FloatingLabel controlId='telephone' label='Telephone' className='mb-3'>
                <MaskedFormControl
                  type="tel"
                  mask='1111111111'
                  placeholder="Telephone"
                  value={inputss.telephone || ""}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid telephone number.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="10">
              <FloatingLabel controlId='email' label='Email' className='mb-3'>
                <Form.Control
                  required
                  type="email"
                  value={inputss.email || ""}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="email"
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
                  list="estateOptions"
                  required
                  type="text"
                  value={inputss.estatename || ""}
                  onChange={handleChange}
                  placeholder="Estate Name"
                  autoComplete="estate-name"
                />
                <datalist id="estateOptions">
                  {estateDetails.map((estate, index) => (
                    <option key={index} value={estate.estatename} />
                  ))}
                </datalist>
                <Form.Control.Feedback type="invalid">
                  Please enter estate name here.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="8">
              <FloatingLabel controlId='nic' label='NIC' className='mb-3'>
                <MaskedFormControl
                  type="string"
                  mask='111111111V'
                  placeholder="NIC"
                  value={inputss.nic || ""}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter NIC here.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="10">
              <FloatingLabel controlId='username' label='Username' className='mb-3'>
                <Form.Control
                  required
                  type="username"
                  value={inputss.username || ""}
                  onChange={handleChange}
                  placeholder="Username"
                  autoComplete="username"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter username here.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="10">
              <FloatingLabel controlId='password' label='Password' className='mb-3'>
                <Form.Control
                  required
                  type="password"
                  value={inputss.password || ""}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="new-password"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password here.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPlanter;
