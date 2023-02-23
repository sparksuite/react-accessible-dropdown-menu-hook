// Imports
import { createRoot } from 'react-dom/client';
import App from './app';

// Render
const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element should be present');
}

createRoot(rootElement).render(<App />);
