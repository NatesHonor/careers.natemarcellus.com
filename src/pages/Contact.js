import React from 'react';
import './styles/Contact.css';

function Contact() {
  return (
    <div className="contact-content">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us through any of the methods below.</p>
      </section>

      <section className="contact-methods">
        <div className="contact-method">
          <h2>Email Us</h2>
          <p>For any inquiries, please email us at:</p>
          <a href="mailto:contact@natemarcellus.com">contact@natemarcellus.com</a>
        </div>
        <div className="contact-method">
          <h2>Call or Text Us</h2>
          <p>You can reach us by phone or text at:</p>
          <a href="tel:+14707058483">‪(470) 705-8483‬</a>
        </div>
        <div className="contact-method">
          <h2>Join Our Discord</h2>
          <p>Connect with us and our community on Discord:</p>
          <a href="https://discord.gg/invite/UrGZwfjxND" target="_blank" rel="noopener noreferrer">Join Discord</a>
        </div>
      </section>

      <section className="contact-message">
        <h2>We're Here to Help</h2>
        <p>Our team is dedicated to providing you with the best support possible. Don't hesitate to reach out with any questions or concerns you may have. We're here to assist you in any way we can.</p>
      </section>
    </div>
  );
}

export default Contact;
