import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CollectorDashboard from "../src/Pages/CollectorDashboard/CollectorDashboard";
import PlanterDashboard  from "../src/Pages/PlanterDashboard/PlanterDashboard";
import UpdateForm from "../src/Pages/CollectorDashboard/UpdateForm";
import RegisterPlanter from './Pages/PlanterDashboard/RegisterPlanter';
import SetArrivals from './Pages/CollectorDashboard/SetArrivals';
import Predictions from './Pages/PlanterDashboard/Prediction';
import ViewUpdates from './Pages/PlanterDashboard/ViewUpdates/ViewUpdates';
import Login from './Pages/Login/Login';
import ViewUpdatescollector from './Pages/CollectorDashboard/ViewUpdatescollector';

import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Components/WeatherAPI';
import Geolocation from './Components/Geolocation';
import PrivateRoute from './Pages/utils/PrivateRoute.js';
import { AuthProvider } from './Pages/context/AuthContext';
import Layout from './Layout';
import RegisterCollector from './Pages/CollectorDashboard/RegisterCollector';
import PaymentsCollector from './Pages/CollectorDashboard/PaymentsCollector';
import Registration from './Pages/registration';


function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Login/>}/>
        
        <Route path='/planterdashboard' element={<PrivateRoute><Layout><PlanterDashboard/></Layout></PrivateRoute>}/>
        <Route path='/updatefrom' element={<PrivateRoute><Layout><UpdateForm/></Layout></PrivateRoute>}/>
        <Route path='/registerplanter' element={<RegisterPlanter/>}/>
        <Route path='/weatherplanter' element={<PrivateRoute><Layout><Weather/></Layout></PrivateRoute>}/>
        <Route path='/setarrivals' element={<PrivateRoute><Layout><SetArrivals/></Layout></PrivateRoute>}/>
        <Route path='/prediction' element={<PrivateRoute><Layout><Predictions/></Layout></PrivateRoute>}/>
        <Route path='/viewupdates' element={<PrivateRoute><Layout><ViewUpdates/></Layout></PrivateRoute>}/>
        <Route path='/collectordashboard' element={<PrivateRoute><Layout><CollectorDashboard/></Layout></PrivateRoute>}/>
        <Route path='/viewupdatescollector' element={<PrivateRoute><Layout><ViewUpdatescollector /></Layout></PrivateRoute>} />
        <Route path='/paymenttransfer' element={<PrivateRoute><Layout><PaymentsCollector/></Layout></PrivateRoute>} />
        <Route path='/registercollector' element={<RegisterCollector/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        
        
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
