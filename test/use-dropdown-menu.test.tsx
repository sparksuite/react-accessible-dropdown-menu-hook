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
	const button = component.find('#menubutton');
	
	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	
	expect(document.activeElement?.id).toBe('menuitem1');
});

it('moves the focus to the next element in the menu after pressing the down arrow', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menubutton');
	const firstMenuItem = component.find('#menuitem1');
	const secondMenuItem = component.find('#menuitem2');
	
	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menuitem2');
	
	secondMenuItem.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menuitem3');
});

it('moves the focus to the previous element in the menu after pressing the up arrow', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menubutton');
	const firstMenuItem = component.find('#menuitem1');
	const secondMenuItem = component.find('#menuitem2');
	
	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	
	secondMenuItem.simulate('keydown', { key: 'ArrowUp' });
	expect(document.activeElement?.id).toBe('menuitem1');
});

it('wraps the focus to the last element when pressing the up arrow at the beginning of the menu', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menubutton');
	const firstMenuItem = component.find('#menuitem1');
	
	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowUp' });
	expect(document.activeElement?.id).toBe('menuitem3');
});

it('wraps the focus to the first element when pressing the down arrow at the end of the menu', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menubutton');
	const firstMenuItem = component.find('#menuitem1');
	
	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	firstMenuItem.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menuitem1');
});

it('moves the focus to the menu button after pressing escape while focused on a menu item', () => {
	const component = mount(<TestComponent />);
	const button = component.find('#menubutton');
	const firstMenuItem = component.find('#menuitem1');
	const menu = component.find('#menu');
	
	button.getDOMNode<HTMLButtonElement>().focus();
	button.simulate('keydown', { key: 'Enter' });
	
	firstMenuItem.simulate('keydown', { key: 'Escape' });
	expect(menu.prop('style')).toHaveProperty('display', 'none');
	expect(document.activeElement?.id).toBe('menubutton');
});

