// Imports
import React from 'react';
import './app.css';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

// Functional component
const App: React.FC = () => {
	// Use the Hook
	const [buttonProps, itemProps, isOpen] = useDropdownMenu(3);

	// Return JSX
	return (
		<div className='app'>
			<h1>React Accessible Dropdown Menu Hook</h1>
			<h2>A simple Hook for creating fully accessible dropdown menus in React</h2>

			<button {...buttonProps} type='button' id='menu-button'>
				<span>Try me!</span>
				<i className='fal fa-angle-down' />
			</button>

			<div className={isOpen ? 'visible' : ''} role='menu' id='menu'>
				<a {...itemProps[0]} onClick={() => alert('Click!')} id='menu-item-1'>
					<i className='fas fa-mouse fa-fw' />
					Item with click handler
				</a>

				<a {...itemProps[1]} href='https://github.com/sparksuite/react-accessible-dropdown-menu-hook' id='menu-item-2'>
					<i className='fab fa-github fa-fw' />
					View on GitHub
				</a>

				<a {...itemProps[2]} href='https://www.npmjs.com/package/react-accessible-dropdown-menu-hook' id='menu-item-3'>
					<i className='fab fa-npm fa-fw' />
					View on npm
				</a>
			</div>

			<div className='footer'>
				<a href='https://github.com/sparksuite/react-accessible-dropdown-menu-hook' id='first-footer-link'>
					View on GitHub
				</a>
				<a href='https://www.npmjs.com/package/react-accessible-dropdown-menu-hook'>View on npm</a>
				Built by{' '}
				<a href='https://www.sparksuite.com' target='_blank' rel='noopener noreferrer'>
					Sparksuite
				</a>
			</div>
		</div>
	);
};

export default App;
