// Imports
import React, { useState } from 'react';
import useDropdownMenu from './use-dropdown-menu';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// A mock component for testing the Hook
const TestComponent: React.FC = () => {
	const [itemCount, setItemCount] = useState(4);
	const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(itemCount);

	const clickHandlers: (() => void)[] = [(): void => console.log('Item one clicked'), (): void => setIsOpen(false)];

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
						onClick={clickHandlers[i]}
						href={i > 1 ? 'https://example.com' : undefined}
					>
						Item {i + 1}
					</a>
				))}
			</div>

			<button id='second-button'>Another Button</button>

			<button id='remove-item' onClick={(): void => setItemCount((prevCount) => prevCount - 1)}>
				Remove Item
			</button>

			<button id='add-item' onClick={(): void => setItemCount((prevCount) => prevCount + 1)}>
				Add Item
			</button>

			<span data-testid='is-open-indicator'>{isOpen ? 'true' : 'false'}</span>
		</React.Fragment>
	);
};

// Tests
it('Renders', () => {
	render(<TestComponent />);
});

it('Moves the focus to the first menu item after pressing enter while focused on the menu button', () => {
	render(<TestComponent />);

	userEvent.tab();

	expect(screen.getByText('Primary')).toHaveFocus();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	expect(screen.getByText('Item 1')).toHaveFocus();
});

it('Moves the focus to the first menu item after pressing space while focused on the menu button', () => {
	render(<TestComponent />);

	userEvent.tab();

	expect(screen.getByText('Primary')).toHaveFocus();

	userEvent.type(screen.getByText('Primary'), '{space}', {
		skipClick: true,
	});

	expect(screen.getByText('Item 1')).toHaveFocus();
});

it('Moves the focus to the first menu item after clicking the menu to open it, then pressing tab while focused on the menu button', () => {
	render(<TestComponent />);

	userEvent.click(screen.getByText('Primary'));

	expect(screen.getByText('Primary')).toHaveFocus();

	userEvent.tab();

	expect(screen.getByText('Item 1')).toHaveFocus();
});

it('Moves the focus to the first menu item after clicking the menu to open it, then pressing arrow down while focused on the menu button', () => {
	render(<TestComponent />);

	userEvent.click(screen.getByText('Primary'));

	expect(screen.getByText('Primary')).toHaveFocus();

	fireEvent(
		screen.getByText('Primary'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('Item 1')).toHaveFocus();
});

it('Sets isOpen to true after pressing enter while focused on the menu button', () => {
	render(<TestComponent />);

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');

	userEvent.tab();

	expect(screen.getByText('Primary')).toHaveFocus();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('true');
});

it('Sets isOpen to true after pressing space while focused on the menu button', () => {
	render(<TestComponent />);

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');

	userEvent.tab();

	expect(screen.getByText('Primary')).toHaveFocus();

	userEvent.type(screen.getByText('Primary'), '{space}', {
		skipClick: true,
	});

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('true');
});

it('Sets isOpen to false after clicking a menu item that calls the state change function', () => {
	render(<TestComponent />);

	userEvent.click(screen.getByText('Primary'));
	userEvent.click(screen.getByText('Item 2'));

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Moves the focus to the next element in the menu after pressing the down arrow', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	expect(screen.getByText('Item 1')).toHaveFocus();

	fireEvent(
		screen.getByText('Item 1'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('Item 2')).toHaveFocus();
});

it('Moves the focus to the previous element in the menu after pressing the up arrow', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	expect(screen.getByText('Item 1')).toHaveFocus();

	fireEvent(
		screen.getByText('Item 1'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('Item 2')).toHaveFocus();

	fireEvent(
		screen.getByText('Item 2'),
		new KeyboardEvent('keydown', {
			key: 'ArrowUp',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('Item 1')).toHaveFocus();
});

it('Wraps the focus to the last element when pressing the up arrow at the beginning of the menu', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	expect(screen.getByText('Item 1')).toHaveFocus();

	fireEvent(
		screen.getByText('Item 1'),
		new KeyboardEvent('keydown', {
			key: 'ArrowUp',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('Item 4')).toHaveFocus();
});

it('Wraps the focus to the first element when pressing the down arrow at the end of the menu', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	expect(screen.getByText('Item 1')).toHaveFocus();

	fireEvent(
		screen.getByText('Item 1'),
		new KeyboardEvent('keydown', {
			key: 'ArrowUp',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('Item 4')).toHaveFocus();

	fireEvent(
		screen.getByText('Item 4'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('Item 1')).toHaveFocus();
});

it('Sets isOpen to false after pressing escape while focused on a menu item', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	userEvent.type(screen.getByText('Item 1'), '{esc}', {
		skipClick: true,
	});

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Sets isOpen to false after pressing tab while focused on a menu item', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	userEvent.tab();

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Moves the focus to the menu button after pressing escape while focused on a menu item', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	userEvent.type(screen.getByText('Item 1'), '{esc}', {
		skipClick: true,
	});

	expect(screen.getByText('Primary')).toHaveFocus();
});

it('Opens the menu after clicking the button', () => {
	render(<TestComponent />);

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');

	userEvent.click(screen.getByText('Primary'));

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('true');
});

it('Closes the menu after clicking the button when the menu is open', () => {
	render(<TestComponent />);

	userEvent.click(screen.getByText('Primary'));
	userEvent.click(screen.getByText('Primary'));

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Adds properties to items added after mount', () => {
	render(<TestComponent />);

	userEvent.click(screen.getByText('Add Item'));

	expect(screen.getByText('Item 4')).toHaveAttribute('role', 'menuitem');
});

it('Can navigate to a dynamically-added item', () => {
	render(<TestComponent />);

	userEvent.click(screen.getByText('Add Item'));

	userEvent.click(screen.getByText('Primary'));

	fireEvent(
		screen.getByText('Primary'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	fireEvent(
		screen.getByText('Item 1'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	fireEvent(
		screen.getByText('Item 2'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	fireEvent(
		screen.getByText('Item 3'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	fireEvent(
		screen.getByText('Item 4'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('Item 5')).toHaveFocus();
});

it('Ignores keys that buttons don’t need to handle', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), 'Z', {
		skipClick: true,
	});
});

it('Ignores keys that items don’t need to handle', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	userEvent.type(screen.getByText('Item 1'), 'Z', {
		skipClick: true,
	});
});

it('Doesn’t crash when enter press occurs on a menu item', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	userEvent.type(screen.getByText('Item 1'), '{enter}', {
		skipClick: true,
	});
});

it('Closes the menu after pressing enter on a menu item with a click handler', () => {
	render(<TestComponent />);

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	userEvent.type(screen.getByText('Item 1'), '{enter}', {
		skipClick: true,
	});

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Activates the click handler of a menu item enter while focused on it', () => {
	render(<TestComponent />);

	jest.spyOn(console, 'log');

	userEvent.tab();

	userEvent.type(screen.getByText('Primary'), '{enter}', {
		skipClick: true,
	});

	userEvent.type(screen.getByText('Item 1'), '{enter}', {
		skipClick: true,
	});

	expect(console.log).toHaveBeenCalledWith('Item one clicked');
});
