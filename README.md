# <div align="center">React Accessible Dropdown Menu Hook</div>

<p align="center">
<a href="https://www.npmjs.com/package/react-accessible-dropdown-menu-hook"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/react-accessible-dropdown-menu-hook"></a>
<a href="https://app.codecov.io/gh/sparksuite/react-accessible-dropdown-menu-hook/branch/master"><img alt="Codecov coverage" src="https://img.shields.io/codecov/c/github/sparksuite/react-accessible-dropdown-menu-hook"></a>
<a href="https://www.npmjs.com/package/react-accessible-dropdown-menu-hook"><img alt="npm downloads" src="https://img.shields.io/npm/dw/react-accessible-dropdown-menu-hook"></a>
<a href="https://www.npmjs.com/package/react-accessible-dropdown-menu-hook"><img alt="npm release" src="https://img.shields.io/npm/v/react-accessible-dropdown-menu-hook"></a>
<a href="https://github.com/sparksuite/rugged"><img alt="tested with Rugged" src="https://img.shields.io/badge/tested%20with-Rugged-green"></a>
<a href="https://github.com/sparksuite/react-accessible-dropdown-menu-hook/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/npm/l/react-accessible-dropdown-menu-hook"></a>
</p>

This Hook handles all the accessibility logic when building a dropdown menu, dropdown button, etc., and leaves the design completely up to you. It also handles the logic for closing the menu when you click outside of it.

- ♿️ Fully accessible
- 📦 Written entirely in TypeScript
- 🔬 Thoroughly tested
- ⚡️ Zero dependencies
- ✨ Tiny size

## Quick start

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

Call the Hook, telling it how many items your menu will have:

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

## Documentation

Read the docs at: https://sparksuite.github.io/react-accessible-dropdown-menu-hook/docs/

## Demo

See it in action: https://sparksuite.github.io/react-accessible-dropdown-menu-hook/demo/

## Accessibility notes

Our team carefully studied and adhered to strict accessibility guidelines when designing this Hook. To learn more, see: https://sparksuite.github.io/react-accessible-dropdown-menu-hook/docs/design/accessibility.

## Contributing

We love contributions! Contributing is easy; [learn how](https://github.com/sparksuite/react-accessible-dropdown-menu-hook/blob/master/CONTRIBUTING.md).

