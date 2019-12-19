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
const [buttonProps, itemProps, isOpen] = useDropdownMenu(numberOfItems);
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

## Accessibility notes
Our team carefully studied and adhered to [Web Content Accessibility Guidelines 2.1](https://www.w3.org/WAI/standards-guidelines/wcag/) and  [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/) when designing this Hook. Here are some facets of accessibility that are handled automatically:

- Strict adherence to the best practices for menus ([WAI-ARIA: 3.15](https://www.w3.org/TR/wai-aria-practices/#menu))
- Strict adherence to the best practices for menu buttons ([WAI-ARIA: 3.16](https://www.w3.org/TR/wai-aria-practices/#menubutton))
- Full keyboard accessibility ([WCAG: 2.1](https://www.w3.org/WAI/WCAG21/quickref/#keyboard-accessible))
- Use of ARIA properties and roles to establish relationships amongst elements ([WCAG: 1.3.1](https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships))
- Use of roles to identify the purpose of different parts of the menu ([WCAG: 1.3.6](https://www.w3.org/WAI/WCAG21/quickref/#identify-purpose))
- Focusable components receive focus in an order that preserves meaning and operability ([WCAG: 2.4.3](https://www.w3.org/WAI/WCAG21/quickref/#focus-order))
- Appears and operates in predictable ways ([WCAG: 3.2](https://www.w3.org/WAI/WCAG21/quickref/#predictable))

For more details, see [this comment](https://github.com/sparksuite/react-accessible-dropdown-menu-hook/issues/8#issuecomment-567568103).

## Local development

To prep your just cloned, or just cleaned repository for local development, run `yarn dev`.

To test the whole project, run `yarn test`.

To run the demo website locally, `cd ./demo && yarn start`.

To format the code, run `yarn format` at either the project root or within the demo directory.