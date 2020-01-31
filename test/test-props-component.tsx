// Imports
import React from 'react';
import useDropdownMenu from '../src/use-dropdown-menu';

// A mock component for testing the Hook
const TestPropsComponent: React.FC<{ childCount: number }> = ({ childCount }) => {
	const { buttonProps, itemProps } = useDropdownMenu(childCount);

	return (
		<React.Fragment>
			<button {...buttonProps} id='menu-button'>
				Primary
			</button>

			<div role='menu' id='menu'>
				{[
					...Array.from(Array(childCount)).map((_, index) => (
						<a key={index} {...itemProps[index]} id={`menu-item-${index}`}>
							Item {index}
						</a>
					)),
				]}
			</div>
		</React.Fragment>
	);
};

export default TestPropsComponent;
