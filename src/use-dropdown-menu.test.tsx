// Imports
import React, { useState } from 'react';
import useDropdownMenu, { DropdownMenuOptions } from './use-dropdown-menu';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

// A mock component for testing the Hook
interface Props {
	options?: DropdownMenuOptions;
}

const TestComponent: React.FC<Props> = ({ options }) => {
	const [itemCount, setItemCount] = useState(4);
	const { buttonProps, itemProps, isOpen, setIsOpen, moveFocus } = useDropdownMenu(itemCount, options);

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
						{i + 1} Item
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

			<button data-testid='focus-third-item' onClick={(): void => moveFocus(2)}>
				Focus third item
			</button>

			<span data-testid='is-open-indicator'>{isOpen ? 'true' : 'false'}</span>
		</React.Fragment>
	);
};

// Helper function to setup a test
const setup = (jsx: React.ReactElement): { user: UserEvent } => {
	const user = userEvent.setup();

	render(jsx);

	return {
		user,
	};
};

// Tests
it('Renders', () => {
	render(<TestComponent />);
});

it('Moves the focus to the first menu item after pressing enter while focused on the menu button', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	expect(screen.getByText('Primary')).toHaveFocus();

	await user.keyboard('{Enter}');

	expect(screen.getByText('1 Item')).toHaveFocus();
});

it('Moves the focus to the first menu item after pressing space while focused on the menu button', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	expect(screen.getByText('Primary')).toHaveFocus();

	await user.keyboard('{ }');

	expect(screen.getByText('1 Item')).toHaveFocus();
});

it('Moves the focus to the first menu item after clicking the menu to open it', async () => {
	const { user } = setup(<TestComponent />);

	await user.click(screen.getByText('Primary'));

	expect(screen.getByText('1 Item')).toHaveFocus();
});

it('Moves the focus to the first menu item after clicking the menu to open it, then pressing tab while focused on the menu button, if `disableFocusFirstItemOnClick` is specified', async () => {
	const { user } = setup(<TestComponent options={{ disableFocusFirstItemOnClick: true }} />);

	await user.click(screen.getByText('Primary'));

	expect(screen.getByText('Primary')).toHaveFocus();

	await user.tab();

	expect(screen.getByText('1 Item')).toHaveFocus();
});

it('Moves the focus to the first menu item after clicking the menu to open it, then pressing arrow down while focused on the menu button, if `disableFocusFirstItemOnClick` is specified', async () => {
	const { user } = setup(<TestComponent options={{ disableFocusFirstItemOnClick: true }} />);

	await user.click(screen.getByText('Primary'));

	expect(screen.getByText('Primary')).toHaveFocus();

	await user.keyboard('{ArrowDown}');

	expect(screen.getByText('1 Item')).toHaveFocus();
});

it('Sets isOpen to true after pressing enter while focused on the menu button', async () => {
	const { user } = setup(<TestComponent />);

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');

	await user.tab();

	expect(screen.getByText('Primary')).toHaveFocus();

	await user.keyboard('{Enter}');

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('true');
});

it('Sets isOpen to false after pressing escape while focused on the menu button', async () => {
	const { user } = setup(<TestComponent />);

	await user.click(screen.getByText('Primary'));

	await user.keyboard('{Escape}');

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Sets isOpen to true after pressing space while focused on the menu button', async () => {
	const { user } = setup(<TestComponent />);

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');

	await user.tab();

	expect(screen.getByText('Primary')).toHaveFocus();

	await user.keyboard('{ }');

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('true');
});

it('Sets isOpen to false after clicking a menu item that calls the state change function', async () => {
	const { user } = setup(<TestComponent />);

	user.click(screen.getByText('Primary'));
	user.click(screen.getByText('2 Item'));

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Moves the focus to the next element in the menu after pressing the down arrow', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	expect(screen.getByText('1 Item')).toHaveFocus();

	fireEvent(
		screen.getByText('1 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('2 Item')).toHaveFocus();
});

it('Moves the focus to the previous element in the menu after pressing the up arrow', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	expect(screen.getByText('1 Item')).toHaveFocus();

	fireEvent(
		screen.getByText('1 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('2 Item')).toHaveFocus();

	fireEvent(
		screen.getByText('2 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowUp',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('1 Item')).toHaveFocus();
});

it('Wraps the focus to the last element when pressing the up arrow at the beginning of the menu', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	expect(screen.getByText('1 Item')).toHaveFocus();

	fireEvent(
		screen.getByText('1 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowUp',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('4 Item')).toHaveFocus();
});

it('Wraps the focus to the first element when pressing the down arrow at the end of the menu', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	expect(screen.getByText('1 Item')).toHaveFocus();

	fireEvent(
		screen.getByText('1 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowUp',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('4 Item')).toHaveFocus();

	fireEvent(
		screen.getByText('4 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('1 Item')).toHaveFocus();
});

it('Sets isOpen to false after pressing escape while focused on a menu item', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	await user.keyboard('{Escape}');

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Sets isOpen to false after pressing tab while focused on a menu item', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	await user.tab();

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Moves the focus to the menu button after pressing escape while focused on a menu item', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	await user.keyboard('{Escape}');

	expect(screen.getByText('Primary')).toHaveFocus();
});

it('Opens the menu after clicking the button', async () => {
	const { user } = setup(<TestComponent />);

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');

	await user.click(screen.getByText('Primary'));

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('true');
});

it('Closes the menu after clicking the button when the menu is open', async () => {
	const { user } = setup(<TestComponent />);

	await user.click(screen.getByText('Primary'));
	await user.click(screen.getByText('Primary'));

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Adds properties to items added after mount', async () => {
	const { user } = setup(<TestComponent />);

	await user.click(screen.getByText('Add Item'));

	expect(screen.getByText('4 Item')).toHaveAttribute('role', 'menuitem');
});

it('Can navigate to a dynamically-added item', async () => {
	const { user } = setup(<TestComponent />);

	await user.click(screen.getByText('Add Item'));

	await user.click(screen.getByText('Primary'));

	fireEvent(
		screen.getByText('Primary'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	fireEvent(
		screen.getByText('1 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	fireEvent(
		screen.getByText('2 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	fireEvent(
		screen.getByText('3 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	fireEvent(
		screen.getByText('4 Item'),
		new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true,
		})
	);

	expect(screen.getByText('5 Item')).toHaveFocus();
});

it('Ignores keys that buttons don’t need to handle', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('Z');
});

it('Ignores keys that items don’t need to handle', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	await user.keyboard('Z');

	expect(screen.getByText('1 Item')).toHaveFocus();
});

it('Doesn’t crash when enter press occurs on a menu item', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	user.keyboard('{Enter}');
});

it('Closes the menu after pressing enter on a menu item with a click handler', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	await user.keyboard('{Enter}');

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Activates the click handler of a menu item after pressing enter while focused on it', async () => {
	const { user } = setup(<TestComponent />);

	jest.spyOn(console, 'log');

	await user.tab();

	await user.keyboard('{Enter}');

	await user.keyboard('{Enter}');

	expect(console.log).toHaveBeenCalledWith('Item one clicked');
});

it('Closes the menu after pressing space on a menu item with a click handler', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	await user.keyboard('{ }');

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

it('Activates the click handler of a menu item after pressing space while focused on it', async () => {
	const { user } = setup(<TestComponent />);

	jest.spyOn(console, 'log');

	await user.tab();

	await user.keyboard('{Enter}');

	await user.keyboard('{ }');

	expect(console.log).toHaveBeenCalledWith('Item one clicked');
});

it('Moves the focus to the menu item with a label that starts with the corresponding character that was pressed', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	await user.keyboard('3');

	expect(screen.getByText('3 Item')).toHaveFocus();
});

it('Moves the focus to the provided menu item when `moveFocus` is called', async () => {
	const { user } = setup(<TestComponent />);

	await user.tab();

	await user.keyboard('{Enter}');

	await user.click(screen.getByTestId('focus-third-item'));

	expect(screen.getByText('3 Item')).toHaveFocus();
});
