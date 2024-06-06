import React from 'react'
import {Row, Col } from 'react-bootstrap'
import '../CSS/Footer.css'

export default function Footer() {

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    maxWidth:'1992px',
    
  }
  return (
    <footer className='FooterBack'>
     
        <Row>
          <Col className='text-center' style={{style}}>copyright &copy; yolo menswear</Col>
        </Row>

    </footer>
  )
}
