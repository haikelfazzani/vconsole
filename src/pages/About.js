import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='vh-100 container horizontal-align'>
      <h1>Free For Open-Source!</h1>
      <p className='lead'>VCONSOLE IS BUILT BY HAIKEL FAZZANI ON OPEN-SOURCE AND WOULDN’T EXIST WITHOUT IT.</p>
      <p className='lead'>WE'RE HAPPY TO GIVE SOMETHING BACK BY BEING COMPLETELY FREE FOR OPEN SOURCE.</p>

      <Link className='btn p-3 border mt-5 fit-content' to="/playground">
        <i className="fa fa-terminal mr-3"></i>playground
      </Link>
    </div>
  )
}
