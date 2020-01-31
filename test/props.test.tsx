// Imports
import React from 'react';
import { mount } from 'enzyme';
import TestPropsComponent from './test-props-component';

// Tests
it('renders', () => {
	mount(<TestPropsComponent childCount={2} />);
});

it('wraps the focus to the uniq element', () => {
	const component = mount(<TestPropsComponent childCount={1} />);
	const button = component.find('#menu-button');

	button.simulate('click');
	button.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menu-item-0');
});

it('moves the focus to the next element, even it it has been added later', () => {
	const component = mount(<TestPropsComponent childCount={1} />);
	const button = component.find('#menu-button');

	component.setProps({ childCount: 2 });
	component.update();
	button.simulate('click');
	expect(document.activeElement?.id).toBe('menu-item-0');

	button.simulate('keydown', { key: 'ArrowDown' });
	expect(document.activeElement?.id).toBe('menu-item-1');
});
