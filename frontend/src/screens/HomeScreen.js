import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../Components/Product'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Actions/productActions";
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import SearchBar from '../Components/SearchBar';
import { useLocation } from 'react-router-dom';
import '../CSS/Home.css'
import Paginate from '../Components/Paginate';
import ProductCorousel from '../Components/ProductCorousel';


export default function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productlist)
  const { error, loading, products,page,pages } = productList
  const location = useLocation()
  let keyword = location.search

  useEffect(() => {
    try {
      dispatch(listProducts(keyword))
    } catch (e) {
      alert(e)
    }
  }, [dispatch, keyword])
  return (
    <div>
      <SearchBar />
      {!keyword &&
      <ProductCorousel />
      }
      <h1>Latest Products</h1>

      <Row>
        {
          loading ? <Loader />
            : error ? <Message varient={'danger'} text={error}></Message>
              :
              <>
                <div className='gridview'>
                  {
                    products.length === 0 ? ('Product not found') : (

                      products.map(product => (

                        <Product product={product} key={product._id} />

                      ))

                    )
                  }
                
                </div>
                <Paginate pages={pages} page={page} keyword={keyword} />

              </>
        }
      </Row>
    </div>
  )
}
