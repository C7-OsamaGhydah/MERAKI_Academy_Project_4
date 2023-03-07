import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import "./Navbar.css";
import axios from "axios";





const Navbar=()=>{

const user = useContext(AllContext);
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


return(<div className="Navbar">
    <Paragraph className="paragraph"
fun={login}
text="Login"/>
<Paragraph className="paragraph"
fun={register}
text="Register"/>
  <Paragraph className="paragraph"
fun={login}
text="Home"/>
<Paragraph className="paragraph"
fun={AddItem}
text="AddItem"/>
    
    </div>
)

}


export default Navbar;

