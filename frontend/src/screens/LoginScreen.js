import React,{useState,useEffect} from 'react'
import { Link, redirect } from 'react-router-dom'
import { Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { login } from "../Actions/userAction";
import FormContainer from '../Components/FormContainer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function LoginScreen() {
  const Location = useLocation()
  const history = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setpassword] = useState('')

  const dispatch = useDispatch()

  const redirect = Location.search ? Location.search.split('=')[1] : '/'

  const userLogin = useSelector(state=>state.userLogin)
  const {error,loading,userInfo} = userLogin

  useEffect(()=>
  {
    if(userInfo){
      history(redirect)
    }
  },[history,userInfo,redirect])

  const submitHandler = (e) =>{
      e.preventDefault()
      dispatch(login(email,password))
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message varient='danger' text={error}></Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='text'
          placeholder='Enter Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e)=>setpassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' varient='primary' style={{marginTop:'20px'}}>Sign In</Button>

      </Form>

      <Row>
        <Col>
              New Customer?<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
