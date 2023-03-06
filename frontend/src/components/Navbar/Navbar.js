import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import "./Navbar.css";





const Navbar=()=>{

const user = useContext(AllContext);
const navigate = useNavigate();

const clck =(e)=>{
console.log("hi osama")
navigate("login")
}


return(<div className="Navbar">
    <Paragraph className="paragraph"
fun={clck}
text="Login"/>
    
    </div>
)

}


export default Navbar;

