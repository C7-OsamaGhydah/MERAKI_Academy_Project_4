import "./Home.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const Home=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [item,setItem]=useState([])
const [err,setErr]=useState("")

useEffect(()=>{
    if(item.length===0){
    axios.get("http://localhost:5000/items",{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        setItem(result.data.result)
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[item])


const itemFunction=()=>{
    return item.map((item)=>{
        return (
            <div key={item._id} className="home-pop">
            <p>type :{item.type.type}</p>
            <p>Name :{item.user.firstName}</p>
            <p>phone Number : {item.user.phoneNumber}</p>
            <p>city : {item.user.city}</p>
            <p>country : {item.user.country}</p>
            <hr></hr>
            <p>title : {item.title}</p>
            <p>description : {item.description}</p>
            <p>price : {item.price}</p>
            <p>location : {item.location}</p>
            <p>{item.video}</p>
            <p>{item.img}</p>
            <p>{item.comment}</p>
            </div>
            )
    })
}


return(<div className="Home">
    <h1>Home</h1>
        {itemFunction()}
    </div>
)

}


export default Home;

