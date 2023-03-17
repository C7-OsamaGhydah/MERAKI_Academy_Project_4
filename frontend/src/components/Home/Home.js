import "./Home.css";
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







const Home=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [err,setErr]=useState("")

const [itemFavorite,setItemFavorite]=useState([])

let arrayOfFav=[]
let array=[]

useEffect(()=>{
    if(value.item.length===0&&value.typeForSearch===undefined){
    axios.get("http://localhost:5000/items",{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        if(result.data.result.length>0){
            value.setItem(result.data.result)
            value.sethome(true)
        }
    }).catch((err)=>{
        console.log(err.message)
        })
    }
},[value.item])



useEffect(()=>{
    if(value.typeForSearch!=undefined){
        console.log("hi osama")
    axios.get(`http://localhost:5000/items/type/${value.typeForSearch}`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        if(result.data.result.length>0){
            value.setItem(result.data.result)
        }
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[value.typeForSearch])


useEffect(()=>{
    if(itemFavorite.length===0){
    axios.get(`http://localhost:5000/favorites`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        setItemFavorite(result.data.result)
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[itemFavorite])


const show_item = (e)=>{
    value.sethome(false)
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
        axios.post(`http://localhost:5000/favorites`,{user:value.token._id,item:idItem},{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
            console.log(result.data.result)
            setItemFavorite([])
        }).catch((err)=>{
            console.log(err.message)
            })
    }
    }

    const userfun =(e)=>{
        value.sethome(false)
        value.setUser_Id(e.target.id)
        navigate("/User")
    }
    
    


const itemFunction=()=>{
    return value.item.map((item)=>{

        return (
        <Card key={item._id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.img?item.img:"no"} />
        <Card.Body>
          <Card.Title>{item.title?item.title:"no"}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>type :{item.type?item.type.type:"no"}</ListGroup.Item>
          <ListGroup.Item>price : {item.price?item.price:"no"}</ListGroup.Item>
          <ListGroup.Item>city : {item.city?item.city:"no"}</ListGroup.Item>
          <ListGroup.Item>country : {item.country?item.country:"no"}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link className="home-p" id={item.user._id} onClick={userfun}>Name :{item.user.firstName?item.user.firstName:"user name"}</Card.Link>
        <hr></hr>

          <Button
          value={item._id}
          fun={show_item}
          className="home-button"
          text="show more"
        />
        {itemFavorite.length>0?itemFavorite.forEach((e)=>{array.push(e.item._id)}):""}
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
            )
    })
}


return(<div className="Home">
        {value.item.length>0?itemFunction():<p>no item yet</p>}
    </div>
)

}


export default Home;

