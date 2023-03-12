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



const [title,settitle]=useState('')
const [description,setdescription]=useState('')
const [price,setprice]=useState('')
const [img,setimg]=useState('')
const [location,setlocation]=useState('')
const [user,setuser]=useState('')
const [type,settype]=useState('')
    

useEffect(()=>{
    if(types.length===0){
        axios.get("http://localhost:5000/types",{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        setTypes(result.data.result)
    }).catch((err)=>{
        console.log(err.message)
    })
    }
    
},[types])


const typesFunction=()=>{
    return types.map((type)=>{
        return (
            <option className="additem-input" key={type._id} value={type._id}>{type.type}</option>
            )
    })
}

const type_input =(e)=>{
settype(e.target.value)
}
const item_input_title =(e)=>{
    settitle(e.target.value)
}

const item_input_price =(e)=>{
setprice(e.target.value)
}
const item_input_img =(e)=>{
setimg(e.target.value)
}
const item_input_location =(e)=>{
    setlocation(e.target.value)
}
const item_input_description =(e)=>{
    setdescription(e.target.value)
}

const item_Button =()=>{
    setuser(value.token._id)

        axios.post("http://localhost:5000/items",{title,
        description,
        price,
        img,
        location,
        user,
        type},{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
settitle("")
setdescription("")
setprice("")
setimg("")
setlocation("")
setuser("")
settype("")
setTypes([])
    }).catch((err)=>{
        console.log(err.message)
    })
}

return(<div className="AddItem">
    
    <div className="addItem-pop">
        <h3>AddItem</h3>
<Input value={title}  fun={item_input_title} className="additem-input" text="Title"/>
<label >description :</label>
<textarea value={description} onChange={item_input_description} className="additem-textarea" placeholder="description"/>
<Input value={price} type="number" fun={item_input_price} className="additem-input" text="price"/>
<Input value={img}  fun={item_input_img} className="additem-input" text="img"/>
<Input value={location} fun={item_input_location} className="additem-input" text="location"/>
<label>type :</label>
<select placeholder="type" className="additem-selsct" onChange={type_input} >
    {typesFunction()}
</select>
<Button fun={item_Button} className="additem-button" text="Add"/>
</div>
    </div>
)

}

export default AddItem;

