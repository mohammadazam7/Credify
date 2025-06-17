import React, { useState } from "react";
import Header from "../layout/Header";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) {
      setError("Invalid name. Only letters and spaces are allowed.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (formData.subject.trim() === "") {
      setError("Subject cannot be empty.");
      return false;
    }
    if (formData.message.trim().length < 10) {
      setError("Message must be at least 10 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // In a real app, you would send this data to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <Header
        title="Contact Us"
        subTitle="Have questions or suggestions? We'd love to hear from you!"
      />
      <div className="contact-content">
        {submitted ? (
          <div className="success-message">
            <h2>Thank you for your message!</h2>
            <p>
              We've received your inquiry and will get back to you as soon as
              possible.
            </p>
          </div>
        ) : (
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        )}

        <div className="contact-info">
          <div className="info-card">
            <h3>Email</h3>
            <p>support@creditcardcomparison.com</p>
          </div>

          <div className="info-card">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>

          <div className="info-card">
            <h3>Address</h3>
            <p>
              123 Financial Street
              <br />
              Banking District
              <br />
              Toronto, ON M5J 2Y1
            </p>
          </div>

          <div className="info-card">
            <h3>Business Hours</h3>
            <p>
              Monday - Friday: 9:00 AM - 5:00 PM
              <br />
              Saturday & Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
