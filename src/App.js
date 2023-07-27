import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CollectorDashboard from "../src/Pages/CollectorDashboard/CollectorDashboard";
import PlanterDashboard  from "../src/Pages/PlanterDashboard/PlanterDashboard";
import UpdateForm from "../src/Pages/CollectorDashboard/UpdateForm";
import RegisterPlanter from './Pages/CollectorDashboard/RegisterPlanter';
import SetArrivals from './Pages/CollectorDashboard/SetArrivals';
import Predictions from './Pages/PlanterDashboard/Prediction';
import ViewUpdates from './Pages/PlanterDashboard/ViewUpdates';
import Login from './Pages/Login/Login';
import ViewUpdatescollector from './Pages/CollectorDashboard/ViewUpdatescollector';

import 'bootstrap/dist/css/bootstrap.min.css';
//import WeatherAPI from './Components/WeatherAPI';
import Geolocation from './Components/Geolocation';
import PrivateRoute from './Pages/utils/PrivateRoute.js';
import { AuthProvider } from './Pages/context/AuthContext';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Login/>}/>
        
        <Route path='/planterdashboard' element={<PrivateRoute><Layout><PlanterDashboard/></Layout></PrivateRoute>}/>
        <Route path='/updatefrom' element={<PrivateRoute><UpdateForm/></PrivateRoute>}/>
        <Route path='/registerplanter' element={<PrivateRoute><RegisterPlanter/></PrivateRoute>}/>
        <Route path='/weather' element={<PrivateRoute><Geolocation/></PrivateRoute>}/>
        <Route path='/setarrivals' element={<PrivateRoute><SetArrivals/></PrivateRoute>}/>
        <Route path='/prediction' element={<PrivateRoute><Predictions/></PrivateRoute>}/>
        <Route path='/viewupdates' element={<PrivateRoute><ViewUpdates/></PrivateRoute>}/>
        <Route path='/collectordashboard' element={<PrivateRoute><CollectorDashboard/></PrivateRoute>}/>
        <Route path='/viewupdatescollector' element={<PrivateRoute><ViewUpdatescollector /></PrivateRoute>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
