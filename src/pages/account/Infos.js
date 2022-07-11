import React from 'react';
import Spinner from '../../components/Spinner';

export default function Infos({ userInfos }) {

  if (userInfos) {
    return (<div>
      <div className="text-center mb-2 bg-black text-white light-shadow py-2 br7">
        <img src={userInfos.links.avatar.href} alt={userInfos.display_name} className="rounded mb-2" />

        <div className="text-center">
          <h2 className="m-0">{userInfos.display_name}</h2>
          <p>({userInfos.display_name})</p>
        </div>
      </div>

      <ul className="list light-shadow br7">              
        <li className='py-1 pr-2 pl-2'>
          <a href={userInfos.links.html.href}>
            <i className="fab fa-bitbucket mr-1"></i>bitbucket profile
          </a>
        </li>
      </ul>
    </div>);
  }
  else {
    return <Spinner />
  }
}