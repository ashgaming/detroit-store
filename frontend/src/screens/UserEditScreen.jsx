import React, { useState, useEffect } from 'react'
import { Link, redirect, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { getUserDetails,updateUsers } from "../Actions/userAction";
import FormContainer from '../Components/FormContainer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../Constants/userConstants';

export default function UserEditScreen() {
    const { id } = useParams()
    const Location = useLocation()
    const navigate = useNavigate()

    const [name, setname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = userUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }

        if(!user.name || user._id !== Number(id)){
            dispatch(getUserDetails(id))
        }else{
            setname(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
            setUsername(user.username)
        }
    }, [user,id,successUpdate,navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUsers({_id:user._id,name,email,isAdmin,username}))

    }
    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {errorUpdate && <Message varient='danger' text={errorUpdate}>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message varient='danger' text={error}></Message> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='text'>
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text'
                                placeholder='Enter username'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='text'
                                required
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='isAdmin'>
                            <Form.Check 
                                type='checkbox'
                                Label={'Is Admin'}
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                                <Form.Label>Is Admin</Form.Label>
                        </Form.Group>

                        <Button type='submit' varient='primary' style={{ marginTop: '20px' }}>Update</Button>

                    </Form>
                )
                }

            </FormContainer>

        </div>
    )
}
