import "./AddItem.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const AddItem=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [types,setTypes]=useState([])
const [newItem,setNewItem]=useState(null)



let {title,
    description,
    price,
    img,
    video,
    location,
    user,
    type}=""
    

useEffect(()=>{
    if(types.length===0){
        axios.get("http://localhost:5000/types",{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
        setTypes(result.data.result)
    }).catch((err)=>{
        console.log(err.message)
    })
    }
    
},[types])

useEffect(()=>{
    if(newItem){
        axios.post("http://localhost:5000/items",newItem,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
    }).catch((err)=>{
        console.log("newItem")
        console.log(err.message)
    })
    }
    
},[newItem])

const typesFunction=()=>{
    return types.map((type)=>{
        return (
            <option className="additem-input" key={type._id} value={type._id}>{type.type}</option>
            )
    })
}

const type_input =(e)=>{
    type=e.target.value
}
const item_input_title =(e)=>{
    title=e.target.value
}

const item_input_price =(e)=>{
    price=e.target.value
}
const item_input_img =(e)=>{
    img=e.target.value
}
const item_input_video =(e)=>{
    video=e.target.value
}
const item_input_location =(e)=>{
    location=e.target.value
}
const item_input_description =(e)=>{
    description=e.target.value
}

const item_Button =()=>{
    setNewItem({title,
        description,
        price,
        img,
        video,
        location,
        user,
        type})
}

return(<div className="AddItem">
    <h1>AddItem</h1>
<Input fun={item_input_title} className="additem-input" text="Title"/>
<Input fun={item_input_description} className="additem-input" text="description"/>
<Input fun={item_input_price} className="additem-input" text="price"/>
<Input fun={item_input_img} className="additem-input" text="img"/>
<Input fun={item_input_video} className="additem-input" text="video"/>
<Input fun={item_input_location} className="additem-input" text="location"/>

<select placeholder="type" className="additem-input" onChange={type_input} >
    {typesFunction()}
</select>
<Button fun={item_Button} className="additem-button" text="Add"/>

    </div>
)

}


export default AddItem;

