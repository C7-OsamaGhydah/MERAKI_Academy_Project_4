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
    if(item.length===0&&value.token!=null){
    axios.get("http://localhost:5000/items",{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
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


const show_item = (e)=>{
console.log(e.target.value)
value.setisItem_Id(e.target.value)
navigate("/Item")
}

const itemFunction=()=>{
    return item.map((item)=>{
        return (
            <div key={item._id} className="home-pop">
            <p>type :{item.type.type}</p>
            <p>title : {item.title}</p>
            <p>description : {item.description}</p>
            <p>price : {item.price}</p>
            <p>location : {item.location}</p>
            <p>{item.video}</p>
            <p>{item.img}</p>
            <p>{item.comment}</p>
            <Button
          value={item._id}
          fun={show_item}
          className="favorite-button"
          text="show more"
        />            </div>
            )
    })
}


return(<div className="Home">
    <h1>Home</h1>
        {item.length>0?itemFunction():""}
    </div>
)

}


export default Home;

