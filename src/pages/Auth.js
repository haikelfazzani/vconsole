import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BitbucketAuthService from '../services/BitbucketAuthService';

function Auth (props) {
  useEffect(() => {
    try {
      BitbucketAuthService.authorization();
      props.history.push('/account');
    } catch (error) {
      props.history.push('/login');
    }
  }, []);

  return <Spinner />;
}

export default withRouter(Auth);