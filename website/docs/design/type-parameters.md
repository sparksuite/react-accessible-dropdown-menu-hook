---
title: Type parameters
---

You can customize the behavior with optional type parameters.

Type constraint | Default | Possible values
:--- | :--- | :---
`HTMLElement` | `HTMLButtonElement` | Any type that extends `HTMLElement`

```tsx
const { buttonProps, itemProps, isOpen } = useDropdownMenu<HTMLDivElement>(3);
```

```tsx
<div {...buttonProps} id='menu-button'>
    Example
</div>
```