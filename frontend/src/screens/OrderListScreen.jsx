import React,{useEffect} from 'react'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { LinkContainer } from 'react-router-bootstrap';
import {useNavigate} from 'react-router-dom'
import { Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import { listOrders } from '../Actions/orderAction';

export default function OrderListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderlist = useSelector(state=>state.orderlist)
    const {loading,error,orders} = orderlist

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

  //  const userDelete = useSelector(state=>state.userDelete)
  //  const {loading:loadingDelete,error:errorDelete,success:successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate,userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure want to delete order')){
          //  dispatch(deleteUsers(id))
        }
    }

    const titleList = ['ID','USER','DATE','AMOUNT','PAID','DELIVERED']
  return (
    <div>
        <h1>Orders</h1>
        {
        loading?(<Loader />):
        error?(<Message varient='danger' text={error}></Message>):
        (

            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    {
                        titleList.map((title,index)=>(
                            <th className='align-text-center' key={index}>{title}</th>
                        ))
                    }
                
                    <th></th>
                </thead>
                <tbody>
                    {orders.map(order=>(
                        
                        <tr key={order._id}>
=                            <td>{order._id}</td>
                            <td>{order.user.username}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>Rs{order.totalPrice}</td>
                            <td>{order.isPaid ? <article style={{backgroundColor:'green'}} className='activesignal'></article>:
                            <article style={{backgroundColor:'red'}}className='activesignal'></article>}</td>

                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10):'waiting'}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                <Button varient='danger' className='btn-sm'>
                                    Edit
                                </Button>
                                </LinkContainer>
                            </td>                    
                        </tr>
                    ))}
                </tbody>
            </Table>


            
        )}
    </div>
  )
}
