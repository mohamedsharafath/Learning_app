import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackForm.css'

const FeedbackForm = ({ uname, decode }) => {
  // Initialize name state based on props
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Set the name from props when component mounts
    setName(uname || (decode && decode.name) || "Name");
  }, [uname, decode]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting feedback:', { name, feedback });

    try {
      const response = await axios.post('http://localhost:3030/feedbackpost', { name, feedback });
      setMessage('Feedback received successfully!');
      setName('');
      setFeedback('');
    } catch (error) {
      console.error('Submission error:', error.response ? error.response.data : error.message);
      setMessage('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-form">
        <p>Tell us what you think! Your feedback helps us enhance our offerings.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <textarea
          name="feedback"
          placeholder="Your Feedback"
          rows="4"
          value={feedback}
          onChange={handleFeedbackChange}
          required
        ></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FeedbackForm;
