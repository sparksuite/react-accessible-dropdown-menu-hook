# React Accessible Dropdown Menu Hook

[![Greenkeeper badge](https://badges.greenkeeper.io/sparksuite/react-accessible-dropdown-menu-hook.svg)](https://greenkeeper.io/)

This Hook handles all the accessibility logic when building a dropdown menu, dropdown button, etc., and leaves the design completely up to you. It also handles the logic for closing the menu when you click outside of it. [View the demo.](http://sparksuite.github.io/react-accessible-dropdown-menu-hook)

## Getting started

Install with Yarn or npm:

```
yarn add react-accessible-dropdown-menu-hook
```

```
npm install react-accessible-dropdown-menu-hook
```

Import the Hook:

```tsx
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
```

Call the Hook, telling it how many items your menu will have.

```tsx
const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(numberOfItems);
```

Spread the `buttonProps` onto a button:

```tsx
<button {...buttonProps}>Example</button>
```

Create the menu with the `role='menu'` property and spread `itemProps[x]` onto each item:

```tsx
<div className={isOpen ? 'visible' : ''} role='menu'>
    <a {...itemProps[0]} href='https://example.com'>Regular link</a>
    <a {...itemProps[1]} onClick={handleClick}>With click handler</a>
</div>
```

Done!

## Usage
This Hook returns an object of the following shape:

```ts
{
    buttonProps: {
        onKeyDown: () => void,
		onClick: () => void,
		tabIndex: 0,
		ref: React.RefObject<HTMLButtonElement>,
		role: 'button',
		'aria-haspopup': true,
		'aria-expanded': boolean,
    },
    itemProps: [{
        onKeyDown: () => void,
		tabIndex: -1,
		role: 'menuitem',
		ref: React.RefObject<HTMLAnchorElement>,
    }, ...],
    isOpen: boolean,
    setIsOpen: () => void
}
```

- buttonProps: An object meant to be spread as properties on a button element. 
    - onKeyDown: A function which manages the behavior of your dropdown menu when a key is pressed while focused on the menu button.
    - onClick: The same function as onKeyDown, but it differentiates behavior for click events.
    - tabIndex: Sets the tab-index property of the button element.
    - ref: A React ref applied to the button element, used to manage focus.
    - role: A role property in accordance with WAI-ARIA guidelines.
    - aria-haspopup: An aria attribute indicating this button has a related menu element.
    - aria-expanded: An aria attribute indicating whether the menu is currently open or not.
- itemProps: An array of objects to be spread on all of the menu items in your component.
    - onKeyDown: A function which manages the behavior of your dropdown menu when a key is pressed while focused on a menu item.
    - tabIndex: Sets the tab-index property to -1 to allow artificial focusing of the elements.
    - role: A role property set to menuitem in accordance with WAI-ARIA guidelines. 
    - ref: A react ref applied to each menu item, used to manage focus.
- isOpen: A boolean value indicating if the menu is open or closed.
- setIsOpen: The state setting method of isOpen, useful for situations where a developer need to programmatically close the menu.

## Accessibility notes
Our team carefully studied and adhered to [Web Content Accessibility Guidelines 2.1](https://www.w3.org/WAI/standards-guidelines/wcag/) and  [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/) when designing this Hook. Here are some facets of accessibility that are handled automatically:

- Careful following of the best practices for menus ([WAI-ARIA: 3.15](https://www.w3.org/TR/wai-aria-practices/#menu))
  - The only deviation is that the first menu item is only focused when the menu is revealed via the keyboard ([see why](https://github.com/sparksuite/react-accessible-dropdown-menu-hook/pull/63))
- Strict adherence to the best practices for menu buttons ([WAI-ARIA: 3.16](https://www.w3.org/TR/wai-aria-practices/#menubutton))
- Full keyboard accessibility ([WCAG: 2.1](https://www.w3.org/WAI/WCAG21/quickref/#keyboard-accessible))
- Use of ARIA properties and roles to establish relationships amongst elements ([WCAG: 1.3.1](https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships))
- Use of roles to identify the purpose of different parts of the menu ([WCAG: 1.3.6](https://www.w3.org/WAI/WCAG21/quickref/#identify-purpose))
- Focusable components receive focus in an order that preserves meaning and operability ([WCAG: 2.4.3](https://www.w3.org/WAI/WCAG21/quickref/#focus-order))
- Appears and operates in predictable ways ([WCAG: 3.2](https://www.w3.org/WAI/WCAG21/quickref/#predictable))

For more details, see [this comment](https://github.com/sparksuite/react-accessible-dropdown-menu-hook/issues/8#issuecomment-567568103).

## Local development

To prep a just-cloned or just-cleaned repository for local development, run `yarn dev`.

To test the whole project, run `yarn test`.

To run the demo website locally, run `cd ./demo && yarn start`.

To format the code, run `yarn format` at either the project root or within the `./demo` directory.

To clean the repository (removes any programmatically generated files), run `yarn clean`.