// Imports
import React from 'react';
import useDropdownMenu from '../src/use-dropdown-menu';

// A mock component for testing the Hook
const TestComponent: React.FC = () => {
	const [buttonProps, itemProps, isOpen] = useDropdownMenu(3);

	return (
		<React.Fragment>
			<button type='button' {...buttonProps} id='menu-button' tabIndex={0}>
				Primary
			</button>

			<div style={{ display: isOpen ? 'block' : 'none' }} role='menu' id='menu'>
				<a style={{ display: 'block' }} {...itemProps[0]} onClick={() => null} id='menu-item-1'>
					Item 1
				</a>

				<a style={{ display: 'block' }} href='https://example.com' {...itemProps[1]} id='menu-item-2'>
					Item 2
				</a>

				<a style={{ display: 'block' }} href='https://example.com' {...itemProps[2]} id='menu-item-3'>
					Item 3
				</a>
			</div>

			<button type='button' id='second-button' tabIndex={0}>
				Another Button
			</button>

			<span id='is-open-indicator'>{isOpen ? 'true' : 'false'}</span>
		</React.Fragment>
	);
};

export default TestComponent;
