import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel,Image} from 'react-bootstrap'
import { listTopProducts } from '../Actions/productActions'
import Loader from './Loader';
import Message from './Message';
import '../CSS/courausel.css'
import { imgUrl as src } from '../Connections/connection'


export default function ProductCorousel() {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state=>state.productTopRated)
    const {error ,loading,products}= productTopRated

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])
  return (
    loading?<Loader /> :
    error ? <Message varient='danger' error={error}></Message>:
    (
        <Carousel pause='hover' className='bg-dark'>
            {products.map((product)=>(
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <div className='couraosel-product-container'>
                        <Image className='co_image' src={product.image_url} alt={product.name} fluid loading='lazy'/>
                        </div>
                        <Carousel.Caption classname='carousel.caption heading'>
                            <h4 className='heading_name'>{product.name}</h4> 
                            <h4 className='heading_price'> &#x20B9;{product.price}</h4> 
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            )

            )}
        </Carousel>
    )
  )
}
