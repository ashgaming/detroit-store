import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart, removeFromCart } from '../Actions/cartAction'

export default function CartScreen() {
  const history = useNavigate()
  const { id } = useParams()
  const searchParams = new URLSearchParams(window.location.search);
  const qty = searchParams.get('qty')
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [id, dispatch, qty,cart])
  
  

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    history(`/shipping`)
  }
  return (
    <Row >
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ? (
            <>
              <Message varient='info' text={'Your Cart is empty'}>
              </Message>
              
                <Link to='/'><Button>Go Back</Button></Link>
              
            </>

          ) :
            (
              <ListGroup variant='flush'>
                {
                  cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                     <Row>
                        <Col md={2}>
                          <Image src={item.Image} width={'100px'} height={'400px'} alt={item.product} fluid rounded />
                        </Col>               
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>
                          Rs {item.price}/-
                        </Col>
                        <Col md={2}>
                          <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                          >
                            {
                              [...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            }
                          </Form.Control>
                        </Col>

                        <Col md={1}>
                          <Button
                            type='button'
                            variant='light'
                            onClick={(() => removeFromCartHandler(item.product))}
                            >
                            <i className='fas fa-trash'>Cancel</i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))

                }
              </ListGroup>
            )
          }
          </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush' >
            <ListGroup.Item>
              <h1>
                SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
              </h1>
              Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
          </ListGroup>
          {
            cartItems.length !== 0 ? (
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.lenght === 0}
                  onClick={checkoutHandler}>
                  Proceed To CheckOut
                </Button>
              </ListGroup.Item>
            ) : null
          }
        </Card>
      </Col>
    </Row>
  )
}