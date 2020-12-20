import React from 'react';
import Footer from '../components/Footer';
import { withRouter } from 'react-router-dom';

function About () {
  return (<>
    <div className="w-100 horizontal-align text-center py-3">

      <h1 className="display-5 mb-0"><i className="fas fa-tree"></i></h1>

      <h1>Free For Open-Source!</h1>
      <p className="lead m-0">Reacto is built by <a href="https://twitter.com/HaikelFazzani" target="_blank" rel="noopener noreferrer">Haikel Fazzani</a> on open-source and wouldn’t exist without it.</p>
      <p className="lead mt-0">We’re happy to give something back by being completely free for open source.</p>

      <div>-</div>

      <figure>
        <blockquote className="blockquote">
          <p className="lead m-0">Any fool can write code that a computer can understand.</p>
          <p className="lead m-0">Good programmers write code that humans can understand</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          <cite title="Source Title">- Martin Fowler</cite>
        </figcaption>
      </figure>

      <div className="mb-3">
        <a href="https://github.com/haikelfazzani/react-playground" className="fs-45 mr-10" target="_blank" rel="noopener noreferrer">
          <i className="display-4 fab fa-github-square"></i>
        </a>

        <a href="https://twitter.com/HaikelFazzani" className="fs-45 ml-10" target="_blank" rel="noopener noreferrer">
          <i className="display-4 fab fa-twitter-square"></i>
        </a>
      </div>

    </div>

    <Footer />

  </>);
}

export default withRouter(About);