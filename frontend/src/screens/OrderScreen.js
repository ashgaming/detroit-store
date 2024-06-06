import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import { getOrderDetails, payOrder, orderDeliver, deliverOrder } from '../Actions/orderAction'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../Constants/orderConstants'
export default function OrderScreen() {
    const style = {
        height: '50px',
        width: '50px'
    };

    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && !error) {
        order.itemsPrice = order.OrderItem.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    // convert this according to google pay and paytm later
    const addGooglePayScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        setSdkReady(true)
        document.body.appendChild(script)
    }


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVERED_RESET })
            dispatch(getOrderDetails(id))
        }
        else if (!order.isPaid) {
            if (!window.GooglePay) {
                addGooglePayScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [id, dispatch, order, successPay, successDeliver])


    const paymentHandler = (paymentResult) => {
        dispatch(payOrder(id))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message varient='danger' text={error} />
    )
        : (
            <>

                <div>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h1>

                                        <strong>Order Number:</strong>
                                        {
                                            order._id
                                        }
                                    </h1>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h1>Shipping</h1>
                                    <p>  <strong>Name:</strong> {order.user.name} </p>
                                    <p>  <strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>
                                    <p>
                                        <strong>Shipping:</strong>
                                        {order.shippingAddress.addr},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress._state},{order.shippingAddress.country}
                                    </p>
                                    {
                                        order.isDelivered ? (
                                            <Message varient='success' text={`Delivered on ${order.deliveredAt}`} />
                                        ) :
                                            (
                                                <Message varient='warning' text={`Not Delelivered`} />

                                            )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h1>Payment Method</h1>
                                    <p>
                                        <strong>Payment:</strong>
                                        {order.paymentMethod}
                                    </p>
                                    {
                                        order.isPaid ? (
                                            <Message varient='success' text={`Paid on ${order.paidAT}`} />
                                        ) :
                                            (
                                                <Message varient='warning' text={`Not Paid`} />

                                            )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h1>Shipping</h1>
                                    <div>
                                        <strong>Order Items:</strong>
                                        {order.OrderItem.length === 0 ? <Message varient={'info'} text='Your order is empty'></Message> :
                                            (
                                                <ListGroup.Item>
                                                    {order.OrderItem.map((item, index) => (
                                                        <ListGroup.Item key={index}>
                                                            {order &&
                                                                <Row >
                                                                    <Col>
                                                                        <Image src={'http://127.0.0.1:8000/static' + item.image} style={style} alt={item.name} fluid rounded />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link to={`/product/${item.product}`} >{item.name} </Link>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        {item.qty} X Rs{item.price} = {(item.qty * item.price).toFixed(2)}
                                                                    </Col>
                                                                </Row>
                                                            }
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup.Item>
                                            )}
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items:</Col>
                                            <Col>Rs{order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col>Rs{order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col>Rs{order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total:</Col>
                                            <Col>Rs{order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) :
                                                (
                                                    //replace this with google pay button
                                                    <Button
                                                        amount={order.totalPrice}
                                                        onClick={paymentHandler}
                                                    >Pay</Button>
                                                )}
                                        </ListGroup.Item>
                                    )}

                                </ListGroup>
                                {loadingDeliver && <Loader />}
                                {
                                    userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered ? (
                                        <ListGroup.Item>
                                            <Button
                                                type='button'
                                                style={{ margin: '25px' }}
                                                onClick={deliverHandler}
                                            >
                                                Mark as Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )
                                        :
                                        (
                                            <ListGroup.Item>
                                                <Link
                                                to='/'
                                                >
                                                    <Button
                                                        type='button'
                                                        style={{ margin: '25px' }}
                                                    >
                                                        Back
                                                    </Button>
                                                </Link>
                                            </ListGroup.Item>
                                        )
                                }

                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        )
}