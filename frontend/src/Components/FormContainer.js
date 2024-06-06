import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Product from './Product'

export default function FormContainer({ children, product }) {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
