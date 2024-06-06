import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../Components/Rating'
import '../CSS/ProductScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../Actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { addToCart } from '../Actions/cartAction'
import { PRODUCT_CREATE_REVIEW_RESET } from '../Constants/productConstants'

export default function ProductScreen() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setCommant] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useNavigate()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productCreateReview = useSelector(state => state.productCreateReview)
  const { loading: loadingReview, error: errorReview, success: successReview } = productCreateReview

  useEffect(() => {
    if(successReview){
      setRating(0)
      setCommant('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(id))
  }, [id, dispatch,successReview])

  const AddToCartHandler = () => {
    dispatch(addToCart(id, qty))
    history('/cart')
    // history(`/Cart/${id}?qty=${qty}/`)
  }

  const submitReviewHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id,{
      rating,comment
    }))
  }
  return (
    <>

      {
        loading ? <Loader />
          : error ? (<Message varient="danger" text={error}></Message>) : (
            <>
              <Link to='/'>
                <button className='btn btn-light my-3'>Go Back</button>
              </Link>
              <div className='ProductScreen' style={{ padding: '50px' }}>
                <Row >
                  <Col margin={'2px'}>
                    {!loading && <Image src={product.image_url} alt={product.name} style={{ width: '40rem', height: '40rem', aspectRatio: '3/2', padding: '10px' }} loading='lazy' fluid />}
                    <br />
                  </Col>
                  <Col md={5}>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h3>{product.name}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h3>{product.brand}</h3>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Price : Rs{product.price}/-
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Original Price : Rs{product.originalPrice}/-
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Short Description : {product.shortDescription}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Description : {product.description}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews}`} clr={'#f8e825'} />
                      </ListGroup.Item>
                    </ListGroup>

                    <Col style={{ marginTop: '2rem' }}>
                      <Card>
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <Row>
                              <Col>Price:</Col>
                              <Col><strong>Rs{product.price}/-</strong></Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row>
                              <Col>Status:</Col>
                              <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          {
                            product.countInStock > 0 && (

                              <ListGroup.Item>
                                <Row>
                                  <Col>
                                    Quantity
                                  </Col>
                                  <Col xs='auto' className='my-1'>
                                    <Form.Control
                                      as='select'
                                      value={qty}
                                      onChange={(e) => setQty(e.target.value)}
                                    >
                                      {
                                        [...Array(product.countInStock).keys()].map((x) => (
                                          <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                          </option>
                                        ))
                                      }
                                    </Form.Control>
                                  </Col>
                                </Row>

                              </ListGroup.Item>

                            )}
                          {
                            product.countInStock > 0 ? (

                              <ListGroup.Item>
                                <Button
                                  onClick={AddToCartHandler}
                                  className="btn-block"
                                  disabled={product.countInStocks === 0}
                                  type='button'
                                >
                                  Add To Cart
                                </Button>
                              </ListGroup.Item>
                            ) : null
                          }
                        </ListGroup>
                      </Card>
                      <br />

                    </Col>
                  </Col>
                  <Row>
                    <h1>Product Galary</h1>
                    {!loading && <Image src={product.image} alt={product.name} style={{ maxWidth: '15rem', maxHeight: '15rem', aspectRatio: '3/2' }} fluid />}
                  </Row>
                  <Row >
                    <Col md={12} xl={12} lg={12} padding={'10px'}>
                      <h1>Review</h1>
                      {
                        product.reviews.length === 0 &&
                        <Message varient="info" text={'No Reviews'}></Message>
                      }

                      <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                          <ListGroup.Item key={review._id} style={{
                            maxWidth: '250px'
                          }}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} text={product.reviews.length} />
                            <p>{review.comment} </p>
                            <p>{review.createdAt.substring(0, 10)} </p>
                          </ListGroup.Item>
                        ))}
                        <br />
                        <ListGroup.Item>
                          <h4>Write a review</h4>
                          {loadingReview && <Loader />}
                          {successReview && <Message varient={'sucess'} text={'Review submitted'} />}
                          {errorReview && <Message varient={'danger'} text={errorReview} />}

                          {
                            userInfo ?
                              (
                                <Form onSubmit={submitReviewHandler}>
                                  <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                      as='select'
                                      value={rating}
                                      required
                                      onChange={(e) => setRating(e.target.value)}
                                      >
                                      <option value=''>Select...</option>
                                      <option value='1'>1</option>
                                      <option value='2'>2</option>
                                      <option value='3'>3</option>
                                      <option value='4'>4</option>
                                      <option value='5'>5</option>
                                    </Form.Control>
                                  </Form.Group>

                                  <Form.Group controlId='comment'>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                      as='textarea'
                                      required
                                      row='5'
                                      value={comment}
                                      onChange={(e) => setCommant(e.target.value)}
                                    ></Form.Control>
                                  </Form.Group>
                                  <br />
                                  <Button
                                    disabled={loadingReview}
                                    type='Submit'
                                    variant='primary'
                                  >
                                    Submit
                                  </Button>

                                </Form>
                              ) : (
                                <Message varient={'info'} >
                                  Please <Link to='/login'>login</Link> to write a review
                                </Message>
                              )
                          }
                        </ListGroup.Item>
                      </ListGroup>

                    </Col>
                  </Row>
                </Row>
              </div>
            </>
          )


      }


    </>
  )
}
