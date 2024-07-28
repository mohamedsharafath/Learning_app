import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import "./log.css"
import '../App.css';

export default function Login() {
  const [loguser,setuser]=useState({
    email:"",
    password:"",
  });
  // const [user, setuser1] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   name: "",
  // });
  // const [loguser, setuser] = useState({
  //   email: "",
  //   password: "",
  // });
  const navigate = useNavigate();
  const checkEmpty = () => {
    if (
     
      loguser.email !== "" &&
      loguser.password !== "" 
      
    ) {
      return true;
    } else return false;
  };
  const checkUserExists = async (email, password) => {
    const response = await axios.get('http://localhost:3030/get');
    console.log(response.data)
    return response.data.some(
      (data) => data.email === email && data.password === password
      
    );
  };
  const handleEmail = (e) => {
    setuser({ ...loguser, email: e.target.value });
  };

  const handlePassword = (e) => {
    setuser({ ...loguser, password: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const isEmpty  = checkEmpty();

    if (isEmpty) {
      const userExist = await checkUserExists(loguser.email, loguser.password);
      if (userExist) {
        // alert("User already exist")
        navigate("/home", { state: { loguser } });
      }
      else {
        // axios.post('http://localhost:2000/register', user);
        alert("User Not Found")
        // navigate("/login");
      }
    } 
    else {
      alert("please fill all the fields");
    }
  };

  return (
    <>
    <div className="login-page-wrapper">
        {/* <div className="logo-container"> */}
        <div id="login-form">
          <h2 className="title">Login </h2>
          
          <input
            className="input-field"
            type="text"
            placeholder="Email"
            onChange={handleEmail}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />
          
          <button
            onClick={handleLogin}
            className="submit-button"
            type="submit"
          >
            Login
          </button>
          
        </div>
        </div>
      {/* </div> */}
    </>
  )
}
