import React from "react";

const EditableRow=({editFormData,handleEditFormChange,handleCancelClick})=>{
    return(
        <tr>
            <td>
                <input
                type="text"
                required
                placeholder="enter cpn"
                name="collectionpointname"
                value={editFormData.collectionpointname}
                onChange={handleEditFormChange}
                
                />
            </td>
            <td>
            <input
                type="number"
                required
                placeholder="enter cp"
                name="collectionpoint"
                value={editFormData.collectionpoint}
                onChange={handleEditFormChange}
                />

            </td>
            <td>
            <input
                type="time"
                required
                placeholder="enter at"
                name="arrivaltime"
                value={editFormData.arrivaltime}
                onChange={handleEditFormChange}
                />
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
      

    )
}

export default EditableRow