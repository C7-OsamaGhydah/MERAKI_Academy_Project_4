import "./User.css";
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







const User_Item=()=>{


const value = useContext(AllContext);
const navigate = useNavigate();

const [item,setItem]=useState([])
const [err,setErr]=useState("")
const [itemFavorite,setItemFavorite]=useState([])
let arrayOfFav=[]
let array=[]




useEffect(()=>{
    if(item.length===0){
    axios.get(`${process.env.REACT_APP_BACKEND}/items/user/${value.user_Id}`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        if(result.data.result.length>0){
                    setItem(result.data.result)
        }
    }).catch((err)=>{
        console.log(err.message)
        })
    }
},[item])


useEffect(()=>{
    if(itemFavorite.length===0&&value.user_Id!==value.token._Id){
    axios.get(`${process.env.REACT_APP_BACKEND}/favorites`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        setItemFavorite(result.data.result)
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[itemFavorite])


const show_item = (e)=>{
value.setisItem_Id(e.target.value)
navigate("/Item")
}


const AddToFavorite = (e)=>{
    if(itemFavorite.length>0){
    itemFavorite.forEach((e)=>{
        arrayOfFav.push(e.item._id)
    })
    }
const idItem=e.target.value

if(!arrayOfFav.includes(idItem)){
        axios.post(`${process.env.REACT_APP_BACKEND}/favorites`,{user:value.token._id,item:idItem},{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
            console.log(result.data.result)
            setItemFavorite([])
        }).catch((err)=>{
            console.log(err.message)
            })
    }
    }

    
    

    const itemFunction=()=>{
        return item.map((item)=>{ 
            return (
                <div key={item._id} >
<Card key={item._id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.img?item.img:""} />
        <Card.Body>
          <Card.Title>{item.title?item.title:"no"}</Card.Title>
          <Card.Text> 
          {item.description?item.description:"no"}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>price : {item.price?item.price:"no"}</ListGroup.Item>
          <ListGroup.Item>country : {item.country?item.country:""}</ListGroup.Item>
          <ListGroup.Item>city : {item.city?item.city:""}</ListGroup.Item>
          <ListGroup.Item>type :{item.type?item.type.type:"no"}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link className="home-p" id={item.user._id}>Name :{item.user.firstName}</Card.Link>
          <Button
          value={item._id}
          fun={show_item}
          className="home-button"
          text="show more"
        />
        {itemFavorite?itemFavorite.forEach((e)=>{array.push(e.item?e.item._id:"")}):""}
        {item.user._id===value.token._id||array.includes(item._id)?
        item.user._id===value.token._id?"":<p>this item in you'r Favorite</p>:
        <Button
          value={item._id}
          fun={AddToFavorite}
          className="home-button"
          text="Add To Favorite"
        />}
        </Card.Body>
      </Card>
            </div>
                )
        })
    }
    
    


return(<div className="user-pop">
        {item.length>0?itemFunction():<p>no item yet</p>}
    </div>
)

}


export default User_Item;

