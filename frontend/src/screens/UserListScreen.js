import React,{useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { listUsers ,deleteUsers} from '../Actions/userAction';
import '../CSS/userlist.css'
import {useNavigate} from 'react-router-dom'
export default function UserListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userList = useSelector(state=>state.userList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=>state.userDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate,successDelete,userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure want to delete user')){
            dispatch(deleteUsers(id))
        }
    }

    const titleList = ['ID','NAME','EMAIL','Last_Login','Last_Login_Time','Joined_Date','Active','Admin','EDIT','DELETE']
  return (
    <div>
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
                    {users.map(user=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.last_login && user.last_login.substring(0,10)}</td>
                            <td>{user.last_login && user.last_login.substring(11,16)}</td>
                            <td>{user.date_joined && user.date_joined.substring(0,10)}</td>
                            <td>{user.isActive ? <article style={{backgroundColor:'green'}} className='activesignal'></article>:
                            <article style={{backgroundColor:'red'}}className='activesignal'></article>}</td>
                            <td>{user.isAdmin ? <article style={{backgroundColor:'green',padding:'2px'}}>Admin</article>:
                            <article style={{backgroundColor:'Yellow',padding:'2px'}}>user</article>}</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button varient='danger' className='btn-sm'>
                                    Edit
                                </Button>
                                </LinkContainer>
                            </td>
                            <td>

                                <Button varient='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                    Delete
                                </Button>
                            </td>

                            
                        </tr>
                    ))}
                </tbody>
            </Table>


            
        )}
    </div>
  )
}
