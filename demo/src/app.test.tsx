// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Tests
it('Renders', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});
