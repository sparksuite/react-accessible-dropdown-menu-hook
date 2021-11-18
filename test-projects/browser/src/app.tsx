/* eslint-disable @typescript-eslint/explicit-function-return-type */

// Imports
import React from 'react';
import './app.css';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

// Functional component
const App: React.FC = () => {
	// Use the Hook
	const { buttonProps, itemProps, isOpen } = useDropdownMenu(3);

	// Return JSX
	return (
		<main className='app'>
			<h1>Browser</h1>

			<button {...buttonProps} type='button' id='menu-button'>
				Example
			</button>

			<div className={isOpen ? 'visible' : ''} role='menu' id='menu'>
				<a {...itemProps[0]} href='https://github.com/sparksuite/react-accessible-dropdown-menu-hook' id='menu-item-1'>
					View on GitHub
				</a>

				<a {...itemProps[1]} href='https://www.npmjs.com/package/react-accessible-dropdown-menu-hook' id='menu-item-2'>
					View on npm
				</a>

				<a {...itemProps[2]} onClick={() => alert('Click!')} id='menu-item-3'>
					Item with click handler
				</a>
			</div>

			<a href='https://www.sparksuite.com/' id='next-link'>
				Sparksuite
			</a>
		</main>
	);
};

export default App;
