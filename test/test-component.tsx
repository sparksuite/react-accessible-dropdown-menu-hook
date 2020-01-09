// Imports
import React from 'react';
import useDropdownMenu from '../src/use-dropdown-menu';

// A mock component for testing the Hook
const TestComponent: React.FC = () => {
	const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(3);

	return (
		<React.Fragment>
			<button {...buttonProps} id='menu-button'>
				Primary
			</button>

			<div role='menu' id='menu'>
				<a {...itemProps[0]} onClick={() => setIsOpen(false)} id='menu-item-1'>
					Item 1
				</a>

				<a {...itemProps[1]} href='https://example.com' id='menu-item-2'>
					Item 2
				</a>

				<a {...itemProps[2]} href='https://example.com' id='menu-item-3'>
					Item 3
				</a>
			</div>

			<button id='second-button'>Another Button</button>

			<span id='is-open-indicator'>{isOpen ? 'true' : 'false'}</span>
		</React.Fragment>
	);
};

export default TestComponent;
