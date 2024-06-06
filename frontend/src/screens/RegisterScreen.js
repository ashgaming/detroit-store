import React,{useState,useEffect} from 'react'
import { Link, redirect } from 'react-router-dom'
import { Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { register } from "../Actions/userAction";
import FormContainer from '../Components/FormContainer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function RegisterScreen() {
    const Location = useLocation()
    const history = useNavigate()
    const [name,setname] = useState('')
    const [username,setUsername]=useState('')
    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const [cpassword,setCpassword] = useState('')
    const [message,setMessage] = useState('')
  
    const dispatch = useDispatch()
  
    const redirect = Location.search ? Location.search.split('=')[1] : '/'
  
    const userRegister = useSelector(state=>state.userRegister)
    const {error,loading,userInfo} = userRegister
  
    useEffect(()=>
    {
      if(userInfo){
        history(redirect)
      }
    },[history,userInfo,redirect])
  
    const submitHandler = (e) =>{
        e.preventDefault()
        if(password!=cpassword)
        {
          setMessage('Password do not match')
        }
        else{          
          dispatch(register(name,username,email,password))
        }
    }
    return (
      <FormContainer>
        <h1>Sign In</h1>
        {message && <Message varient='danger' text={message}>{message}</Message>}
        {error && <Message varient='danger' text={error}></Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='text'>
            <Form.Label>Enter Name</Form.Label>
            <Form.Control type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e)=>setname(e.target.value)}
            required
            ></Form.Control>
          </Form.Group>
        
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text'
            placeholder='Enter username'
            required
            value={username}
            onChange={(e)=>setUsername(e.target.value)}></Form.Control>
          </Form.Group>


          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='text'
            required
            placeholder='Enter Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}></Form.Control>
          </Form.Group>

  
          <Form.Group controlId='password'>
            <Form.Label>Enter Password</Form.Label>
            <Form.Control type='password'
            placeholder='Enter Password'
            value={password}
            required
            onChange={(e)=>setpassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='cpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password'
            placeholder='Confirm Password'
            value={cpassword}
            required
            onChange={(e)=>setCpassword(e.target.value)}></Form.Control>
          </Form.Group>
  
          <Button type='submit' varient='primary' style={{marginTop:'20px'}}>Register</Button>
  
        </Form>
  
        <Row>
          <Col>
                Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
          </Col>
        </Row>
      </FormContainer>
    )
}
