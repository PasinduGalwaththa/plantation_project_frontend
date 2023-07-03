import React, { useState, Fragment, useEffect } from "react";
import './UpdateForm.css';
import Navbar from "../../Components/Navbar/Navbar";
import moment from 'moment';
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import axios from "axios";
import "./SetArrivalscss.css"
import data from "./mock-data.json"
import ReadOnlyRow from "../../Components/ReadOnlyRow";
import EditableRow from "../../Components/EditableRow";

export const SetArrivals = () => {
  const [currentDay, setCurrentDay] = useState("");
  useEffect(() => {
    setCurrentDay(moment().format("dddd"));
  }, []);

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    collectionpointname: '',
    collectionpoint: '',
    arrivaltime: ''
  });

  const [editFormData, setEditFormData] = useState({
    collectionpointname: '',
    collectionpoint: '',
    arrivaltime: ''
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  }

  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      collectionpointname: addFormData.collectionpointname,
      collectionpoint: addFormData.collectionpoint,
      arrivaltime: addFormData.arrivaltime
    }

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);

    setAddFormData({
      collectionpointname: '',
      collectionpoint: '',
      arrivaltime: ''
    });
  };

  const handleEditformSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      collectionpointname: editFormData.collectionpointname,
      collectionpoint: editFormData.collectionpoint,
      arrivaltime: editFormData.arrivaltime
    }

    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null);
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      collectionpointname: contact.collectionpointname,
      collectionpoint: contact.collectionpoint,
      arrivaltime: contact.arrivaltime
    }
    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  }

  const contactsByDay = contacts.reduce((acc, contact) => {
    const day = moment(contact.arrivaltime, "HH:mm").format("dddd");
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(contact);
    return acc;
  }, {});

  return (
    <div className="form">
      <div><Navbar /></div>

      <div>
        <div className="div1"><h1>Set Arrivals by collector</h1></div>
        <div className="currentDay"><h2>{currentDay}</h2></div>

        <div className="addCollectionPoint">
          <h2>Add a collection point</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="collectionpointname"
              required
              placeholder="enter"
              onChange={handleAddFormChange}
              value={addFormData.collectionpointname}
            />
            <input
              type="number"
              name="collectionpoint"
              required
              placeholder="enter cp"
              onChange={handleAddFormChange}
              value={addFormData.collectionpoint}
            />
            <input
              type="time"
              name="arrivaltime"
              required
              placeholder="enter time"
              onChange={handleAddFormChange}
              value={addFormData.arrivaltime}
            />
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="app-container">
          {Object.entries(contactsByDay).map(([day, contacts]) => (
            <div key={day}>
              <Fragment>
                <h3>{day}</h3>
                {currentDay === day && (
                  <form onSubmit={handleEditformSubmit}>
                    <table>
                      <thead>
                        <tr>
                          <th>collectionpointname</th>
                          <th>collectionpoint</th>
                          <th>arrivaltime</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact, index) => (
                          <React.Fragment key={index}>
                            {editContactId === contact.id ? (
                              <EditableRow
                                editFormData={editFormData}
                                handleEditFormChange={handleEditFormChange}
                                handleCancelClick={handleCancelClick}
                              />
                            ) : (
                              <ReadOnlyRow
                                contact={contact}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </form>
                )}
              </Fragment>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SetArrivals;