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
const [num,setnum]=useState(6)

let arrayOfFav=[]
let array=[]


useEffect(()=>{
    console.log(num)
    if(value.item.length===0&&value.item.length<num&&value.typeForSearch===undefined&&value.countryForSearch===undefined){
    axios.get(`${process.env.REACT_APP_BACKEND}/items/${num}`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        if(result.data.result.length>0){
            value.setItem(result.data.result)
            value.sethome(true)
        }
    }).catch((err)=>{
        console.log(err.message)
        })
    }
},[value.item,num])



useEffect(()=>{
    if(value.typeForSearch!=undefined&&value.item.length<num){
        console.log("hi osama")
    axios.get(`${process.env.REACT_APP_BACKEND}/items/type/${value.typeForSearch}/${num}`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        if(result.data.result.length>0){
            value.setItem(result.data.result)
        }
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[value.typeForSearch,num])



useEffect(()=>{
    if(value.countryForSearch!=undefined&&value.item.length<num){
        
    axios.get(`${process.env.REACT_APP_BACKEND}/items/country/${value.countryForSearch}`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        if(result.data.result.length>0){
            value.setItem(result.data.result)
        }
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[value.countryForSearch,num])


useEffect(()=>{
    if(itemFavorite.length===0){
    axios.get(`${process.env.REACT_APP_BACKEND}/favorites`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        setItemFavorite(result.data.result)
    }).catch((err)=>{
        console.log(err.message)
        })
    }

},[itemFavorite])


const show_item = (e)=>{
    setnum(undefined)
    console.log(e.target.value)
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
        axios.post(`${process.env.REACT_APP_BACKEND}/favorites`,{user:value.token._id,item:idItem},{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
            console.log(result.data.result)
            setItemFavorite([])
        }).catch((err)=>{
            console.log(err.message)
            })
    }
    }

    const userfun =(e)=>{
        setnum(undefined)
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

 const show_more =()=>{
    setnum(num+6)
    value.setItem([])
 }


return(<div className="home">
<div className="Home">
        {value.item.length>0?itemFunction():<p>no item yet</p>}
    </div>
    <Button
          fun={show_more}
          className="home-button-more"
          text="show more"
        />
        </div>
)

}


export default Home;

