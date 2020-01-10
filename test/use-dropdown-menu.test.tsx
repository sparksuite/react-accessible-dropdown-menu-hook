// Imports
import React from 'react';
import { mount } from 'enzyme';
import TestComponent from './test-component';

// Tests
it('renders', () => {
	mount(<TestComponent />);
});

it('moves the focus to the first menu item after pressing enter while focused on the menu button', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });

	expect(document.activeElement?.id).toBe('menu-item-1');
});

it('moves the focus to the first menu item after pressing space while focused on the menu button', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: ' ' });

	expect(document.activeElement?.id).toBe('menu-item-1');
});

it('moves the focus to the first menu item after clicking the menu to open it, then pressing tab while focused on the menu button', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');

	button.simulate('click');
	button.simulate('keydown', { key: 'Tab' });

	expect(document.activeElement?.id).toBe('menu-item-1');
});

it('moves the focus to the first menu item after clicking the menu to open it, then pressing arrow down while focused on the menu button', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');

	button.simulate('click');
	button.simulate('keydown', { key: 'ArrowDown' });

	expect(document.activeElement?.id).toBe('menu-item-1');
});

it('sets isOpen to true after pressing enter while focused on the menu button', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const span = component.find('#is-open-indicator');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });

	expect(span.text()).toBe('true');
});

it('sets isOpen to true after pressing space while focused on the menu button', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const span = component.find('#is-open-indicator');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: ' ' });

	expect(span.text()).toBe('true');
});

it('sets isOpen to false after clicking a menu item that calls the state change function', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const itemWithHandler = component.find('#menu-item-1');
	const span = component.find('#is-open-indicator');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });

	itemWithHandler.simulate('click');

	expect(span.text()).toBe('false');
});

it('moves the focus to the next element in the menu after pressing the down arrow', () => {
	const component = mount(<TestComponent />);
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

it('moves the focus to the previous element in the menu after pressing the up arrow', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');
	const secondMenuItem = component.find('#menu-item-2');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });

	secondMenuItem.simulate('keydown', { key: 'ArrowUp' });
	expect(document.activeElement?.id).toBe('menu-item-1');
});

it('wraps the focus to the last element when pressing the up arrow at the beginning of the menu', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowUp' });
	expect(document.activeElement?.id).toBe('menu-item-3');
});

it('wraps the focus to the first element when pressing the down arrow at the end of the menu', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menu-item-1');
});

it('sets isOpen to false after pressing escape while focused on a menu item', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');
	const span = component.find('#is-open-indicator');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });

	firstMenuItem.simulate('keydown', { key: 'Escape' });
	expect(span.text()).toBe('false');
});

it('sets isOpen to false after pressing tab while focused on a menu item', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');
	const span = component.find('#is-open-indicator');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });

	firstMenuItem.simulate('keydown', { key: 'Tab' });
	expect(span.text()).toBe('false');
});

it('moves the focus to the menu button after pressing escape while focused on a menu item', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const firstMenuItem = component.find('#menu-item-1');

	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });

	firstMenuItem.simulate('keydown', { key: 'Escape' });
	expect(document.activeElement?.id).toBe('menu-button');
});

it('opens the menu after clicking the button', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const span = component.find('#is-open-indicator');

	button.simulate('click');

	expect(span.text()).toBe('true');
});

it('closes the menu after clicking the button when the menu is open', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menu-button');
	const span = component.find('#is-open-indicator');

	button.simulate('click');
	button.simulate('click');

	expect(span.text()).toBe('false');
});
