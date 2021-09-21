---
title: Return object
---

This Hook returns an object of the following shape:

```ts
{
    buttonProps: {
        onKeyDown: (e: React.KeyboardEvent | React.MouseEvent) => void;
        onClick: (e: React.KeyboardEvent | React.MouseEvent) => void;
        tabIndex: 0;
        ref: React.RefObject<HTMLButtonElement>;
        role: 'button';
        'aria-haspopup': true;
        'aria-expanded': boolean;
    };
    itemProps: [
        {
            onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
            tabIndex: -1;
            role: 'menuitem';
            ref: React.RefObject<HTMLAnchorElement>;
        };
        ...
    ];
    isOpen: boolean;
    setIsOpen: (newValue: boolean) => void;
    moveFocus: (itemIndex: number) => void;
}
```

- **buttonProps:** An object meant to be spread as properties on a `<button />` element.
    - **onKeyDown:** A function which manages the behavior of your dropdown menu when a key is pressed while focused on the menu button.
    - **onClick:** The same function as `onKeyDown()`, but its behavior differs somewhat for click events.
    - **tabIndex:** Sets the tab index property of the `<button />` element.
    - **ref:** A React ref applied to the `<button />` element, used to manage focus.
    - **role:** A role property in accordance with WAI-ARIA guidelines.
    - **aria-haspopup:** An ARIA attribute indicating this button has a related menu element.
    - **aria-expanded:** An ARIA attribute indicating whether the menu is currently open.
- **itemProps:** An array of objects meant to be spread as properties on `<a />` elements that serve as menu items in your dropdown.
    - **onKeyDown:** A function which manages the behavior of your dropdown menu when a key is pressed while focused on a menu item.
    - **tabIndex:** Sets the tab index property to `-1` to prevent the browser’s native focusing logic. Focus is managed programatically by this Hook.
    - **role:** A role property in accordance with WAI-ARIA guidelines. 
    - **ref:** A React ref applied to each menu item, used to manage focus.
- **isOpen:** A boolean value indicating if the menu is open or closed. The developer should use this value to make the menu visible or not.
- **setIsOpen:** A function useful for allowing the developer to programmatically open/close the menu.
- **moveFocus:** A function that changes internal pointer of currently focused element. This is useful when you want to allow seamless switching between keyboard and mouse use.