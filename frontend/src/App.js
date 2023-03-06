import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect,useState,createContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Login from "./components/Login/Login"

export const AllContext = createContext();
function App() {
  const navigate = useNavigate();

  return (<>
  <AllContext.Provider value={{id:10}}>
  <div className="App">
      <header className="App-header">
        <h1>Project 4 </h1>
        <Navbar/>
      </header>
    </div>
    <Routes>
    <Route path="/login" element={<Login/>}/>
    </Routes>
    </AllContext.Provider>
    </>
  );
}

export default App;
