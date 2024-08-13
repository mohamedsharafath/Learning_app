// src/components/TestimonialsSection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:3030/get/feedback');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials', error);
      }
    };

    fetchTestimonials();
  }, []);

  const items = testimonials.map((testimonial) => (
    <div className="testimonial" key={testimonial.id}>
      <p>"{testimonial.feedback}"</p>
      <p>- {testimonial.name}</p>
    </div>
  ));

  return (
    <section className="testimonials-section" id="testimonials">
      <h3 className="testimonials-title">What our users say</h3>
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        autoPlayInterval={3000}
        infinite
        disableDotsControls
      />
    </section>
  );
};

export default TestimonialsSection;
