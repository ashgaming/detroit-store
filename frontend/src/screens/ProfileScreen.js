import React, { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from "../Actions/userAction";
import { USER_UPDATE_PROFILE_RESET } from '../Constants/userConstants'
import { listMyOrders } from '../Actions/orderAction'

export default function ProfileScreen() {
    const history = useNavigate()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const myorderlist = useSelector(state => state.myorderlist)
    const { loading: loadingOrders, error: errorOrder, orders } = myorderlist

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setUsername(user.username)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== cpassword) {
            setMessage('Password do not match')
        }
        else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'username': username,
                'email': email,
                'password': password,
            }))
        }
    }
    const titleList = ['ID','Date','Total','Paid','Delelivered','DETAILS']
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message varient='danger' text={message}>{message}</Message>}
                {error && <Message varient='danger' text={error}></Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='text'>
                        <Form.Label>Enter Name</Form.Label>
                        <Form.Control type='text'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text'
                            placeholder='Enter username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='text'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='password'>
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='cpassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password'
                            placeholder='Confirm Password'
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' varient='primary' style={{ marginTop: '20px' }}>Update</Button>

                </Form>
            </Col>

            <Col md={8}>
                <h2>My Order</h2>
                {
                    loadingOrders ?
                        (
                            <Loader />
                        ) : errorOrder ? (
                            <Message varient='danger' text={errorOrder} />
                        ) :
                            (
                                <Table striped responsive className='table-sm'>
                                    <thead>
                                <tr>

                                        {titleList.map((title,i) => (
                                            <th key={i}>{title}</th>
                                            ))}
                                            </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            orders.map(order => (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>{order.isPaid ? order.paidAT.substring(0, 10) : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}>-</i>
                                                    )} </td>
                                                    <td>
                                                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}>Not Delelivered</i>
                                                    )}
                                                        
                                                    </td>
                                                    <td>
                                                        <LinkContainer to={`/order/${order._id}`}>
                                                            <Button className='btn-sm' style={{
                                                                backgroundColor: 'red',
                                                                color: 'red',
                                                            }}>DETAILS</Button>

                                                        </LinkContainer>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            )

                }
            </Col>
        </Row>
    )
}
