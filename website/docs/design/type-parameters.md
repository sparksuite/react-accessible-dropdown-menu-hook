---
title: Type parameters
---

You can customize the behavior with optional type parameters.

Type constraint | Default | Possible values
:--- | :--- | :---
`HTMLElement` | `HTMLButtonElement` | Any class that extends `HTMLElement`

```js
const { buttonProps, itemProps, isOpen } = useDropdownMenu<HTMLDivElement>(3);
```

```jsx
<div {...buttonProps} id='menu-button'>
    Example
</div>
```