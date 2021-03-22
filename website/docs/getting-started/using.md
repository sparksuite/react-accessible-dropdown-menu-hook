---
title: Using
---

To use the Hook, first call it, telling it how many items your menu will have:

```jsx
const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(numberOfItems);
```

Take the `buttonProps` object and spread it onto a button:

```jsx
<button {...buttonProps}>Example</button>
```

Create the menu with the `role='menu'` property and spread `itemProps[x]` onto each item:

```jsx
<div className={isOpen ? 'visible' : ''} role='menu'>
    <a {...itemProps[0]} href='https://example.com'>Regular link</a>
    <a {...itemProps[1]} onClick={handleClick}>With click handler</a>
</div>
```

Style the menu based on whether the `visible` class name is present or not. For example, something like:

```css
div[role='menu'] {
    visibility: hidden;
}

div[role='menu'].visible {
    visibility: visible;
}
```