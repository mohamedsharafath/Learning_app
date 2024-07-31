import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signin.css';
import './img_undraw.svg'
import './undraw_learning_sketching_nd4f.svg'
import learningImage from './undraw_learning_sketching_nd4f.svg';

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
  const navigate=useNavigate();
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
        await axios.post('http://localhost:3030/register', signupData);
        alert('User Created');
        toggleCheck();
      } catch (error) {
        alert('Error creating user');
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email && password) {
      try {
        const response = await axios.get('http://localhost:3030/get');
        const userExist = response.data.some(
          (data) => data.email === email && data.password === password
        );
        if (userExist) {
          alert('Login successful');
          navigate("/home")
        } else {
          alert('User Not Found');
        }
      } catch (error) {
        console.error('Error fetching users', error);
        alert('Error logging in');
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <div className='page'>
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
        </form>
      </div>
    </div>
    </div>
  );
}

export default Signin;
