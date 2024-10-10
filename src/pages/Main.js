import React from 'react';
import './styles/Main.css';

function Main() {
  return (
    <div className="main-content">
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>The EASIEST way to find a job that fits YOU.</p>
        <button className="primary-button">Looking for a job?</button>
        <button className="secondary-button">View Testimonials</button>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature">
          <h3>Personalized Matches</h3>
          <p>We provide job recommendations tailored to your skills and preferences.</p>
        </div>
        <div className="feature">
          <h3>Expert Advice</h3>
          <p>Get tips and guidance from industry experts to boost your career.</p>
        </div>
        <div className="feature">
          <h3>Wide Range of Opportunities</h3>
          <p>Explore job listings from various industries and companies.</p>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"This platform helped me find my dream job in just a few weeks!"</p>
          <p>- Jane Doe</p>
        </div>
        <div className="testimonial">
          <p>"The personalized job matches were spot on. Highly recommend!"</p>
          <p>- John Smith</p>
        </div>
      </section>
    </div>
  );
}

export default Main;
