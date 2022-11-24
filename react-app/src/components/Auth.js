import React, { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../Slices/authSlice";
import { register } from "../Slices/authSlice";
import Navbar from './Navbar';

const Auth = ()=> {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const dispatch = useDispatch();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;  
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log({ email, password });

    if (email && password) {
      dispatch(login({email, password}))
        .then(() => {
            navigate('/');
        })
        .catch();
    } else {
      
      alert("gerekli alanlar boş olamaz");
    }
  };
  let [searchParams, setSearchParams] = useSearchParams();
  const handleRegister = (e) => {
    e.preventDefault();
    let key = searchParams.get('key')
    
    console.log({ name, email, password,key });
    
    if (name && email && password) {
      dispatch(register({name, email, password, key}))
        .then(() => {
            navigate('/Auth');
        })  
        .catch();
    } else {
      
      alert("gerekli alanlar boş olamaz");
    }
  };

  if (authMode === "signin") {
    return (
      <>
      <Navbar/>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={onChangeEmail}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={onChangePassword}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" onClick={handleLogin} className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot 
            </p>
          </div>
        </form>
      </div>
      </>
    )
  }

  return (
    <><Navbar/>
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
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
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={handleRegister} className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot 
          </p>
        </div>
      </form>
    </div>
    </>
  )
}

export default  Auth;