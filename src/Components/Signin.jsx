import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signin.css';
import learningImage from './undraw_learning_sketching_nd4f.svg';
import { toast, ToastContainer } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
  const [isChecked, setIsChecked] = useState(false);
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { username, email, name, password } = signupData;
    if (username && email && name && password) {
      try {
        // Check if the email already exists
        const response = await axios.get('http://localhost:3030/get');
        const emailExists = response.data.some(
          (user) => user.email === email
        );
        if (emailExists) {
          toast.error('Email already exists');
        } else {
          // If email does not exist, proceed with sign-up
          await axios.post('http://localhost:3030/register', signupData);
          toast.success('User Created');
          toggleCheck();
        }
      } catch (error) {
        toast.error('Error creating user');
      }
    } else {
      toast.warning('Please fill all the fields');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email && password) {
      try {
        const response = await axios.get('http://localhost:3030/get');
        const user = response.data.find(
          (data) => data.email === email && data.password === password
        );
        if (user) {
          toast.success('Login successful');
          console.log(user);
          // setSignupData(userExist);
          // console.log(signupData);
          navigate("/home",{ state: { name: user.name } });
        } else {
          toast.error('User Not Found');
        }
      } catch (error) {
        console.error('Error fetching users', error);
        toast.error('Error logging in');
      }
    } else {
      toast.warning('Please fill all the fields');
    }
  };

  return (
    <div className='page'>
      <ToastContainer />
      <div className="project-info">
        <h1>
          Welcome to <span className="highlight">MY TUTOR</span>! Your personal AI based assistance. 
        </h1>
        <img src={learningImage} alt="learning" className='page_image'/>
      </div>
      <div className="main">
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={isChecked}
          onChange={toggleCheck}
        />

        <div className="signup">
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="chk" aria-hidden="true" className="form-label">
              Sign up
            </label>
            <input
              type="text"
              name="username"
              placeholder="User name"
              required
              className="input-field"
              onChange={handleSignupChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="input-field"
              onChange={handleSignupChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="input-field"
              onChange={handleSignupChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input-field"
              onChange={handleSignupChange}
            />
            <button className="submit-button" type="submit">
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true" className="form-label">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="input-field"
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input-field"
              onChange={handleLoginChange}
            />
            <button className="submit-button" type="submit">
              Login
            </button>
            <div className='oauth-sec'>
            <GoogleLogin
              onSuccess={credentialResponse => {
                toast.success('Login successful');
                const decode = jwtDecode(credentialResponse.credential)
                console.log(decode);
                navigate("/home", { state: { decode } });
              }}
              onError={() => {
                toast.error('Error logging in');
                console.log('Login Failed');
              }}
            />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
