import React, { useState } from "react";
import axios from "axios";


import { useNavigate } from "react-router-dom";

const Signup = () => {
  // const API_KEY = "https://65a6826f74cf4207b4f03d71.mockapi.io/users/user";

  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  // const checkUserExists = async (username, password) => {
  //   const response = await axios.get(API_KEY);

  //   return response.data.some(
  //     (data) => data.Username === username && data.password === password
  //   );
  // };

  // const handleChange =(e) => {
  //   const { name, value } = e.target;
  //   setuser(prevState => ({
  //       ...prevState,
  //       [name]: value,
  //   }));
  // }
  const handleName = (e) => {
    setuser({ ...user, username: e.target.value });
  };

  const handleEmail = (e) => {
    setuser({ ...user, email: e.target.value });
  };

  const handlePassword = (e) => {
    setuser({ ...user, password: e.target.value });
  };

  const handlename = (e) => {
    setuser({ ...user, name: e.target.value });
  };

  const checkEmpty = () => {
    if (
      user.username !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.mobile !== ""
    ) {
      return true;
    } else return false;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const isEmpty  = checkEmpty();

    if (isEmpty) {
      // const userExist = await checkUserExists(user.username, user.password);
      // if (userExist) {
        // alert("User already exist")
      //   navigate("/login");
      // }
      // else {
        axios.post('http://localhost:3030/register', user);
        alert("User Created")
        navigate("/login");
      // }
    } 
    else {
      alert("please fill all the fields");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="login-page-wrapper">
        {/* <div className="logo-container"> */}
        <div id="login-form">
          <h2 className="title">SignUp </h2>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            onChange={handleName}
          />
          <input
            className="input-field"
            type="text"
            placeholder="email"
            onChange={handleEmail}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            onChange={handlename}
          />
          <button
            onClick={handleSignUp}
            className="submit-button"
            type="submit"
          >
            SignUp
          </button>
          <p >
            Already have an account ?{" "}
            <a
              
              target="_blank"
              style={{ cursor: "pointer" }}
              onClick={goToLogin}
            >
              Login
            </a>{" "}
          </p>
        </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Signup;