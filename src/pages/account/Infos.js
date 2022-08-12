import React from 'react';
import { Link } from 'react-router-dom';

function Infos({ userInfos }) {
  return (<div className='h-100 w-100 bg-black border-right'>


    <header className='w-100 d-flex align-center p-4 mb-3'>
      <h2 className='m-0 dark'><i className='fa fa-terminal mr-1'></i>Vconsole</h2>
    </header>

    <div className="text-center p-4">
      <img src={userInfos.links.avatar.href} alt={userInfos.display_name} className="rounded mb-3" />

      <div className="text-center mb-5">
        <h2 className="m-0">{userInfos.display_name}</h2>
        <p>({userInfos.display_name})</p>
      </div>

      <Link to="/playground" className="btn border mb-2">
        <i className="fas fa-plus mr-1"></i>Create New Snippet
      </Link>

      <a className="btn border" href={userInfos.links.html.href}>
        <i className="fab fa-bitbucket mr-1"></i>bitbucket profile
      </a>
    </div>

  </div>);
}

export default React.memo(Infos);