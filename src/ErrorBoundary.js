import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className='map'>
        <h1>Sorry, we are currently unable to load the Google Maps Javascript API</h1>
        <p>Please check back soon!</p>
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;