import "./App.css";
import React from "react";
import { Routes, Route, Link ,useParams} from "react-router-dom";
import { useEffect,useState,createContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import AddItem from "./components/AddItem/AddItem"
import Home from "./components/Home/Home"
import Favorite from "./components/Favorite/Favorite"
import Item from "./components/Item/Item"

export const AllContext = createContext();
function App() {
  const navigate = useNavigate();

  const role = "6404f837ae25ec224530eb84"
  
const [loggedIn,setisLoggedIn]=useState(false)
const [token,setToken]=useState(JSON.parse(localStorage.getItem('token')))

const [item_Id,setisItem_Id]=useState("")


useEffect(()=>{
  if(token){
    setisLoggedIn(!loggedIn)
  }
},[])

  return (<>
  <AllContext.Provider value={{item_Id,setisItem_Id,loggedIn,token,role,setisLoggedIn,setToken}}>
  <div className="App">
      <header className="App-header">
        <h1>Project 4 </h1>
        <Navbar/>
      </header>
    </div>
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/AddItem" element={<AddItem/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/Favorite" element={<Favorite/>}/>
    <Route path="/Item" element={<Item/>}/>
    </Routes>
    </AllContext.Provider>
    </>
  );
}

export default App;
