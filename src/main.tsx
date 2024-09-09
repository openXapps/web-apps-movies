import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/pages/App';
import '@/index.css';
import { registerSW } from 'virtual:pwa-register';

// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm(`New version is available. Reload App?`)) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
