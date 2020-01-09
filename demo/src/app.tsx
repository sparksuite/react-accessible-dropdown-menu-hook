// Imports
import React from 'react';
import './app.css';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

// Functional component
const App: React.FC = () => {
	// Use the Hook
	const {buttonProps, itemProps, isOpen} = useDropdownMenu(3);

	// Return JSX
	return (
		<main className='app'>
			<h1>React Accessible Dropdown Menu Hook</h1>
			<h2>A simple Hook for creating fully accessible dropdown menus in React</h2>

			<button {...buttonProps} type='button' id='menu-button'>
				<span>Try me!</span>
				<i className='fal fa-angle-down' />
			</button>

			<div className={isOpen ? 'visible' : ''} role='menu' id='menu'>
				<a {...itemProps[0]} href='https://github.com/sparksuite/react-accessible-dropdown-menu-hook' id='menu-item-1'>
					<i className='fab fa-github fa-fw' />
					View on GitHub
				</a>

				<a {...itemProps[1]} href='https://www.npmjs.com/package/react-accessible-dropdown-menu-hook' id='menu-item-2'>
					<i className='fab fa-npm fa-fw' />
					View on npm
				</a>

				<a {...itemProps[2]} onClick={() => alert('Click!')} id='menu-item-3'>
					<i className='fas fa-mouse fa-fw' />
					Item with click handler
				</a>
			</div>

			<h3>Behavior:</h3>

			<ul>
				<li>The menu can be revealed by clicking the button, or by focusing the button and pressing enter / space</li>
				<li>If the menu is revealed with the keyboard, the first menu item is automatically focused</li>
				<li>If the menu is revealed with the mouse, the first menu item can be focused by pressing tab / arrow down</li>
				<li>
					<em>Once focus is in the menu…</em>

					<ul>
						<li>
							The up / down arrow keys allow for navigation through the menu items (including wrapping from first to
							last and vice versa)
						</li>
						<li>Pressing tab will close the menu and move the focus to the next focusable element</li>
						<li>Pressing shift-tab will close the menu and move the focus to the previous focusable element</li>
						<li>Pressing escape will close the menu and return the focus to the button</li>
						<li>
							Pressing enter will activate that item and close the menu (whether itʼs a link or has a click handler
							attached)
						</li>
					</ul>
				</li>
			</ul>

			<div className='footer'>
				<a href='https://github.com/sparksuite/react-accessible-dropdown-menu-hook' id='first-footer-link'>
					View on GitHub <i className='fad fa-external-link' />
				</a>
				<a href='https://www.npmjs.com/package/react-accessible-dropdown-menu-hook'>
					View on npm <i className='fad fa-external-link' />
				</a>
				Built by&nbsp;
				<a href='https://www.sparksuite.com' target='_blank' rel='noopener noreferrer'>
					Sparksuite <i className='fad fa-external-link' />
				</a>
			</div>
		</main>
	);
};

export default App;
