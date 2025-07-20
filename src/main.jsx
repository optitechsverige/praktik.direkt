import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Spinner from './views/spinner/Spinner';
import './i18n';
import { CustomizerContextProvider } from './context/CustomizerContext';

// Only enable MSW in development when needed
const ENABLE_MSW = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true';

async function deferRender() {
  if (ENABLE_MSW) {
    const { worker } = await import("./api/mocks/browser");
    return worker.start({
      onUnhandledRequest: 'bypass',
      quiet: true, // Reduce console noise
    });
  }
  return Promise.resolve();
}

// Fast render without waiting for MSW
function renderApp() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <CustomizerContextProvider>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </CustomizerContextProvider>,
  );
}

if (ENABLE_MSW) {
  deferRender().then(renderApp);
} else {
  renderApp();
}
