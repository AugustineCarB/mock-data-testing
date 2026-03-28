import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff4976',
          fontSize: 13,
          padding: 16,
          textAlign: 'center',
        }}>
          Chart error: {this.state.error?.message || 'Unknown error'}
        </div>
      );
    }
    return this.props.children;
  }
}
