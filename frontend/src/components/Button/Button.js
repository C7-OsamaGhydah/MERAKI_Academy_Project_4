import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";






const Button=({className,fun,text})=>{

const user = useContext(AllContext);
const navigate = useNavigate();


return(
    <button onClick={fun} className={className}>{text}</button>
)

}


export default Button;

