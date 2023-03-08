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
  const [deleteItem, setDeleteItem] = useState('')


  const [showcomment, setShowComment] = useState(false)

  const [showcommentadd, setShowCommentADD] = useState(false)
  const [addComment, setAddComment] = useState("")
  const [addCommentAdd, setAddCommentADD] = useState(false)
  const [comments, setComments] = useState([])


  const [err, setErr] = useState('')
  const [showupdateItem, setShowUpdateItem] = useState(false)
  const [updateItem, setUpdateItem] = useState("")
  const [reupdateItem, setReUpdateItem] = useState(false)
  
let {title,
    description,
    price,
    img,
    video,
    location}=""

    let {comment,
      time,
      user_id,
      item_id}=""

  useEffect(() => {
    if (value.item_Id&&!item) {
      axios
        .get(`http://localhost:5000/items/${value.item_Id}`, {
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data.result)
          setItem(result.data.result)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }else if (!value.item_Id){
      navigate("/")
    }
  }, [item])



  useEffect(() => {
      axios
        .delete(`http://localhost:5000/favorites/${value.item_Id}`, {
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data.result)
          navigate("/")
        })
        .catch((err) => {
          console.log(err.message)
        })
  }, [deleteItem])





  useEffect(() => {
      axios
        .post(`http://localhost:5000/comments`,addComment,{
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data)
          setItem(null)
          showcomment(!showcomment)
        })
        .catch((err) => {
          console.log(err.message)
        })
  }, [addCommentAdd])

  
  

  

  useEffect(() => {
    if (item) {
      axios
        .get(`http://localhost:5000/comments/item/${value.item_Id}`,{
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data)
          setComments(result.data.result)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [showcommentadd])


  
  useEffect(() => {
      axios
        .put(`http://localhost:5000/items/${value.item_Id}`,updateItem,{
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data.result)
          setItem(null)
        })
        .catch((err) => {
          console.log(err.message)
        })
  }, [updateItem])

  

  

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
  comment=e.target.value
  time="11:22"
}

const getComments=()=>{
  return comments.map((e)=>{
      return(
        <div>
          <p>{e.comment}</p>
          <p>{e.time}</p>
          <p>{e.user.firstName}</p>
        </div>
      )
  })
}

  const itemFunction = () => {
    return (
      <div key={item._id} className="favorite-pop">
            <p>type :{item.type.type}</p>
            <p>Name :{item.user.firstName}</p>
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
        {getComments()}
          <br></br>
        <Input fun={item_input_comment} className="additem-input" text="Add Comment" />
        <Button
          value={item._id}
          fun={add_comment}
          className="favorite-button"
          text="Add Comment"
        />
        </>:""}
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
        />
      </div>
    )
  }

  const delete_item = (e) => {
    console.log(e.target.value)
    setDeleteItem(e.target.value)
  }

  const show_Update_item =()=>{
    setShowUpdateItem(!showupdateItem)
  }

  const update_item = (e) => {
    console.log({title,
        description,
        price,
        img,
        video,
        location})
        setUpdateItem({title,
  description,
  price,
  img,
  video,
  location})
        
  }

  const show_comment = (e) => {
    console.log(e.target.value)
    setShowComment(!showcomment)
    setShowCommentADD(!showcommentadd)
  }

  const add_comment =(e)=>{
    item_id= e.target.value
    user_id=JSON.parse(localStorage.getItem('token'))._id
    setAddComment({comment:comment,
      time:time,
      user:user_id,
      item:item_id})
      setAddCommentADD(!addCommentAdd)
      setShowCommentADD(!showcommentadd)
  }

  return (
    <div className="Favorite">
      <h1>Item</h1>
      {item ? itemFunction() : <></>}
    </div>
  )
}

export default Item
