import './Item.css'
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../App'
import Paragraph from '../Paragraph/Paragraph'
import Input from '../Input/Input'
import Button from '../Button/Button'
import axios from 'axios'

const Item = () => {
  const value = useContext(AllContext)
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [reitem, setReItem] = useState(false)
  const [deleteItem, setDeleteItem] = useState(false)


  const [showcomment, setShowComment] = useState(false)

  const [addComment, setAddComment] = useState("")
  const [comments, setComments] = useState([])


  const [showupdateItem, setShowUpdateItem] = useState(false)
  const [updateItem, setUpdateItem] = useState("")
  const [_iduser, set_iduser] = useState("")
  const [comment, setComment] = useState("")
  
let {title,
    description,
    price,
    img,
    video,
    location}=""

    let {
      time,
      user_id,
      item_id}=""


      let {commentForupdate,
        timeForupdate,
        coment_id_Forupdate,
        user_id_Forupdate}=""

      //this useEffect to get item 


  useEffect(() => {
    if (value.item_Id) {
      axios
        .get(`http://localhost:5000/items/${value.item_Id}`, {
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data.result.user._id)
          set_iduser(result.data.result.user._id)
          setItem(result.data.result)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }else if (!value.item_Id){
      navigate("/")
    }
  }, [reitem])

  

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

const item_input_comment =(e)=>{
  setComment(e.target.value)
  time="11:22"
}

const item_input_update_comment =(e)=>{
  commentForupdate=e.target.value
  timeForupdate="11:22"
}



const show_Update_item =()=>{
  setShowUpdateItem(!showupdateItem)
}
    

//this useEffect to add comment to item

const show_comment = (e) => {
  console.log(e.target.value)
  setShowComment(!showcomment)
  get_comment()
}
const get_comment = () => {
    axios
    .get(`http://localhost:5000/comments/item/${value.item_Id}`,{
      headers: { Authorization: `Bearer  ${value.token.token}` },
    })
    .then((result) => {
      setComments(result.data.result)
    })
    .catch((err) => {
      console.log(err.message)
      setComments([])
      setReItem(!reitem)
    })
}


  //this useEffect to get comment from item id

const add_comment =async(e)=>{
  item_id= e.target.value
  user_id=await JSON.parse(localStorage.getItem('token'))._id

  setAddComment({comment:comment,
    time:time,
    user:user_id,
    item:item_id})
    
    await axios
    .post(`http://localhost:5000/comments`,{comment:comment,
    time:time,
    user:user_id,
    item:item_id},{
      headers: { Authorization: `Bearer  ${value.token.token}` },
    })
    .then((result) => {
      console.log(result.data)
      setReItem(!reitem)
      get_comment()
      setComment("")
    })
    .catch((err) => {
      console.log(err.message)
    })
}


//this useEffect to update item 

const update_item = (e) => {
  setUpdateItem({title,
description,
price,
img,
video,
location})
  
if(_iduser===value.token._id){
  axios
    .put(`http://localhost:5000/items/${value.item_Id}`,{title,
    description,
    price,
    img,
    video,
    location},{
      headers: { Authorization: `Bearer  ${value.token.token}` },
    })
    .then((result) => {
      console.log(result.data.result)
      setReItem(!reitem)
    })
    .catch((err) => {
      console.log(err.message)
    })
}
}

  //this useEffect to delet item 

const delete_item = (e) => {
  setDeleteItem(!deleteItem)
  if(_iduser===value.token._id){
    axios
      .delete(`http://localhost:5000/items/${value.item_Id}`, {
        headers: { Authorization: `Bearer  ${value.token.token}` },
      })
      .then((result) => {
        console.log(result.data.result)
        navigate("/")
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
}



  //this useEffect to update comment 
const update_comment = (e) => {
  coment_id_Forupdate=e.target.value

  axios
    .put(`http://localhost:5000/comments/${coment_id_Forupdate}`,{comment:commentForupdate,
    time:timeForupdate},{
      headers: { Authorization: `Bearer  ${value.token.token}` },
    })
    .then((result) => {
    console.log(result.data)
    setReItem(!reitem)
    get_comment()
    })
    .catch((err) => {
      console.log(err.message)
    })

}



  //this function to delet comment 
  const delet_comment = (e) => {
    const id =e.target.value
  
    axios
      .delete(`http://localhost:5000/comments/${id}`,{
        headers: { Authorization: `Bearer  ${value.token.token}` },
      })
      .then((result) => {
      console.log(result.data)
      setReItem(!reitem)
      get_comment()
      })
      .catch((err) => {
        console.log(err.message)
      })
  
  }


const getComments=()=>{
  return comments.length>0?comments.map((e)=>{
      return(
        <div key={e._id}>
          <p>{e.comment}</p>
          <p>{e.time}</p>
          <p>{e.user.firstName}</p>
          {e.user._id===value.token._id?
          <div>
          <p>{e.user._id}</p>
          <Input fun={item_input_update_comment} className="additem-input" text="Update Comment" />
        <Button
          value={e._id}
          fun={update_comment}
          className="favorite-button"
          text="Update Comment"
        />
        <Button
          value={e._id}
          fun={delet_comment}
          className="favorite-button"
          text="Delet Comment"
        />
        </div>
          :""}
        </div>
      )
  }):""
  
}

  const itemFunction = () => {
    return (
      <div key={item._id} className="favorite-pop">
            <p>type :{item.type.type}</p>
            <p>Name :{item.user.firstName}</p>
            <p>Name :{item.user._id}</p>
            <p>phone Number : {item.user.phoneNumber}</p>
            <p>city : {item.user.city}</p>
            <p>country : {item.user.country}</p>
            <hr></hr>
        <p>title : {item.title}</p>
        <p>description : {item.description}</p>
        <p>price : {item.price}</p>
        <p>location : {item.location}</p>
        <p>{item.video}</p>
        <p>{item.img}</p>
        <Button
          value={item._id}
          fun={show_comment}
          className="favorite-button"
          text="show comment"
        />
        {showcomment?<>
        {comments.length>0?getComments():<p>No Comment in this item</p>}
          <br></br>
        <Input fun={item_input_comment} value={comment} className="additem-input" text="Add Comment" />
        <Button
          value={item._id}
          fun={add_comment}
          className="favorite-button"
          text="Add Comment"
        />
        </>:""}
        
        
        {(_iduser===value.token._id)?<>
        <Button
          value={item._id}
          fun={show_Update_item}
          className="favorite-button"
          text="update"
        />
        {showupdateItem?<>
        <Input fun={item_input_title} className="additem-input" text="Title" />
        <Input
          fun={item_input_description}
          className="additem-input"
          text="description"
        />
        <Input fun={item_input_price} className="additem-input" text="price" />
        <Input fun={item_input_img} className="additem-input" text="img" />
        <Input fun={item_input_video} className="additem-input" text="video" />
        <Input
          fun={item_input_location}
          className="additem-input"
          text="location"
        /><Button
        value={item._id}
        fun={update_item}
        className="favorite-button"
        text="Add Update"
      />
        </>:""}
        <Button
          value={item._id}
          fun={delete_item}
          className="favorite-button"
          text="delete"
        /></>:""}
      </div>
    )
  }



  return (
    <div className="Favorite">
      <h1>Item</h1>
      {item ? itemFunction() : <></>}
    </div>
  )
}

export default Item
