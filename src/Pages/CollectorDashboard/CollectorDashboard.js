import React from "react";
import './UpdateForm.css';
import { useContext } from "react";
import  AuthContext  from "../../Pages/context/AuthContext";

export const CollectorDashboard =()=>{
    const {contextData } = useContext(AuthContext);
    console.log(contextData.user);
    return (
        <div className="form">

        
        
        <div>collector {contextData.user.username}</div>
        <div>{contextData.user.usertype}</div>
    </div>
    );
}

export default CollectorDashboard;