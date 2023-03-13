import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";






const Input=({msg,className,fun,text,type,value})=>{

const user = useContext(AllContext);
const navigate = useNavigate();


return(<>
    <label>{text} :</label>
    <p className="msg">{msg}</p>
    <input type={type||"text"} value={value} onChange={(e)=>{fun(e)}} className={className} placeholder={text}/ >
</>)

}


export default Input;

