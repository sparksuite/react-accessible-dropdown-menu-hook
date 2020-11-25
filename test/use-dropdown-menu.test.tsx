// Imports
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestComponent from './test-component';

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

/*
it('Moves the focus to the first menu item after clicking the menu to open it, then pressing arrow down while focused on the menu button', () => {
	render(<TestComponent />);

	userEvent.click(screen.getByText('Primary'));

	expect(screen.getByText('Primary')).toHaveFocus();

	userEvent.type(screen.getByText('Primary'), '{arrowdown}', {
		skipClick: true,
	});

	expect(screen.getByText('Item 1')).toHaveFocus();
});
*/

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
	userEvent.click(screen.getByText('Item 1'));

	expect(screen.getByTestId('is-open-indicator')).toHaveTextContent('false');
});

/*
it('Moves the focus to the next element in the menu after pressing the down arrow', () => {
	const component = render(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');
	const secondMenuItem = component.find('#menu-item-2');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menu-item-2');

	secondMenuItem.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menu-item-3');
});

it('Moves the focus to the previous element in the menu after pressing the up arrow', () => {
	const component = render(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');
	const secondMenuItem = component.find('#menu-item-2');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });

	secondMenuItem.simulate('keydown', { key: 'ArrowUp' });
	expect(document.activeElement?.id).toBe('menu-item-1');
});

it('Wraps the focus to the last element when pressing the up arrow at the beginning of the menu', () => {
	const component = render(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowUp' });
	expect(document.activeElement?.id).toBe('menu-item-3');
});

it('Wraps the focus to the first element when pressing the down arrow at the end of the menu', () => {
	const component = render(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menu-item-1');
});
*/

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

/*
it('Can navigate to a dynamically-added item', () => {
	const component = render(<TestComponent />);
	const addItemButton = component.find('#add-item');
	const menuButton = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');

	addItemButton.simulate('click');

	menuButton.getDOMNode<HTMLButtonElement>().focus();
	menuButton.simulate('keydown', { key: 'Enter' });

	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });

	expect(document.activeElement?.id).toBe('menu-item-4');
});
*/
