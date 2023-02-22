---
title: Options
---

You can customize the behavior with options, passed as the second argument.

Option | Default | Possible values
:--- | :--- | :---
`focusFirstItemOnClick` | `false` | `boolean`

Option | Explanation
:--- | :---
`focusFirstItemOnClick` | If specified as `true`, the first menu item will be focused when the menu is opened via a click (in addition to via a keyboard interaction).

```js
useDropdownMenu(numberOfItems, {
    focusFirstItemOnClick: true,
});
```