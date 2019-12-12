"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var react_1 = require("react");
// A custom Hook that abstracts away the listeners/controls for dropdown menus
exports.default = (function (itemCount) {
    // Use state
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var currentFocusIndex = react_1.useRef(null);
    var firstRun = react_1.useRef(true);
    // Create refs
    var buttonRef = react_1.useRef(null);
    var itemRefs = react_1.useRef(__spreadArrays(Array(itemCount)).map(function () { return react_1.createRef(); }));
    // Create type guard
    var isKeyboardEvent = function (e) {
        return e.key !== undefined;
    };
    // Handles moving the focus between menu items
    var moveFocus = function (itemIndex) {
        var _a;
        currentFocusIndex.current = itemIndex;
        (_a = itemRefs.current[itemIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    // Run whenever the menu opens/closes
    react_1.useEffect(function () {
        // Stop if the ref currently points to a null value
        if (!itemRefs.current[0].current || !buttonRef.current) {
            return;
        }
        // Stop if this is the first fire of the Hook, and update the ref
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        // If the menu is currently open focus on the first item in the menu
        if (isOpen) {
            itemRefs.current[0].current.focus();
            moveFocus(0);
        }
    }, [isOpen]);
    // Create a handler function for the button's clicks and keyboard events
    var buttonListener = function (e) {
        // Detect if event was a keyboard event or a mouse event
        if (isKeyboardEvent(e)) {
            var key = e.key;
            if (!(key === 'Tab' || key === 'Shift')) {
                e.preventDefault();
            }
            if (key === 'Enter' || key === ' ') {
                setIsOpen(true);
            }
            else if (key === 'Tab') {
                setIsOpen(false);
            }
        }
        else {
            setIsOpen(!isOpen);
        }
    };
    // Create a function that handles menu logic based on keyboard events that occur on menu items
    var itemListener = function (e) {
        var _a;
        // Create mutable value that initializes as the currentFocusIndex value
        var newFocusIndex = currentFocusIndex.current;
        // Destructure the key property from the event object
        var key = e.key;
        // Prevent default browser behavior except in cases where maintaining the natural tab order is desired
        if (!(key === 'Tab' || key === 'Shift' || key === 'Enter')) {
            e.preventDefault();
        }
        // Controls whether the menu is open or closed, if the button should regain focus on close, and if a handler function should be called
        if (key === 'Escape') {
            setIsOpen(false);
            (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            return;
        }
        else if (key === 'Tab') {
            setIsOpen(false);
            return;
        }
        else if (key === 'Enter') {
            e.currentTarget.click();
            return;
        }
        // Controls the current index to focus
        if (newFocusIndex !== null) {
            if (key === 'ArrowUp') {
                newFocusIndex -= 1;
            }
            else if (key === 'ArrowDown') {
                newFocusIndex += 1;
            }
            if (newFocusIndex > itemRefs.current.length - 1) {
                newFocusIndex = 0;
            }
            else if (newFocusIndex < 0) {
                newFocusIndex = itemRefs.current.length - 1;
            }
        }
        // After any modification set state to the modified value
        if (newFocusIndex !== null) {
            moveFocus(newFocusIndex);
        }
    };
    // Define spreadable props for button and items
    var buttonProps = {
        onKeyDown: buttonListener,
        onClick: buttonListener,
        tabIndex: 0,
        ref: buttonRef,
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': isOpen,
    };
    var itemProps = __spreadArrays(Array(itemCount)).map(function (ignore, index) { return ({
        onKeyDown: itemListener,
        tabIndex: -1,
        role: 'menuitem',
        ref: itemRefs.current[index],
    }); });
    // Return a listener for the button, individual list items, and the state of the menu
    return [buttonProps, itemProps, isOpen];
});
