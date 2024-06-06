import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../Actions/userAction';
import '../CSS/header.css'
//import SetTheme from './SetTheme';

export default function Headers({ clr, bclr }) {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <LinkContainer to='/'>
          <Navbar.Brand className="navbar-brand brand-name" >Detroit Watch</Navbar.Brand>
        </LinkContainer>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse container-div" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto container-div">
            <li className="nav-item">
              <LinkContainer to='/cart'>
                <Nav.Link>Cart</Nav.Link>
              </LinkContainer>
            </li>
            <li className="nav-item">
              <LinkContainer to='/about'>
                <Nav.Link>About Us</Nav.Link>
              </LinkContainer>
            </li>

            {userInfo && userInfo.isAdmin && (
              <li>
              <NavDropdown title={'Admin'} id='adminMenu' className='bg-dark text-white'>
                <LinkContainer to='/admin/userlist' >
                  <NavDropdown.Item className='bg-dark text-white'>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist' >
                  <NavDropdown.Item className='bg-dark text-white'>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist' >
                  <NavDropdown.Item className='bg-dark text-white'>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              </li>
            )
          }

            <li className='login-link'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile' >
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) :
                (
                  <LinkContainer to='/Login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                )
              }
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
