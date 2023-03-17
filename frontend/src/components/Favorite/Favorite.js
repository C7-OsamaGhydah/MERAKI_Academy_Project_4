import "./Favorite.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Button from "../Button/Button"
import axios from "axios";
import Card from 'react-bootstrap/Card';








const Favorite=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [item,setItem]=useState([])
const [deleteItem,setDeleteItem]=useState('')
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


useEffect(()=>{
    if(item.length>0){
    axios.delete(`http://localhost:5000/favorites/${deleteItem}`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        setItem([])
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[deleteItem])



const itemFunction=()=>{
    return item.map((element)=>{
        return (
            element.item ?<Card className="favorite-cared" key={element._id}>
        {element.item?<Card.Img id={element._id?element._id:""} onClick={show_item} variant="top" src={element.item.img?element.item.img:""} />:""}
        <Card.Body>
        <Card.Title>{element.item.title?element.item.title:""}</Card.Title>
          <Card.Text>
          {element.item.description?element.item.description:""}
          </Card.Text>
          <hr />
          <Card.Text>
          price : {element.item.price?element.item.price:""}
          </Card.Text>
          <Card.Text>
          location : {element.item.location?element.item.location:""}
          </Card.Text>
        </Card.Body>
        <Button value={element._id} fun={delete_item} className="favorite-button" text="delete"/>
      </Card>:""
            )
    })
}


const delete_item =(e)=>{
    console.log(e.target.value)
    setDeleteItem(e.target.value)
}


const show_item = (e)=>{
    value.setisItem_Id(e.target.id)
    navigate("/Item")
    }


return(<div className="Favorite">
    {item.length>0?itemFunction():<p style={{alignSelf:"center"}}>no item yet</p>}
    </div>
)

}


export default Favorite;

