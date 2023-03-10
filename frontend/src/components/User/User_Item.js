import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const User_Item=()=>{


const value = useContext(AllContext);
const navigate = useNavigate();

const [item,setItem]=useState([])
const [err,setErr]=useState("")


const [itemFavorite,setItemFavorite]=useState([])
const [deleteItemFavorite,setDeleteItemFavorite]=useState('')


useEffect(()=>{
    if(item.length===0){
    axios.get(`http://localhost:5000/items/user/${value.user_Id}`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        if(result.data.result.length>0){
                    setItem(result.data.result)
        }
    }).catch((err)=>{
        console.log(err.message)
        })
    }
},[item])


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
value.setisItem_Id(e.target.value)
navigate("/Item")
}


const AddToFavorite = (e)=>{
    let t =[]
    const idItem=e.target.value
    if(itemFavorite.length>0){
     itemFavorite.forEach((ex)=>{
        console.log(ex.item._id)
        console.log(idItem)
        console.log(ex.item._id==idItem);
        ex.item._id==idItem?t.push(idItem):console.log("lolo")
        
    })
}

    if(t.length===0){
        axios.post(`http://localhost:5000/favorites`,{user:value.token._id,item:idItem},{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
            console.log(result.data.result)
        }).catch((err)=>{
            console.log(err.message)
            })
    }
    }

    
    


const itemFunction=()=>{
    return item.map((item)=>{ 
        console.log(item.user._id)

        return (
            <div key={item._id} className="home-pop">
            <p>Name :{item.user.firstName}</p>
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
        />
        {item.user._id===value.token._id?"":<>
        <Button
          value={item._id}
          fun={AddToFavorite}
          className="favorite-button"
          text="Add To Favorite"
        />
        <Button
          value={item._id}
          fun={show_item}
          className="favorite-button"
          text="Delet from Favorite"
        /> </>}
        </div>
            )
    })
}


return(<div className="User">
    <h3>Items</h3>
        {item.length>0?itemFunction():<p>no item yet</p>}
    </div>
)

}


export default User_Item;

