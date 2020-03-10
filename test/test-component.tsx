// Imports
import React, { useState } from 'react';
import useDropdownMenu from '../src/use-dropdown-menu';

// A mock component for testing the Hook
const TestComponent: React.FC = () => {
	const [itemCount, setItemCount] = useState(3);
	const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(itemCount);

	return (
		<React.Fragment>
			<button {...buttonProps} id='menu-button'>
				Primary
			</button>

			<div role='menu' id='menu'>
				{itemProps.map((props, i) => (
					<a
						{...props}
						key={i}
						id={`menu-item-${i + 1}`}
						onClick={i === 0 ? () => setIsOpen(false) : undefined}
						href={i !== 0 ? 'https://example.com' : undefined}
					>
						Item {i + 1}
					</a>
				))}
			</div>

			<button id='second-button'>Another Button</button>

			<button id='remove-item' onClick={() => setItemCount(prevCount => prevCount - 1)}>
				Remove Item
			</button>

			<button id='add-item' onClick={() => setItemCount(prevCount => prevCount + 1)}>
				Add Item
			</button>

			<span id='is-open-indicator'>{isOpen ? 'true' : 'false'}</span>
		</React.Fragment>
	);
};

export default TestComponent;
