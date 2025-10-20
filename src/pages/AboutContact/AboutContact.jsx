import React from 'react';
import ContactForm from '../AboutContact/ContactForm';
import './AboutContact.css';
import halloween3 from '../../assets/events/halloween3.jpg';



export default function AboutContact() {
  return (
    <div className="about-contact-page">
      <section className="about">
        <h1>About Us</h1>
        <p>
          Welcome to our community! We organize events for families, friends, and neighbors to connect and celebrate.
        </p>
      </section>

      <section className="contact">
        <ContactForm />
      </section>
    </div>
  );
}

