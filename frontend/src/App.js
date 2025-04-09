//App.js
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './Header';
import Nav2 from './Nav2';
import Main from './Main';
import Publish_tender from './publish_tender'
import HomePage from './HomePage';
import Place from './placebid';


function App() {
  return (  
    <div>
      <Header />
      <div class="main-container">
      <Nav2 />
      <Place />
      
      </div>
    </div>
    
  );
}

export default App;
