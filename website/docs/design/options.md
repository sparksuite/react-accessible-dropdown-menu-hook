---
title: Options
---

You can customize the behavior with options, passed as the second argument.

Option | Default | Possible values
:--- | :--- | :---
`focusFirstItemOnClick` | `false` | `boolean`

Option | Explanation
:--- | :---
`focusFirstItemOnClick` | If specified as `true` the first menu item will be focused on click as well as on keyboard interaction.

```js
useDropdownMenu(numberOfItems, {
    focusFirstItemOnClick: true,
});
```