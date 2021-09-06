---
title: Options
---

You can customize the behavior with options, passed as the second argument.

Option | Default | Possible values
:--- | :--- | :---
`disableFocusFirstItemOnClick` | `false` | `boolean`

Option | Explanation
:--- | :---
`disableFocusFirstItemOnClick` | If specified as `true` the default behavior of focusing the first menu item on click will be disabled. The menu button will instead retain focus.

```js
const { buttonProps, itemProps, isOpen, moveFocus, setIsOpen } = useDropdownMenu(numberOfItems, {
    disableFocusFirstItemOnClick: true,
});
```