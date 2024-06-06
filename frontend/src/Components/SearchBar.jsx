import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import '../CSS/SearchBar.css'

export default function SearchBar() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate(pathname)
        }

    }
    return (
        <div>
            <h1 style={{
                justifySelf:'left'
            }}>Search Products</h1>
        <Form onSubmit={submitHandler} className='searchContainer'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
                
                ></Form.Control>
            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
                >
                Search
            </Button>
        </Form>
                </div>
    )
}
