import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import BG from '../img/coding.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home () {
  return (
    <>
      <Navbar />

      <div className="section container justify-between col-2">
        <div className="mb-3">
          <h1 className="mb-3">The Online Code playground for React, Javascript and Typescript that auto-evaluates as you type.</h1>

          <Link to="/react-playground" className="link mr-3 p-10 fs-18">
            <i className="fab fa-react"></i> Playground
          </Link>

          <Link to="/js-console" className="link p-10 fs-18">
            <i className="fa fa-terminal"></i> Js Console
          </Link>
        </div>

        <img src={BG} alt="online code editor" />
      </div>

      <Footer />
    </>
  );
}