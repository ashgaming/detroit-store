import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
    const enableLink = {
        color:'black',
    }
    
    const disableLink = {
        color:'grey',

    }
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {
                    step1 ? (
                        <LinkContainer to='/login' style={enableLink}>
                            <Nav.Link >Login</Nav.Link>
                        </LinkContainer>
                    ) :
                        (
                            <Nav.Link style={disableLink}>Login</Nav.Link>
                        )
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step2 ? (
                        <LinkContainer to='/shipping' style={enableLink}>
                            <Nav.Link >Shipping Address</Nav.Link>
                        </LinkContainer>
                    ) :
                        (
                            <Nav.Link style={disableLink}>Shipping Address</Nav.Link>
                        )
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step3 ? (
                        <LinkContainer to='/payment' style={enableLink}>
                            <Nav.Link >Payment</Nav.Link>
                        </LinkContainer>
                    ) :
                        (
                            <Nav.Link style={disableLink}>Payment</Nav.Link>
                        )
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step4 ? (
                        <LinkContainer to='/placeorder' style={enableLink}>
                            <Nav.Link >Place Order</Nav.Link>
                        </LinkContainer>
                    ) :
                        (
                            <Nav.Link style={disableLink}>Place Order</Nav.Link>
                        )
                }
            </Nav.Item>

        </Nav>
    )
}
