import React, { useEffect } from 'react'
import { useContext } from "react";
import  AuthContext  from "../../Pages/context/AuthContext";

export default function PlanterDashboard() {
  const {contextData } = useContext(AuthContext);
  console.log(contextData.user);


  return (
    <div>
        <div>planter {contextData.user.username}</div>
    </div>
  )
}
