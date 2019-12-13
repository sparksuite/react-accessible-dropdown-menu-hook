// Imports
import React from 'react';
import './app.css';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

// Functional component
const App: React.FC = () => {
	const [buttonProps, itemProps, isOpen] = useDropdownMenu(3);

	return (
		<div className='app'>
			<button type='button' {...buttonProps} id='menubutton' tabIndex={0}>
				Primary
			</button>

			<div style={{ display: isOpen ? 'block' : 'none' }} role='menu' id='menu'>
				<a style={{ display: 'block' }} {...itemProps[0]} onClick={() => null} id='menuitem1'>
					Item 1
				</a>

				<a style={{ display: 'block' }} href='https://example.com' {...itemProps[1]} id='menuitem2'>
					Item 2
				</a>

				<a style={{ display: 'block' }} href='https://example.com' {...itemProps[2]} id='menuitem3'>
					Item 3
				</a>
			</div>

			<button type='button' id='secondbutton' tabIndex={0}>
				Another Button
			</button>
		</div>
	);
};

export default App;
