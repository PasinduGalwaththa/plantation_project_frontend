import React, { useState } from 'react';
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../Pages/context/AuthContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import { Modal } from 'react-bootstrap'; 

function UpdateForm() {
  const [validated, setValidated] = useState(false);
  const [planterId, setPlanterId] = useState(null);
  const [estateId, setEstateId] = useState(null);
  const [collectorId, setCollectorId] = useState(null);
  const [collectedDate, setCollectedDate] = useState('');
  const [weight, setWeight] = useState('');

  const [data, setData] = useState({});
  const { contextData } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false); // State variable to control the modal visibility
  const [submittedDetails, setSubmittedDetails] = useState(null);

  function handleShowModal(details) {
    setSubmittedDetails(details);
    setShowModal(true);
  }

  const fetchData = async (estateNumber) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/planter/${estateNumber}/`);
      setData(response.data);
      if (response.data) {
        setPlanterId(response.data.id);
        setEstateId(response.data.estate);
        fetchCollecterID(contextData.user.userid);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCollecterID = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/collector/getbyid/${id}`);
      setCollectorId(response.data.id);
    } catch (error) {
      console.error(error);
    }
  };



  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'estate_number':
        setEstateId(value);
        break;
      case 'collected_date':
        setCollectedDate(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      default:
        break;
    }
  };

  const handleSearchClick = () => {
    fetchData(estateId);
    fetchCollecterID(contextData.user.userid);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const requestData = {
      estate: estateId,
      planter: planterId,
      collected_date: collectedDate,
      weight: weight,
      collector: collectorId,
    };

    axios.post('http://127.0.0.1:8000/updates/', requestData)
      .then(res => {
        alert(res.data);
        setEstateId(null);
        setPlanterId(null);
        setCollectedDate('');
        setWeight('');
        setValidated(false);
        handleShowModal(res.data);
      }).catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="updateform">
      <div><Navbar bg="light" variant="light" expand="lg" style={{ width: "205%" }}>
      <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
          <img
            src={process.env.PUBLIC_URL + '/ha.png'}
            alt="Logo"
            height="60"
            style={{ maxHeight: "100%", marginRight: "10px" }} // Adjust the height as needed
          />
          <div style={{ borderLeft: "2px solid #ccc", height: "60px", margin: "0 10px" }}></div>
          <h2 style={{ display: "inline", fontWeight: "bold" }}>Update collection</h2>
        </Navbar.Brand>
        


        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Navbar.Text style={{ whiteSpace: "nowrap" }}>collector <strong>{contextData.user.username}</strong></Navbar.Text>
        </Navbar.Collapse>
      </Navbar></div>
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-right">
      <Modal.Header closeButton>
        <Modal.Title>Submitted Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display the submitted details inside the modal */}
        <p>Estate Id: {submittedDetails?.estate}</p>
        <p>Planter Id: {submittedDetails?.planter}</p>
        <p>Collected Date: {submittedDetails?.collected_date}</p>
        <p>Weight: {submittedDetails?.weight}</p>
        {/* Add more details here if needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
        <div className="container">
        
          <div className="formitems">
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="estnum_search">
                <Form.Group as={Col} md="12">
                  <Form.Label>Estate Id</Form.Label>
                  <div className="estnum_search_estate">
                    <Form.Control
                      required
                      type="number"
                      id="estate_number"
                      value={estateId || ""}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter estate number here.
                    </Form.Control.Feedback>
                    <Button onClick={handleSearchClick}>Search</Button>
                  </div>
                </Form.Group>
              </div>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" >
                  <Form.Label>
                    {data && data.first_name ? data.first_name + " " + data.last_name : ""}
                    

                  </Form.Label>
                  <Form.Control type="hidden" id="first_name" value={data?.first_name || ''} />
                  <Form.Control type="hidden" id="last_name" value={data?.last_name || ''} />
                  
                  
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
                      value={collectedDate || ""}
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
                      value={weight || ""}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter weight here.
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
              <Button type="submit">Submit</Button>
            </Form>
          </div>
          <div>
          </div>
        </div>
    
    </div>
  );
}

export default UpdateForm;
