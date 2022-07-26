import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import BitbucketSnippetService from '../../services/BitbucketSnippetService';

import Infos from './Infos';
import Snippets from './Snippets';

function Profile() {
  const [state, setState] = useState({ userInfos: null, snippets: null });
  const { userInfos, snippets } = state;

  useEffect(() => {
    BitbucketSnippetService.getAll()
      .then(snippets => {
        setState({ userInfos: snippets[0].owner, snippets });
      });
  }, []);

  if (state && state.userInfos) {
    return <div className="grid-1-2 container py-5">
      <Infos userInfos={userInfos} />
      <Snippets snippets={snippets} />
    </div>
  }
  else {
    return <Spinner />
  }
}

export default Profile;