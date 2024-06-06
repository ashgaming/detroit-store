import React, { Children } from 'react'
import { Alert } from 'react-bootstrap'

export default function Message({varient,text,children}) {
  return (
    <Alert key={varient} variant={varient}> 
    {children? children : text}
    </Alert>
  )
}
