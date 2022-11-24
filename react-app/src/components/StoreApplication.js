import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {postStore} from '../Slices/storeSlice';
import { postTmpStore } from "../Slices/tmpStoreSlice"; 
import Navbar from './Navbar';

function StoreApplication() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [adress, setAdress] = useState();
    const [tel, setTel] = useState();
    
    let navigate = useNavigate();
    const dispatch = useDispatch();
  
    const onChangeName = (e) => {
      const name = e.target.value;
      setName(name);
    };
    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };
    const onChangeAdress = (e) => {
      const adress = e.target.value;  
      setAdress(adress);
    };
    const onChangeTel = (e) => {
        const tel = e.target.value;  
        setTel(tel);
      };

    const handleStorePost = (e) => {
        e.preventDefault();
        console.log({ name, email, adress, tel });
          dispatch(postTmpStore({name, email, adress, tel}))
            .then(() => {
                navigate('/');
                alert("Store başvurunuz alınmıştır. Onay bekleniyor");  
            })
            .catch();
         
      };
      
    

  return (
    <>
    <Navbar/><br/><br/>
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Mağaza Başvuru</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={onChangeName}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={onChangeEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>Adress</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Password"
              onChange={onChangeAdress}
            />
          </div>
          <div className="form-group mt-3">
            <label>Telefon</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Password"
              onChange={onChangeTel}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit"  className="btn btn-primary" onClick={handleStorePost}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}

export default StoreApplication
