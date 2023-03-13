import "./Main.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const Main=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [item,setItem]=useState([])
const [err,setErr]=useState("")


const [itemFavorite,setItemFavorite]=useState([])

let arrayOfFav=[]
let array=[]


useEffect(()=>{
    if(item.length===0){
    axios.get("http://localhost:5000/items").then((result)=>{
        console.log(result.data.result)
        if(result.data.result.length>0){
                    setItem(result.data.result)
        }
    }).catch((err)=>{
        console.log(err.message)
    localStorage.removeItem('token')
    value.setisLoggedIn((loggedIn)=>!loggedIn)
    value.setToken((token)=>token=null)
        })
    }else{

    }

},[item])


const itemFunction=()=>{
    return item.map((item)=>{ 
        console.log(item.user._id)

        return (
            <div key={item._id} className="main-pop">
            <p id={item.user._id}>Name :{item.user.firstName}</p>
            <p>type :{item.type.type}</p>
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


return(<div className="Main">
        {item.length>0?itemFunction():<p>no item yet</p>}
    </div>
)

}


export default Main;

