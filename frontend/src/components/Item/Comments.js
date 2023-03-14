import './Item.css'
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../App'
import Paragraph from '../Paragraph/Paragraph'
import Input from '../Input/Input'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const Comment = ({item,setItem}) => {
  const value = useContext(AllContext)
  const navigate = useNavigate()

  const [offers, setOffers] = useState([])

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

  useEffect(() => {
    if (comments.length === 0) {
  axios.get(`http://localhost:5000/comments/item/${value.item_Id}`,{
    headers: { Authorization: `Bearer  ${value.token.token}`}})
  .then((result) => {
    console.log(result.data.result)
    setComments(result.data.result)
  })
  .catch((err) => {
    console.log(err.message)
    setComments([])
  })
}
}, [comments])

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
        <option className="item-input" key={offer._id} value={offer._id}>
          {offer.title}
        </option>
      )
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
        setComments([])
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
        setComments([])
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
        setComments([])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }


  const itemFunction = () => {
    return (
      <div className='comment-pop' >
            {comments.length > 0 ?
              <Row xs={1} md={1} className="g-4 comment-pop">
              {comments.map((e, idx) => (
                <Col>
                  <Card>
                    <Card.Img variant="top" src={e.offer.img} />
                    <Card.Body>
                      <Card.Title>{e.offer.title}</Card.Title>
                      <Card.Text>
                      {e.comment}
                      </Card.Text>
                    </Card.Body>
                    {e.user._id === value.token._id ? (
                <div>
                  <hr></hr>
                   <InputGroup style={{width:"50%",alignSelf: "center"}} onChange={item_input_update_comment} size="sm" className="mb-3">
        <InputGroup.Text  id="inputGroup-sizing-sm">Update Comment</InputGroup.Text>
        <Form.Control
          aria-label="Update Comment"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
          <Button className='comment-button' onClick={update_comment} value={e._id} >Update Comment</Button>
          <Button className='comment-button' onClick={delet_comment} value={e._id} >Delet Comment</Button>
                </div>
              ) : (
                ''
              )}
                  </Card>
                </Col>
              ))}
            </Row>:""
            }
            <br></br>
            <select
              placeholder="offer"
              className="item-input"
              onChange={offer_input}
            >
              {offerFunction()}
            </select>
            <InputGroup style={{width:"50%"}} onChange={item_input_comment} size="sm" className="mb-3">
        <InputGroup.Text  id="inputGroup-sizing-sm">Add Comment</InputGroup.Text>
        <Form.Control
          aria-label="Add Comment"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
            <Button className='comment-button' onClick={add_comment} value={item._id} >Add Comment</Button>{' '}
      </div>
    )
  }

  return (
    <div>
      {itemFunction()}
    </div>
  )
}

export default Comment
