import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children}) => {
    let {contextData} = useContext(AuthContext)
    if (contextData.user) {
        return <>{children}</>
      } else {
        
        return <Navigate to="/" replace/>
      }
}

export default PrivateRoute;