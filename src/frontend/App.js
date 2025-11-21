// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegularisationPage from './divisionpa/divisionpa.js';
import HeadPage from './divisionhead/divisionhead.js';
import AdminPage from './admin/admin.js';
import GovtLoginPage from './landingpage.js';



function App() {
  return (
    <div className="App">
    <Router>
      
      <Routes>
         <Route path="/" element={<GovtLoginPage />} />
         <Route path="/division-pa" element={<RegularisationPage />} />
         <Route path="/division-head" element={<HeadPage />} />  
        <Route path="/admin" element={<AdminPage/>} />
           
      </Routes>
      
    </Router>
    </div>
  );
}

export default App;
