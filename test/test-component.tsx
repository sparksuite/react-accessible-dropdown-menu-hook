// Imports
import React from 'react';
import useDropdownMenu from '../src/use-dropdown-menu';


// A mock component for testing the Hook
const TestComponent: React.FC = () => {
	const [buttonProps, itemProps, isOpen] = useDropdownMenu(3);
	
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};


export default TestComponent;
