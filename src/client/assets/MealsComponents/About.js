/** @format */

import React from 'react';

const About = () => {
  return (
    <div className='about'>
      <h2 className='about-title'>About</h2>
      <p className='about-container'>
        Welcome to our restaurant! We take pride in serving delicious meals made
        from the freshest ingredients. Our chefs are passionate about creating
        unforgettable dining experiences for our customers.  Join us for a
        culinary journey that will tantalize your taste buds and leave you
        wanting more. We look forward to serving you!
      </p>
      <div className='image-container'>
        <img
          src="https://media.istockphoto.com/id/1252876294/photo/young-man-paying-with-contactless-credit-card-in-restaurant-after-dinner.jpg?s=612x612&w=0&k=20&c=sh8PTxDHTd-3AtcCdrgET_E9TOLbeFPuSXaYrLXg330="
          alt="Restaurant"
        />
      </div >
      <div className='section-container'>
        <h3 className='section-title'> Location</h3>
        <p>123 Main Street, City, Country</p>
      </div>
      <div >
        <h3>Contact</h3>
        <p>Telephone: +1 123-456-7890</p>
        <p>Email: info@restaurant.com</p>
      </div>
    </div>
  );
};

export default About;
