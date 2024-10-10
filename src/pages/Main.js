import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Main.css';

const categories = [
  'Design and Creative',
  'Software Engineering',
  'Marketing and Sales',
  'Finance and Accounting',
  'Human Resources',
  'Operations and Management',
  'Customer Service',
  'Product Management',
  'Data Science and Analytics',
  'Information Technology',
  'Education and Training',
  'Healthcare',
  'Legal Services',
  'Manufacturing and Production',
  'Research and Development',
  'Administration and Support',
  'Project Management',
  'Cybersecurity',
  'UX/UI Design',
  'Web Development',
  'Mobile Development',
  'Game Development',
  'Social Media Management',
  'Content Creation',
  'E-commerce',
  'Consulting',
  'Supply Chain Management',
  'Telecommunications',
  'Real Estate',
  'Nonprofit and Community Services'
];

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>The EASIEST way to find a job that fits YOU.</p>
        <button className="primary-button" onClick={() => navigate('/listings')}>Looking for a job?</button>
        <button className="secondary-button" onClick={() => navigate('/staff')}>View Testimonials</button>
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

      <section className="browse-jobs">
        <h2>Browse from Our Top Jobs</h2>
        <div className="job-categories">
          {categories.map((category, index) => (
            <div className="category-box" key={index}>
              {category}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Main;
