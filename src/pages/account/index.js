import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BitbucketSnippetService from '../../services/BitbucketSnippetService';

import Infos from './Infos';
import Snippets from './Snippets';

const msgErrors = ['ERR_BAD_REQUEST', 'Invalid Token', 'Request failed with status code 401'];

function Profile() {
  const [state, setState] = useState({ userInfos: null, snippets: null });
  const [msgError, setMsgError] = useState('')

  useEffect(() => {
    BitbucketSnippetService.getAll()
      .then(snippets => {
        setState({ userInfos: snippets[0].owner, snippets });
      })
      .catch(e => {
        setMsgError(e.message);
      })
  }, []);

  if (state && state.userInfos) {
    return <div className="w-100 vh-100 grid-1-2 gap-0">
      <Infos userInfos={state.userInfos} />
      <Snippets snippets={state.snippets} />
    </div>
  }
  if (msgErrors.includes(msgError)) {
    return <Spinner text='Please connect to your bitbucket account.'>
      <Link to="/login" className="btn bg-black mt-5 p-3">
        <i className="fas fa-sign-in-alt mr-1"></i>login to bitbucket
      </Link>
    </Spinner>
  }
  else {
    return <Spinner text='There is no snippets in your account, please create one.'>
      <Link to="/playground" className="btn bg-black mt-5 p-3">
        <i className="fas fa-plus mr-1"></i>Create New Snippet
      </Link>
    </Spinner>
  }
}

export default Profile;