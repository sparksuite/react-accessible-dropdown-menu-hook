// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Tests
it('renders', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});
