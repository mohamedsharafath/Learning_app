import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FileUpload from '../Frontend/FileUpload';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  font-family: 'Arial, sans-serif';
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.5em;
  color: #333;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
  font-weight:800;
  color: #007bff;
  font-size: 1em;
  &:hover {
    text-decoration: underline;
  }
`;

const HeroSection = styled(motion.section)`
  width: 100%;
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  color: white;
`;

const Headline = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const SubHeadline = styled.p`
  font-size: 1.2em;
  margin-bottom: 40px;
`;

const CTAButton = styled(motion.button)`
  margin-top: 16px;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const FeaturesSection = styled.section`
  width: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const FeaturesTitle = styled.h3`
  font-size: 2em;
  margin-bottom: 20px;
`;

const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const FeatureItem = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  text-align: center;
`;

const TestimonialsSection = styled.section`
  width: 100%;
  padding: 40px 20px;
  background-color: #f5f5f5;
`;

const TestimonialsTitle = styled.h3`
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
`;

const Testimonial = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  text-align: center;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

const Home = ({setfunc}) => {
  const Navigate=useNavigate();
  const location = useLocation();
  const { loguser } = location.state || {};

  return (
    <Container>
      <Header>
        <Logo>StudyAssist</Logo>
        <Nav>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Nav>
      </Header>
      <HeroSection
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Headline>Welcome to StudyAssist </Headline>
        <SubHeadline>Your AI-powered study companion</SubHeadline>
        {/* <p>Upload <span style={{color: '#000', fontSize: '18px', fontWeight: '900'}}>PDF/DOCX/TXT/PPTX</span> file</p> */}
        {/* <CTAButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          
        >
        </CTAButton> */}
          <FileUpload setfunc={setfunc}/>
        
      </HeroSection>
      <FeaturesSection id="features">
        <FeaturesTitle>Features</FeaturesTitle>
        <FeaturesList>
          <FeatureItem>
            <h4>Smart Flashcards</h4>
            <p>Automatically generated flashcards from your study materials.</p>
            {/* <Link to="/flashcards"> */}
            <CTAButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={()=>Navigate("/flashcards")}
        >
          Generate Flascards
        </CTAButton>
        {/* </Link> */}
          </FeatureItem>
          <FeatureItem>
            <h4>Personalized Quiz</h4>
            <p>Quizzes tailored to your learning progress and needs.</p>
            {/* <Link to="/quiz"> */}
              <CTAButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={()=>Navigate("/quiz")}
              >
                Take Quiz
              </CTAButton>
            {/* </Link> */}
          </FeatureItem>
          <FeatureItem>
            <h4>Short Summarizing</h4>
            <p>Summarize your entire study material in brief.</p>
            <Link to="/summarization">
              <CTAButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Get Summarize
              </CTAButton>
            </Link>
          </FeatureItem>
        </FeaturesList>
      </FeaturesSection>
      <TestimonialsSection id="testimonials">
        <TestimonialsTitle>What our users say</TestimonialsTitle>
        <Testimonial>
          <p>"StudyAssist has revolutionized the way I study. Highly recommended!"</p>
          <p>- Jane Doe</p>
        </Testimonial>
        <Testimonial>
          <p>"The personalized quizzes are a game changer. I feel more prepared than ever."</p>
          <p>- John Smith</p>
        </Testimonial>
      </TestimonialsSection>
      <Footer>
        <p>© 2024 StudyAssist. All rights reserved.</p>
        <SocialLinks>
          <FooterLink href="#">Facebook</FooterLink>
          <FooterLink href="#">Twitter</FooterLink>
          <FooterLink href="#">LinkedIn</FooterLink>
        </SocialLinks>
      </Footer>
    </Container>
  );
};

export default Home;