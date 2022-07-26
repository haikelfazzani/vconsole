import React from 'react';
import { Link } from 'react-router-dom';

function Infos({ userInfos }) {

  return (<div className='w-100'>
    <div className="text-center mb-3 bg-black light-shadow py-2 br7 border">
      <img src={userInfos.links.avatar.href} alt={userInfos.display_name} className="rounded mb-2" />

      <div className="text-center">
        <h2 className="m-0">{userInfos.display_name}</h2>
        <p>({userInfos.display_name})</p>
      </div>
    </div>

    <Link to="/playground" className="btn bg-black mb-2 p-3">
      <i className="fas fa-plus mr-1"></i>Create New Snippet
    </Link>

    <a className="btn bg-black mb-2 p-3" href={userInfos.links.html.href}>
      <i className="fab fa-bitbucket mr-1"></i>bitbucket profile
    </a>
  </div>);
}

export default React.memo(Infos);