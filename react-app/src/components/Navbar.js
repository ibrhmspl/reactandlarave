import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from "../Slices/authSlice";
import { useSelector } from 'react-redux';


export default function Example(args){
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user')) ;
  const logOut = () => {
    dispatch(logout())
          .then(() => {
              navigate("/");
          })
          .catch();
    }

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  function log(){
    navigate('/Auth')
  }
  function logAdmin(){
    navigate('/Admin')
  }
  function logStore(){
    navigate('/StoreManagement')
  }

  const products = useSelector((state) => state.product);
  
  return (
    <div>
      <Navbar style={{backgroundColor: '#424242', height:'80px'}} {...args}>
        <NavbarBrand  className='text-light ' href="/">E-Ticaret</NavbarBrand>
        <Collapse isOpen={isOpen} >
          <Nav  className="me-auto" >
          <Form className="d-flex">
          <Autocomplete
            id="combo-box-demo"
            options={products.map((option) => option.name)}
            style={{width:"15rem", backgroundColor:"white"}}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
                </Form> 
                {user? (<UncontrolledDropdown nav inNavbar> 
              <DropdownToggle className='text-light ' nav caret>
                {user.user.name}
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem onClick={logOut}>
                  logout
                </DropdownItem>
                {(user.user.user_level=="0") &&
                <DropdownItem onClick={logAdmin}>
                  Admin
                </DropdownItem>}
                {(user.user.user_level=="1" || user.user.user_level=="2")&&
                <DropdownItem onClick={logStore}>
                  Store
                </DropdownItem>}
              </DropdownMenu>
            </UncontrolledDropdown>):(
              <UncontrolledDropdown nav inNavbar> 
              <DropdownToggle className='text-light ' nav caret>
                Sign In 
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem onClick={log}>
                  login
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            )}  
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    
  );
}
