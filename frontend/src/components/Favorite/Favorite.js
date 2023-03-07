import "./Favorite.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const Favorite=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [item,setItem]=useState([])
const [err,setErr]=useState("")

useEffect(()=>{
    if(item.length===0){
    axios.get(`http://localhost:5000/favorites`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        setItem(result.data.result)
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[item])


const itemFunction=()=>{
    return item.map((element)=>{
        return (
            <div key={element._id} className="home-pop">
            <p>title : {element.item.title}</p>
            <p>description : {element.item.description}</p>
            <p>price : {element.item.price}</p>
            <p>location : {element.item.location}</p>
            <p>{element.item.video}</p>
            <p>{element.item.img}</p>
            </div>
            )
    })
}


return(<div className="Home">
    <h1>Favorite</h1>
    {itemFunction()}
    </div>
)

}


export default Favorite;

