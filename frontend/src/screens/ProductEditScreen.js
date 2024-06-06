import React, { useState, useEffect } from 'react'
import { Link, redirect, useParams } from 'react-router-dom'
import { Form, Button, Image, Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { listProductDetails, updateProduct } from "../Actions/productActions";
import FormContainer from '../Components/FormContainer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_UPDATE_RESET } from '../Constants/productConstants';
import axios from 'axios';
import Product from '../Components/Product';
import { url,imgUrl as src } from '../Connections/connection'


export default function ProductEditScreen() {
    const { id } = useParams()
    const Location = useLocation()
    const navigate = useNavigate()

    const [productPreview, setProductPreview] = useState('')
    const [pid, setId] = useState(id)
    const [name, setname] = useState('')
    const [price, setPrice] = useState('')
    const [orignalPrice, setOrinalPrice] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [galary, setGalary] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDesription] = useState('')
    const [shortDescription, setShortDesription] = useState('')
    const [stock, setStock] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [galaryUploading, setGalaryUploading] = useState(false)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {

            if (!product.name || product._id !== Number(id)) {
                dispatch(listProductDetails(id))
            } else {
                setId(product._id)
                setname(product.name)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDesription(product.description)
                setShortDesription(product.shortDescription)
                setPrice(product.price)
                setOrinalPrice(product.originalPrice)
                setStock(product.countInStock)

                setProductPreview({
                    name: name,
                    image: image,
                    brand: brand,
                    category: category,
                    description: description,
                    shortDescription: shortDescription,
                    price: price,
                    orignalPrice:orignalPrice,
                    countInStock: stock,
                    galary:galary,
                })
            }

        }
    }, [dispatch, product, id, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            shortDescription,
            galary,
            orignalPrice,
            description,
            countInStock: stock,
        }))

        console.log(image , 'submittet')

    }


    const uploadFileHandler = async (e) => {
        setImage(e.target.files[0])
        const file = e.target.files[0]
        console.log(file)

        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post(url + 'api/products/upload/', formData, config)
            console.log(data.image.split('?')[0])
            setImage(data.image.split('?')[0])
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    const uploadGalaryHandler = async (e) => {
        setGalary(e.target.files[0])
        const file = e.target.files[0]
        const formData = new FormData()
       // file.map(()=>formData.append('galary', file[0]))
        formData.append('galary', id)
        formData.append('product_id', id)
        setGalaryUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post(url + 'api/products/upload/galary/', formData, config)
            setGalary(data.image)
            setGalaryUploading(false)
        } catch (error) {
            setGalaryUploading(false)
        }
    }

    const getLastImage = async (e) => {
        const formData = new FormData()
        formData.append('product_id', id)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'

                }
            }
            const { data } = await axios.put(url + 'api/products/upload/previous/', formData,config)
            const imageUrl = data.image.split('?')[0]
            console.log(imageUrl)
            setImage(imageUrl)
            
        } catch (error) {
            alert(e)
        }
    }


    return (
        <div >
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer product={productPreview}>
                <h1>Edit Product</h1>
                {loadingUpdate ? <Loader /> : errorUpdate && <Message varient='danger' text={error}></Message>}
                <h1>ID : {pid}</h1>
                {errorUpdate && <Message varient='danger' text={errorUpdate}>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message varient='danger' text={error}></Message> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Description'
                                required
                                value={description}
                                onChange={(e) => {
                                    setDesription(e.target.value)
                                }}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='shortDescription'>
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Short Description'
                                required
                                value={shortDescription}
                                onChange={(e) => {
                                    setShortDesription(e.target.value)
                                }}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text'
                                placeholder='category'
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>brand</Form.Label>
                            <Form.Control type='text'
                                placeholder='brand'
                                required
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number'
                                required
                                placeholder='0'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='originalPrice'>
                            <Form.Label>Real Price</Form.Label>
                            <Form.Control type='number'
                                required
                                placeholder='0'
                                value={orignalPrice}
                                onChange={(e) => setOrinalPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type='text'
                                placeholder='stock'
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <br />
                        {uploading ? <Loader /> :
                        <>
                            {image !== null && (<Image
                                width='100%'
                                height='200px'
                                src={image.toString()}
                                alt={product.name}
                                />)
                            }
                            </>
                        }
                        <Form.Label>Enter image</Form.Label>
                            <Form.Group controlId='image'>
                            <Form.Control
                                type='file'
                                placeholder='Enter Image'
                                src={image}
                                onChange={(e) => uploadFileHandler(e)}
                            >

                            </Form.Control>

                        </Form.Group>
                        <Button type='button'
                        onClick={getLastImage}
                        varient='primary' style={{ marginTop: '20px', marginBottom: '50px' }}>Last Image</Button>


                        {galary !== null && (<Image
                                width='100%'
                                height='200px'
                                src={src + galary.toString()}
                                alt={product.name}
                                />)
                            }
                        <Form.Group controlId='galary'>
                            <Form.Label>Enter Galary</Form.Label>
                            <Form.Control
                                type='files'
                                placeholder='Enter galary Images'
                                src={galary}
                                onChange={(e) => uploadGalaryHandler(e)}
                            >

                            </Form.Control>

                        </Form.Group>
                        <Button type='submit' varient='primary' style={{ marginTop: '20px', marginBottom: '50px' }}>Update</Button>
                    </Form>
                )
                }
            </FormContainer>
        </div>
    )
}
