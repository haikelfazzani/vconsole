import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BitbucketSnippetService from '../../services/BitbucketSnippetService';

import Infos from './Infos';
import Snippets from './Snippets';

function Profile() {
  const [state, setState] = useState({ userInfos: null, snippets: null });

  useEffect(() => {
    BitbucketSnippetService.getAll()
      .then(snippets => {
        setState({ userInfos: snippets[0].owner, snippets });
      });
  }, []);

  if (state && state.userInfos) {
    return <div className="w-100 vh-100 grid-1-2">
      <Infos userInfos={state.userInfos} />
      <Snippets snippets={state.snippets} />
    </div>
  }
  else {
    return <Spinner text='There is no snippets in your account, please create one.'>
      <Link to="/playground" className="btn bg-black mt-3 p-3">
        <i className="fas fa-plus mr-1"></i>Create New Snippet
      </Link>
    </Spinner>
  }
}

export default Profile;