import React, { useState } from "react";
import axios from 'axios';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Contact () {

  const [state, setState] = useState(null);

  const submitForm = (ev) => {
    ev.preventDefault();

    setState(null);
    const fullname = ev.target.elements[0].value;
    const email = ev.target.elements[1].value;
    const message = ev.target.elements[2].value;

    const data = new FormData();
    data.append('fullname', fullname);
    data.append('email', email);
    data.append('message', message);

    if (fullname && email && message.length > 30) {
      axios({
        url: "https://formspree.io/f/mqkgdrej",
        method: "POST",
        data,
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data"
        }
      })
        .then(r => {
          setState('Your message has been sent successfully');
        })
        .catch(e => {
          setState('Invalid Email, please verify your email or try later!');
        });
    }
  }

  return (<>
    <Navbar />
    <div className="container horizontal-align text-center">
      <h1 className="display-4">Let’s get in touch</h1>
      <p className="lead m-0">Get in touch, and let us know how we can help.</p>
      <p className="lead m-0 mb-3">Fill out the form, and we’ll be in touch as soon as possible.</p>

      <form
        onSubmit={submitForm}
        className="w-50 mx-auto box-shad mb-3"
      >
        <div className="form-group mb-3">
          <label>Full name*</label>
          <input type="text" className="form-control" name="fullname" placeholder="Joe doe" required />
        </div>

        <div className="form-group mb-3">
          <label>Email*</label>
          <input type="email" className="form-control" name="email" placeholder="example@gmail.com" required />
        </div>

        <div className="form-group mb-3">
          <label>Message*</label>
          <textarea className="form-control" name="message" rows="5" defaultValue="Hello there :)"></textarea>
        </div>

        <button type="submit" className="w-100 button">
          <i className="fa fa-paper-plane"></i> Send Message
        </button>
      </form>

      {state && <div className="w-75 mx-auto alert alert-dark mt-3"><i className="fa fa-info-circle"></i> {state}</div>}
    </div>
    <Footer />
  </>);
}