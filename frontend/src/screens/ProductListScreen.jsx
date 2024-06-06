import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { deleteProduct, listProducts, createProduct, } from '../Actions/productActions';
import '../CSS/userlist.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../Constants/productConstants';
import Paginate from '../Components/Paginate';
//import { imgUrl as src } from '../Connections/connection'


export default function ProductListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    let keyword = location.search
    
    const productlist = useSelector(state => state.productlist)
    const { loading, error, products,page,pages } = productlist

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate,keyword])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure want to delete product')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }

    const titleList = ['No', 'ID', 'Image', 'NAME', 'PRICE', 'CATEGORY', 'BRAND', 'STOCK', 'EDIT', 'DELETE']
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button style={{ backgroundColor: 'black' }} className='my-3' onClick={createProductHandler}>
                        Create Products
                    </Button>
                </Col>
                {loadingDelete && <Loader />}
                {errorDelete && <Message varient={'danger'} text={errorDelete} />}

                {loadingCreate && <Loader />}
                {errorCreate && <Message varient={'danger'} text={errorCreate} />}
            </Row>
            {
                loading ? (<Loader />) :
                    error ? (<Message varient='danger' text={error}></Message>) :
                        (
                            <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    {
                                        titleList.map((title, index) => (
                                            <th className='align-text-center' key={index}><center>{title}</center></th>
                                        ))
                                    }

                                    <th></th>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        
                                        <tr key={product._id} >
                                            <td>{index + 1}</td>
                                            <td>41435{product._id}</td>
                                            <td>
                                                <img
                                                    height={'40px'}
                                                    width={'40px'}
                                                    src={product.image_url}
                                                    alt={product.name}
                                                />
                                            </td>

                                            {console.log(product.image_url)}

                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td style={{
                                                color: product.countInStock === 0 ? 'red' : 'green'
                                            }}>{product.countInStock}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button varient='danger' className='btn-sm m-1'>
                                                        Edit
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                            <td>

                                                <Button varient='danger' className='btn-sm m-1' onClick={() => deleteHandler(product._id)}>
                                                    Delete
                                                </Button>
                                            </td>


                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate page={page} pages={pages} keyword={keyword} isAdmin={true}/>

                                    </div>
                        )}
        </div>
    )
}



