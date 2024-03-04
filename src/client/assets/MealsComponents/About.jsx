/** @format */

import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Us</h2>
      <p className="about">
        Welcome to our restaurant! We take pride in serving delicious meals made
        from the freshest ingredients. Our chefs are passionate about creating
        unforgettable dining experiences for our customers. Join us for a
        culinary journey that will tantalize your taste buds and leave you
        wanting more. We look forward to serving you!
      </p>
      <div className="about-img-container">
        <img
          src="https://media.istockphoto.com/id/1620709116/photo/group-of-female-friends-meeting-up-in-restaurant-or-coffee-shop-being-served-by-waiter.jpg?s=612x612&w=is&k=20&c=bqM3kJclKUAVGRyjE-XpASmwqSFzYOagMUh-HU4Xhqg="
          alt="Group of friends in a restaurant"
          className="about-img"
        />
      </div>
      <div className="content-container">
        <div className="location-info">
          <h3>Location</h3>
          <p>123 Main Street, City, Country</p>
          {/* Google Map iframe */}
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158855.4437854712!2d-122.41941559999998!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580e3d20e5903%3A0x7f1e7d5c9490e9b3!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1635545739560!5m2!1sen!2suk"
            width="300"
            height="200"
            frameBorder="0"
            style={{ border: 0, maxWidth: '100%', marginTop: '10px' }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            className="google-map"></iframe>
        </div>
        <div className="contact-info">
          <h3>Contact</h3>
          <p>Telephone: +1 123-456-7890</p>
          <p>Email: info@restaurant.com</p>
        </div>
      </div>
    </div>
  );
};

export default About;
