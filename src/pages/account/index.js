import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';

import BitbucketAuthService from '../../services/BitbucketAuthService';
import BitbucketSnippetService from '../../services/BitbucketSnippetService';

import Infos from './Infos';
import Snippets from './Snippets';

function Profile(props) {
  const [state, setState] = useState({ userInfos: null, snippets: null });
  const { userInfos, snippets } = state;

  useEffect(() => {
    BitbucketSnippetService.getAll()
      .then(snippets => {
        console.log(snippets);
        setState({ userInfos: snippets[0].owner, snippets });
      })
      .catch(e => {
        BitbucketAuthService.clearToken();
        props.history.push('/');
      });
  }, []);

  if (state && state.userInfos) {
    return <div className="container py-5">
      <div className="grid-1-2">
        <Infos userInfos={userInfos} />

        <div className="min-v100">
          <Link to="/playground?s=0" className="btn bg-black mb-2 lg">
            <i className="fas fa-plus mr-1"></i>Create New Snippet
          </Link>

          <Snippets snippets={snippets} />
        </div>
      </div>
    </div>
  }
  else {
    return <Spinner />
  }
}

export default withRouter(Profile);