import React from 'react';

function ErrorBoundary(callback) {
  return class ErrorB extends React.Component {

    state = { hasError: false, error: null };
  
    static getDerivedStateFromError = error => {
      callback(error)
      return { hasError: true };
    };
  
    componentDidCatch = (error) => {
      this.setState({ error, hasError: error ? true : false });
    };
  
    render () {
      try {
        const { error } = this.state;
        return <>{error ? error.message : this.props.children}</>;
      } catch (err) {
        return <>{'' + err.message}</>;
      }
    }
  }  
}
export default ErrorBoundary;
