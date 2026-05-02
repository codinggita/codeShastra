import React from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Reload the page or navigate home
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Oops! Something went wrong.
              </h2>
              <p className="mt-3 text-sm text-gray-500">
                We've encountered an unexpected error. Our engineers have been notified.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 text-left overflow-auto max-h-40 border border-gray-100">
              <p className="text-xs font-mono text-red-600 break-words">
                {this.state.error && this.state.error.toString()}
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={this.handleReset}
                variant="primary"
                fullWidth
                size="lg"
                leftIcon={<FiRefreshCw className="mr-2" />}
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
