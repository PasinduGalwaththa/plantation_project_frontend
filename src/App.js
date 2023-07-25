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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CollectorDashboard/>}/>
        
        <Route path='/planterdashboard' element={<PlanterDashboard/>}/>
        <Route path='/updatefrom' element={<UpdateForm/>}/>
        <Route path='/registerplanter' element={<RegisterPlanter/>}/>
        <Route path='/weather' element={<Geolocation/>}/>
        <Route path='/setarrivals' element={<SetArrivals/>}/>
        <Route path='/prediction' element={<Predictions/>}/>
        <Route path='/viewupdates' element={<ViewUpdates/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/weather' element={<Login/>}/>
        <Route path='/collectordashboard' element={<CollectorDashboard/>}/>
        <Route path='/viewupdatescollector' element={<ViewUpdatescollector />} />

        

        
        


        
        

        
      </Routes>
    </Router>
  );
}

export default App;
