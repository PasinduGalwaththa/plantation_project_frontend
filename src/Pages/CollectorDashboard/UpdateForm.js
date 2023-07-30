import React, { useState } from 'react';
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../Pages/context/AuthContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function UpdateForm() {
  const [validated, setValidated] = useState(false);
  const [planterId, setPlanterId] = useState(null);
  const [estateId, setEstateId] = useState(null);
  const [collectorId, setCollectorId] = useState(null);
  const [collectedDate, setCollectedDate] = useState('');
  const [weight, setWeight] = useState('');

  const [data, setData] = useState({});
  const { contextData } = useContext(AuthContext);

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
      }).catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="updateform">
      <div>collector {contextData.user.username}</div>
      <card className="transparent-card">
        <div className="container">
          <div className="formitems">
            <h2>Update collection</h2>
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
      </card>
    </div>
  );
}

export default UpdateForm;
