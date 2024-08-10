import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../Frontend/FileUpload/FileUpload';
import work from './undraw_work_from_anywhere_re_s2i6.svg';
import education from './undraw_education_f8ru.svg';
import SocialLinks from './SocialLinks';
import { useLocation } from 'react-router-dom';
import './home.css'; // Adjust the path if necessary

const Home = ({ setfunc }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkTheme, setDarkTheme] = useState(false);
   const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { decode,name } = location.state || {};

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleThemeToggle = () => {
    // console.log(signupData);
    setDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme', !isDarkTheme);
  };

  return (
    <div className={`container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <header className="header">
        <h1 className="logo">MY <span style={{"color":"#F6B17A"}}>TUTOR</span></h1>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <nav className={`nav ${isSidebarOpen ? 'sidebar active' : 'sidebar'}`}>
          <span className="close-btn" onClick={toggleSidebar}>×</span>
          <a href="#features" className="nav-link">Features</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button onClick={() => navigate("/recentfiles")} className="recent-files">Recent Files</button>
        </nav>
        <nav className="desktop-nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button onClick={() => navigate("/recentfiles")} className="recent-files">Recent Files</button>
        </nav>
        <label className="switch">
          <input type="checkbox" className="input" onChange={handleThemeToggle} />
          <span className="slider"></span>
          <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
          <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
        </label>
      </header>
      <hr></hr>
      <section className="hero-section" id="home">
      <img src={education} alt="learning" className='page_image'/>
      <div className='text-slide-in'>
        <h2 className="headline">
        Welcome to MY TUTOR <span style={{ color: "#E79E4F",fontWeight: "bolder" }}>{decode ? decode.name : name ? name : "User"}</span>, Your Ultimate Learning Companion
        </h2>
        <p className="sub-headline">
            Dive into a world of personalized learning with MY TUTOR, where advanced AI technology adapts to your unique study needs.
            {/* Whether you're preparing for exams, mastering new skills, or seeking additional support, MY TUTOR is here to guide you
            every step of the way with tailored resources, interactive lessons, and real-time feedback. */}
        </p>
        {/* {signupData && (
        <div>
          <h2>Welcome, {signupData.name}!</h2>
          <p>Username: {signupData.username}</p>
          <p>Email: {signupData.email}</p>
          
        </div>
      )} */}
        <FileUpload setfunc={setfunc} />
      </div>

      </section>
      <hr></hr>
      <section className="features-section" id="features">
        <div className='features-content'>
        <h3 className="features-title">Features</h3>
        <div className="features-list">
          <div className="feature-item">
            <h3>Smart Flashcards</h3>
            <p>Automatically generated flashcards from your study materials.</p>
            <button className="cta-button" onClick={() => navigate("/flashcards")}>Generate Flashcards</button>
          </div>
          <div className="feature-item">
            <h3>Personalized Quiz</h3>
            <p>Quizzes tailored to your learning progress and needs.</p>
            <button className="cta-button" onClick={() => navigate("/quiz")}>Take Quiz</button>
          </div>
          <div className="feature-item">
            <h3>Short Summarizing</h3>
            <p>Summarize your entire study material in brief within seconds.</p>
            <button className="cta-button" onClick={() => navigate("/summarization")}>Get Summarized</button>
          </div>
        </div>
        </div>
        <img src={work} alt="learning" className='page_image'/>
      </section>
      <hr></hr>
      <section className="testimonials-section" id="testimonials">
        <h3 className="testimonials-title">What our users say</h3>
        <div className="testimonial">
          <p>"<span style={{"fontWeight":"bolder"}}>MYTUTOR</span> has revolutionized the way I study. Highly recommended!"</p>
          <p>- Rajinikanth</p>
        </div>
        <div className="testimonial">
          <p>"The personalized quizzes are a game changer. I feel more prepared than ever."</p>
          <p>- Virat Kohli</p>
        </div>
      </section>
      <hr></hr>
      <footer className="site-footer" id="contact">
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-col">
                        <h6>About</h6>
                        <p className="text-justify">
                        MyTutor is an innovative self-learning app designed to empower individuals with flexible, on-demand educational resources. Tailored for students of all ages, it provides a wide range of interactive lessons, quizzes, and practice exercises across various subjects. Users can learn at their own pace, track their progress, and receive personalized recommendations based on their learning needs and goals. With a user-friendly interface and diverse content, MyTutor supports self-directed learning and helps users build knowledge and skills effectively. Whether for academic enhancement or personal growth, MyTutor makes self-paced education accessible and engaging.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#testimonials">Testimonals</a></li>
                            <li><a href="#contact">Contact</a></li>
                            
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h6>Social Links</h6>
                        <SocialLinks/>
                        
                    </div>
                </div>
                <hr />
            </div>
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-col">
                        <p className="copyright-text">
                            Copyright &copy; 2024 All Rights Reserved by <a href="#" style={{"fontWeight":"800"}}>MYTUTOR</a>.
                        </p>
                    </div>

                    
                </div>
            </div>
        </footer>
    </div>
  );
};

export default Home;
