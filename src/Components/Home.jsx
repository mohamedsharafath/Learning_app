import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FileUpload from '../Frontend/FileUpload/FileUpload';
import work from './undraw_work_from_anywhere_re_s2i6.svg';
import education from './undraw_education_f8ru.svg';
import SocialLinks from './SocialLinks';
import FeedbackForm from './FeedbackForm';
import TestimonialsSection from './Testimonial/TestimonialSection';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
// import pub from '../my-tutor-logo.png';
import './home.css'; // Adjust the path if necessary

const Home = ({ setfunc }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkTheme, setDarkTheme] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { decode, name } = location.state || {};

  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS with custom options
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleThemeToggle = () => {
    setDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme', !isDarkTheme);
  };

  return (
    <div className={`container ${isDarkTheme ? 'dark-theme' : ''}`} style={{background:"var(--background-color)"}}>
      <header className="header" data-aos="fade-down">
        {/* <img src={pub} alt="Logo" style={{width:"100px",height:"100px"}} /> */}
        <h1 className="logo">MY <span style={{ color: "#F6B17A" }}>TUTOR</span></h1>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <nav className={`nav ${isSidebarOpen ? 'sidebar active' : 'sidebar'}`}>
          <span className="close-btn" onClick={toggleSidebar}>×</span>
          <button onClick={()=> navigate("/speech")} className="recent-files">Speech-to-text</button>
          <a href="#features" className="nav-link">Features</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button onClick={() => navigate("/recentfiles", { state: { decode, name } })} className="recent-files">Recent Files</button>
        </nav>
        <nav className="desktop-nav" data-aos="fade-up">
          <button onClick={()=> navigate("/speech")} className="recent-files">Speech-to-text</button>
          <a href="#features" className="nav-link">Features</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button onClick={() => navigate("/recentfiles", { state: { decode, name } })} className="recent-files">Recent Files</button>
        </nav>
        <label className="switch">
          <input type="checkbox" className="input" onChange={handleThemeToggle} />
          <span className="slider"></span>
          <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
          <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
        </label>
      </header>
      <hr />
      <section className="hero-section" id="home" data-aos="fade-up">
        <dotlottie-player
          src="https://lottie.host/e5ae7d2f-4970-4077-b9f2-441fd882a094/XrVYO5yo3y.json"
          background="transparent"
          speed="1"
          style={{ width: '600px', height: '500px' }}
          loop
          autoplay
        ></dotlottie-player>
        <div className='text-slide-in'>
          <h2 className="headline">
            Welcome to MY TUTOR <span style={{ color: "#E79E4F", fontWeight: "bolder" }}>{decode ? decode.name : name ? name : "User"}</span>, Your Ultimate Learning Companion
          </h2>
          <p className="sub-headline">
            Dive into a world of personalized learning with MY TUTOR, where advanced AI technology adapts to your unique study needs.
          </p>
          <FileUpload setfunc={setfunc} />
        </div>
      </section>
      <hr />
      <section className="features-section" id="features" data-aos="fade-up">
        <div className='features-content'>
          <h3 className="features-title">Features</h3>
          <div className="features-list">
            <div className="card" data-aos="fade-left">
              <div className="card-inner">
                <div className="card-front">
                  <h3>Smart Flashcards</h3>
                </div>
                <div className="card-back">
                  <p>Automatically generated flashcards from your study materials.</p>
                  <button className="cta-button" onClick={() => navigate("/flashcards")}>Generate Flashcards</button>
                </div>
              </div>
            </div>

            <div className="card" data-aos="fade-left">
              <div className="card-inner">
                <div className="card-front">
                  <h3>Personalized Quiz</h3>
                </div>
                <div className="card-back">
                  <p>Quizzes tailored to your learning progress and needs.</p>
                  <button className="cta-button" onClick={() => navigate("/quiz")}>Take Quiz</button>
                </div>
              </div>
            </div>

            <div className="card" data-aos="fade-left">
              <div className="card-inner">
                <div className="card-front">
                  <h3>Short Summarizing</h3>
                </div>
                <div className="card-back">
                  <p>Summarize your entire study material in brief within seconds.</p>
                  <button className="cta-button" onClick={() => navigate("/summarization")}>Get Summarized</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <dotlottie-player
          src="https://lottie.host/ab5e1ecc-92a3-429a-9cf5-08aa0122c46b/CcOUAg5al7.json"
          background="transparent"
          speed="1"
          style={{ width: '500px', height: '600px' }}
          loop
          autoplay
        ></dotlottie-player>
      </section>
      <hr />
      <section className="how-it-works-section" id="how-it-works" data-aos="fade-up">
        <div>
          <h2 className="section-title">How It Works</h2>
        </div>
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div style={{ marginLeft: "10px", marginRight: "30px" }}>
            <dotlottie-player
              src="https://lottie.host/53ea2606-789e-42a7-bfab-a1432d35249b/XJcucipAMo.json"
              background="transparent"
              speed="1"
              style={{ width: '500px', height: '600px' }}
              loop
              autoplay
            ></dotlottie-player>
          </div>
          <div className="how-it-works-content">
            <div className="step" data-aos="fade-up">
              <h3>Step 1: Sign Up</h3>
              <p>Create your account and set up your profile to get started with personalized learning.</p>
            </div>
            <div className="step" data-aos="fade-up">
              <h3>Step 2: Upload Study Materials</h3>
              <p>Upload your study materials or let our AI generate flashcards and quizzes for you.</p>
            </div>
            <div className="step" data-aos="fade-up">
              <h3>Step 3: Engage with Interactive Lessons</h3>
              <p>Participate in interactive lessons, quizzes, and practice exercises tailored to your learning needs.</p>
            </div>
            <div className="step" data-aos="fade-up">
              <h3>Step 4: Review Your Recent Files</h3>
              <p>Access and revise the files you’ve uploaded earlier. Keep track of your documents and make necessary updates to ensure you have the most current information.</p>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <TestimonialsSection data-aos="fade-down" />
      <hr />
      <footer className="site-footer" id="contact" data-aos="fade-up">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col" data-aos="fade-right">
              <h6>About</h6>
              <p className="text-justify">
                MyTutor is an innovative self-learning app designed to empower individuals with flexible, on-demand educational resources. Tailored for students of all ages, it provides a wide range of interactive lessons, quizzes, and practice exercises across various subjects.
              </p>
            </div>

            <div className="footer-col" data-aos="fade-right">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            {/* <div className="footer-col">
              <h6>Social Links</h6>
              <SocialLinks />
            </div> */}
            <div className="footer-col"  data-aos="fade-left">
              <h6>Feedback</h6>
              <FeedbackForm uname={name} decode={decode} />
            </div>
          </div>
          <hr />
        </div>
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col" data-aos="fade-right">
              <p className="copyright-text">
                Copyright &copy; 2024 All Rights Reserved by <a href="#" style={{ fontWeight: "800" }}>MYTUTOR</a>.
              </p>
              <p className="copyright-text">
                For inquiries, please email us at <a href="mailto:sharafath0sms@gmail.com" style={{ fontWeight: "800" }}>sharafath0sms@gmail.com</a>.
              </p>
            </div>
            <div className="footer-col" data-aos="fade-left"> 
                <SocialLinks />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
