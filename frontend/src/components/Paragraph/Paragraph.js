import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";






const Paragraph=({className,fun,text})=>{

const user = useContext(AllContext);
const navigate = useNavigate();


return(
    <p className={className} onClick={()=>{
        fun()
    }} >{text}</p>
)

}


export default Paragraph;

