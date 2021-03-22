---
title: Accessibility
---

Our team carefully studied and adhered to [Web Content Accessibility Guidelines 2.1](https://www.w3.org/WAI/standards-guidelines/wcag/) and [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/) when designing this Hook. Here are some facets of accessibility that are handled automatically:

- Careful following of the best practices for menus ([WAI-ARIA: 3.15](https://www.w3.org/TR/wai-aria-practices/#menu))
  - The only deviation is that the first menu item is only focused when the menu is revealed via the keyboard ([see why](https://github.com/sparksuite/react-accessible-dropdown-menu-hook/pull/63))
- Strict adherence to the best practices for menu buttons ([WAI-ARIA: 3.16](https://www.w3.org/TR/wai-aria-practices/#menubutton))
- Full keyboard accessibility ([WCAG: 2.1](https://www.w3.org/WAI/WCAG21/quickref/#keyboard-accessible))
- Use of ARIA properties and roles to establish relationships amongst elements ([WCAG: 1.3.1](https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships))
- Use of roles to identify the purpose of different parts of the menu ([WCAG: 1.3.6](https://www.w3.org/WAI/WCAG21/quickref/#identify-purpose))
- Focusable components receive focus in an order that preserves meaning and operability ([WCAG: 2.4.3](https://www.w3.org/WAI/WCAG21/quickref/#focus-order))
- Appears and operates in predictable ways ([WCAG: 3.2](https://www.w3.org/WAI/WCAG21/quickref/#predictable))

For more details, see [this comment](https://github.com/sparksuite/react-accessible-dropdown-menu-hook/issues/8#issuecomment-567568103) on GitHub.