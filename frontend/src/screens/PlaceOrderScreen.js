import React, { useEffect } from 'react'
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../Components/Message'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../Actions/orderAction'
import { removeFromCart } from '../Actions/cartAction'
import { ORDER_CREATE_RESET } from '../Constants/orderConstants'

export default function PlaceOrderScreen() {
    const style = {
        height: '50px',
        width: '50px'
    };

    const history = useNavigate()
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = ((0.002) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)).toFixed(2)

    if (!cart.paymentMethod) {
        history('/payment')
    }

    useEffect(() => {
        if (success) {
            history(`/order/${order._id}`)
            dispatch({
                type:ORDER_CREATE_RESET
            })
        }
    }, [success, history, order])

    const placeorder = () => {
        dispatch(createOrder(
            {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }
        ))

        //  dispatch(removeFromCart())

    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h1>Shipping</h1>
                            <p>
                                <strong>Shipping:</strong>
                                {cart.shippingAddress.addr},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress._state},{cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h1>Payment Method</h1>
                            <p>
                                <strong>Payment:</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h1>Shipping</h1>
                            <div>
                                <strong>Order Items:</strong>
                                {cart.cartItems.length === 0 ? <Message varient={'info'} text='Your cart is empty'></Message> :
                                    (
                                        <ListGroup.Item>
                                            {cart.cartItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row >
                                                        <Col>
                                                            <Image src={item.Image} style={style} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`} >{item.name} </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} X Rs{item.price} = {(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
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
                                    <Col>Rs{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>Rs{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Rs{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Rs{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                error &&
                                <ListGroup.Item>
                                    <Message variant='danger' text={error}>{error}</Message>
                                </ListGroup.Item>
                            }
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeorder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
