import './App.css';
import * as React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from './component/Home';
// import Header from './component/Header';
import Search from './component/Search';


function App() {
  return (
  <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='user/:ipAddress' element={<Search />}/>
      </Routes>
 </BrowserRouter>
  );
}

export default App;
