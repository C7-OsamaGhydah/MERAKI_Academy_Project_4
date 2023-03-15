import "./Main.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';








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
        <Card key={item._id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.img} />
        <Card.Body>
          <Card.Title>{item.title?item.title:""}</Card.Title>
          <Card.Text> 
          {item.description?item.description:""}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>price : {item.price?item.price:""}</ListGroup.Item>
          <ListGroup.Item>location : {item.location?item.location:""}</ListGroup.Item>
          <ListGroup.Item>type :{item.type.type?item.type.type:""}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link id={item.user._id} href="#">Name :{item.user.firstName}</Card.Link>
        </Card.Body>
      </Card>
            )
    })
}


return(<div className="Main">
        {item.length>0?itemFunction():<p>no item yet</p>}
    </div>
)

}


export default Main;

