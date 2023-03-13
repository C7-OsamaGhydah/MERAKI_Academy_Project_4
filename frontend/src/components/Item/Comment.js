import './Item.css'
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../App'
import Paragraph from '../Paragraph/Paragraph'
import Input from '../Input/Input'
import Button from '../Button/Button'
import axios from 'axios'

const Comment = () => {
  const value = useContext(AllContext)
  const navigate = useNavigate()

  const [offers, setOffers] = useState([])

  const [item, setItem] = useState(null)
  const [reitem, setReItem] = useState(false)
  const [deleteItem, setDeleteItem] = useState(false)

  const [showcomment, setShowComment] = useState(false)

  const [addComment, setAddComment] = useState('')
  const [comments, setComments] = useState([])

  const [_iduser, set_iduser] = useState('')
  const [comment, setComment] = useState('')
  const [offer, setoffer] = useState('')

  let { time, user_id, item_id } = ''

  let {
    commentForupdate,
    timeForupdate,
    coment_id_Forupdate,
    user_id_Forupdate,
  } = ''

  useEffect(() => {
    if (offers.length === 0) {
      axios
        .get(`http://localhost:5000/items/user/${value.token._id}`, {
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data.result)
          setOffers(result.data.result)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [offers])

  const item_input_comment = (e) => {
    setComment(e.target.value)
    time = '11:22'
  }

  const item_input_update_comment = (e) => {
    commentForupdate = e.target.value
    timeForupdate = '11:22'
  }

  const offer_input = (e) => {
    setoffer(e.target.value)
  }

  const offerFunction = () => {
    return offers.map((offer) => {
      return (
        <option className="additem-input" key={offer._id} value={offer._id}>
          {offer.title}
        </option>
      )
    })
  }

  //this useEffect to add comment to item

  const show_comment = (e) => {
    setShowComment(!showcomment)
    get_comment()
  }
  const get_comment = () => {
    axios
      .get(`http://localhost:5000/comments/item/${value.item_Id}`, {
        headers: { Authorization: `Bearer  ${value.token.token}` },
      })
      .then((result) => {
        console.log(result.data.result)
        setComments(result.data.result)
      })
      .catch((err) => {
        console.log(err.message)
        setComments([])
        setReItem(!reitem)
      })
  }

  //this useEffect to get comment from item id

  const add_comment = async (e) => {
    item_id = e.target.value
    user_id = await JSON.parse(localStorage.getItem('token'))._id

    setAddComment({
      offer: offer,
      comment: comment,
      time: time,
      user: user_id,
      item: item_id,
    })

    await axios
      .post(
        `http://localhost:5000/comments`,
        {
          offer: offer,
          comment: comment,
          time: time,
          user: user_id,
          item: item_id,
        },
        {
          headers: { Authorization: `Bearer  ${value.token.token}` },
        },
      )
      .then((result) => {
        setReItem(!reitem)
        get_comment()
        setComment('')
        setoffer('')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  //this useEffect to update comment
  const update_comment = (e) => {
    coment_id_Forupdate = e.target.value

    axios
      .put(
        `http://localhost:5000/comments/${coment_id_Forupdate}`,
        { comment: commentForupdate, time: timeForupdate },
        {
          headers: { Authorization: `Bearer  ${value.token.token}` },
        },
      )
      .then((result) => {
        setReItem(!reitem)
        get_comment()
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  //this function to delet comment
  const delet_comment = (e) => {
    const id = e.target.value

    axios
      .delete(`http://localhost:5000/comments/${id}`, {
        headers: { Authorization: `Bearer  ${value.token.token}` },
      })
      .then((result) => {
        setReItem(!reitem)
        get_comment()
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const getComments = () => {
    return comments.length > 0
      ? comments.map((e) => {
          return (
            <div key={e._id}>
              <p>{e.offer.title}</p>
              <p>{e.comment}</p>
              <p>{e.time}</p>
              <p>{e.user.firstName}</p>
              {e.user._id === value.token._id ? (
                <div>
                  <p>{e.user._id}</p>
                  <Input
                    fun={item_input_update_comment}
                    className="additem-input"
                    text="Update Comment"
                  />
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
              ) : (
                ''
              )}
            </div>
          )
        })
      : ''
  }

  const itemFunction = () => {
    return (
      <div key={item._id} className="favorite-pop">
        {showcomment ? (
          <>
            {comments.length > 0 ? (
              getComments()
            ) : (
              <p>No Comment in this item</p>
            )}
            <br></br>
            <select
              placeholder="offer"
              className="additem-input"
              onChange={offer_input}
            >
              {offerFunction()}
            </select>
            <Input
              fun={item_input_comment}
              value={comment}
              className="additem-input"
              text="Add Comment"
            />
            <Button
              value={item._id}
              fun={add_comment}
              className="favorite-button"
              text="Add Comment"
            />
          </>
        ) : (
          ''
        )}
      </div>
    )
  }

  return (
    <div className="Favorite">
      <h1>comment</h1>
      <Button
          value={item._id}
          fun={show_comment}
          className="favorite-button"
          text="show comment"
        />
      {itemFunction()}
    </div>
  )
}

export default Comment