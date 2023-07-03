import React from "react";

const ReadOnlyRow=({contact,handleEditClick,handleDeleteClick})=>{
    return(
        <tr >
             <td>{contact.collectionpointname}</td>
              <td>{contact.collectionpoint}</td>
              <td>{contact.arrivaltime}</td>
              <td>
                <button className="Eidt"type="button" onClick={(event)=>handleEditClick(event,contact)}>Edit</button>
                <button className="Delete" type="button" onClick={()=>handleDeleteClick(contact.id)}>Delete</button>
              </td>



        </tr>
       
    )
}

export default ReadOnlyRow