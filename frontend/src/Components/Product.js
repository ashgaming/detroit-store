import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import '../CSS/glowBtn.css'
import '../CSS/Home.css'
import { imgUrl as url } from '../Connections/connection'



export default function Product({ product }) {
    const StarColor = {
        Color: 'black',
    }


    return (

        <Card className='my-1 p-3 rounded cardStyle'>
            <Link to={`/Product/${product._id}`}>
                <Card.Img className='CardImg' src={product.image_url} alt={product.name} loading='lazy' />
            </Link>

            <Card.Body>
                <Link to={`/Product/${product._id}`} className='titleText'>
                    <Card.Title as='div'>
                        <strong >{product.name}</strong>
                    </Card.Title>
                </Link>
{/** 
 * 
                <Card.Text as='div'>
                    <span className='my-3'>
                        <Rating clr={StarColor} value={product.rating} text={product.numReviews} />
                    </span>
                </Card.Text>
                    */}
                <Card.Text as='h6'>
                    &#x20B9; {product.price}/-
                    <span className='sale-price-container'>

                        <del className='sale-price'>

                            &#x20B9; {product.originalPrice}
                        </del>
                    </span>
                </Card.Text >
            </Card.Body>
        </Card>



    )
}
