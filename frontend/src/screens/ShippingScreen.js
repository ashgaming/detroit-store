import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../Actions/cartAction'
import CheckoutSteps from './CheckoutSteps'
export default function ShippingScreen() {
    const history = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    useEffect(() => {
        if (user=={}) {
            history('/login')
        }
    }, [user])

    const dispatch = useDispatch()
    const [addr, setAddr] = useState(shippingAddress.addr)
    const [city, setCity] = useState(shippingAddress.city)
    const [_state, set_state] = useState(shippingAddress._state)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ addr, city, postalCode, _state, country }))
        history('/payment')
    }
    return (
        <FormContainer >
            <CheckoutSteps step1 step2 />
            <Form onSubmit={submitHandler} style={{ margin: '50px' }}>
                <h1>Shipping</h1>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter Address'
                        value={addr ? addr : ''}
                        onChange={(e) => setAddr(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='text'>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter Pincode'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='text'>
                    <Form.Label>State</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter State'
                        value={_state}
                        onChange={(e) => set_state(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='text'>
                    <Form.Label>Contry</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter name'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' varient='primary' style={{ marginTop: '20px' }}>Continue</Button>

            </Form>
        </FormContainer>
    )
}
