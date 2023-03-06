import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect,useState,createContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"

export const AllContext = createContext();
function App() {
  const navigate = useNavigate();

  const role = "6404f837ae25ec224530eb84"

  return (<>
  <AllContext.Provider value={{role}}>
  <div className="App">
      <header className="App-header">
        <h1>Project 4 </h1>
        <Navbar/>
      </header>
    </div>
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    </Routes>
    </AllContext.Provider>
    </>
  );
}

export default App;
