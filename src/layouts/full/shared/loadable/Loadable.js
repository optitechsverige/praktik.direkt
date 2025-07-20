import React, { Suspense, Component } from 'react';
import Spinner from '../../../../views/spinner/Spinner';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in Loadable component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h3>Something went wrong loading this component.</h3>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Add a loading delay to prevent flash of loading state
const DelayedSpinner = () => {
  const [show, setShow] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return show ? <Spinner /> : null;
};

const Loadable = (Component) => (props) => {
  const LazyComponent = React.useMemo(
    () =>
      React.lazy(() =>
        Promise.all([
          Component(),
          // Add a small delay to avoid flashing the loading state too quickly
          new Promise((resolve) => setTimeout(resolve, 300)),
        ]).then(([moduleExports]) => moduleExports)
      ),
    [Component]
  );

  return (
    <ErrorBoundary>
      <Suspense fallback={<DelayedSpinner />}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Loadable;
