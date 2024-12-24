
import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ExternalLayout from './layouts/ExternalLayout';
import InternalLayout from './layouts/InternalLayout';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div>
       <Router>
             <Routes>
                <Route path='/' element={<ExternalLayout/>}/>
                <Route path='/visitors/*' element={<ExternalLayout/>}/>
                <Route path='/bankloan/*' element={<InternalLayout/>}/>
              
              </Routes>
       </Router>
    </div>
  );
}

export default App;
