import React from 'react'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';


function ViewUpdates() {

  const { contextData } = useContext(AuthContext);

  const [updates, setUpdates] = React.useState([]);
  

  async function getUpdates(id) {
    try {
      const response1 = await axios.get(`http://127.0.0.1:8000/planter/id/${id}`);
      const planterId = response1.data.id;
      const response2 = await axios.get(`http://127.0.0.1:8000/updates/getbyidplanter/${planterId}`);
      console.log(response2.data);
      setUpdates(response2.data);
  
      // Further processing with the second response, if needed
      // ...
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  }
  

  useEffect(() => {
    getUpdates(contextData.user.userid);
  }, [])

  return (
    <>
    <div>ViewUpdates {contextData.user.userid}</div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Collected Date</th>
          <th>Collector</th>
          <th>Planter</th>
          <th>Weight</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        {updates.map((update, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{update.collected_date}</td>
            <td>{update.collector}</td>
            <td>{update.planter}</td>
            <td>{update.weight}</td>
            <td></td>
          </tr>
        ))}
        </tbody> 
    </Table> 
    </>
    

  )
}

export default ViewUpdates