import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CollectorDashboard from "../src/Pages/CollectorDashboard/CollectorDashboard";
import PlanterDashboard  from "../src/Pages/PlanterDashboard/PlanterDashboard";
import UpdateForm from "../src/Pages/CollectorDashboard/UpdateForm";
import RegisterPlanter from './Pages/CollectorDashboard/RegisterPlanter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CollectorDashboard/>}/>
        
        <Route path='/planterdashboard' element={<PlanterDashboard/>}/>
        <Route path='/updatefrom' element={<UpdateForm/>}/>
        <Route path='/registerplanter' element={<RegisterPlanter/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
