import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";






const Input=({className,fun,text})=>{

const user = useContext(AllContext);
const navigate = useNavigate();


return(
    <input onChange={(e)=>{fun(e)}} className={className} placeholder={text}/ >
)

}


export default Input;

