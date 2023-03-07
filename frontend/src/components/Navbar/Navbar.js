import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import "./Navbar.css";
import axios from "axios";





const Navbar=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const login =()=>{
navigate("/login")
}
const register =()=>{
    navigate("/register")
}

const AddItem =()=>{
    navigate("/AddItem")
}


const logout =()=>{
    localStorage.removeItem('token')
    value.setisLoggedIn((loggedIn)=>!loggedIn)
    value.setToken((token)=>token=null)

    navigate("/Login")
}


const Home =()=>{
navigate("/")
}


const Favorite =()=>{
    navigate("/Favorite")
    }

return(<div className="Navbar">
<Paragraph className="paragraph"
fun={Home}
text="Home"/>

    {value.loggedIn?
    <>
    <Paragraph className="paragraph"
fun={AddItem}
text="AddItem"/>
<Paragraph className="paragraph"
fun={logout}
text="Logout"/>
<Paragraph className="paragraph"
fun={Favorite}
text="Favorite"/>
</>:<>
<Paragraph className="paragraph"
fun={login}
text="Login"/>
<Paragraph className="paragraph"
fun={register}
text="Register"/>
</> 
}
    </div>
)

}


export default Navbar;

