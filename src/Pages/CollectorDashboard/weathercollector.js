import React from 'react'
import { useContext } from "react";
import  AuthContext  from "../../Pages/context/AuthContext";

export default function weathercollector() {
  const {contextData } = useContext(AuthContext);
  return (
    <div>
      <div>collector {contextData.user.username}</div>
        <div>weathercollector</div>

    </div>
    
  )
}
