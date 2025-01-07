import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-details">
        <h2>Contact Us</h2>
        <p>
          At <strong>Calligraphy Corner</strong>, we’re always here to assist
          you! Whether you have questions about our custom calligraphy pieces,
          need help placing an order, or just want to learn more about our
          services, we're just a message away.
        </p>

        <p>Get in touch with us through the following channels:</p>

        <p className="contact-info">
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p className="contact-info">
          <strong>Email:</strong> contact@calligraphycorner.com
        </p>
        <p className="contact-info">
          <strong>Address:</strong> 123 Art Street, Calligraphy Town, XYZ
          Country
        </p>

        <p>
          Feel free to reach out to us, and our team will respond promptly.
          We’re excited to help you bring your ideas to life with our beautiful
          handcrafted calligraphy.
        </p>
      </div>
    </div>
  );
};

export default Contact;
