---
title: Type parameters
---

You can customize the behavior with optional type parameters.

Type constraint | Default | Possible values
:--- | :--- | :---
`HTMLElement` | `HTMLButtonElement` | Any subclass of `HTMLElement`

```js
const { buttonProps, itemProps, isOpen } = useDropdownMenu<HTMLDivElement>(3);
```

```jsx
<button {...buttonProps} id='menu-button'>
    Example
</button>
```