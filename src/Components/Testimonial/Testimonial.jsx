    // src/components/Testimonial.jsx
    import React from 'react';

    const Testimonial = ({ name, feedback }) => {
    return (
        <div className="testimonial">
        <p>"{feedback}"</p>
        <p>- {name}</p>
        </div>
    );
    };

    export default Testimonial;
