import React from "react";
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const ReadOnlyRow=({contact,handleEditClick,handleDeleteClick})=>{
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
    return(
        <tr >
          
             <td>{contact.collectionpointname}</td>
              
              <td>{contact.arrivaltime}</td>
              <td>
                <Button variant="outline-success" className="Eidt"type="button" onClick={(event)=>handleEditClick(event,contact)}>Edit</Button>
                <span style={{ margin: "0 5px" }}></span>
                <Button variant="outline-danger"  className="Delete" type="button" onClick={()=>handleDeleteClick(contact.id)}>Delete</Button>
              </td>
              <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>



        </tr>
       
    )
}

export default ReadOnlyRow