// Imports
import React, { useState, useRef, createRef, useEffect } from 'react';


// A custom Hook that abstracts away the listeners/controls for dropdown menus
export default (itemCount: number) => {
   // Use state
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [returnFocusToButton, setReturnFocusToButton] = useState<boolean>(false);
   const [currentFocusIndex, setCurrentFocusIndex] = useState<number | null>(null);
   const firstRun = useRef(true);
   
   
   // Create refs
   const buttonRef = useRef<HTMLButtonElement>(null);
   const itemRefs = useRef([...Array(itemCount)].map(() => createRef<HTMLAnchorElement>()));
   
   
   // Create type guard
   const isKeyboardEvent = (e: React.KeyboardEvent | React.MouseEvent): e is React.KeyboardEvent => (e as React.KeyboardEvent).key !== undefined;
   
   
   // Handle changes in the state of the menu
   useEffect(() => {
       // Return if the ref currently points to a null value
       if (!itemRefs.current[0].current || !buttonRef.current) {
           return;
       }


       // Stop if this is the first fire of the Hook, and update the ref
       if (firstRun.current) {
           firstRun.current = false;
           return;
       }

       
       // If the menu is currently open focus on the first item in the menu, else return focus to the button if state indicates that is desired behavior
       if (isOpen) {
           itemRefs.current[0].current.focus();
           setCurrentFocusIndex(0);
       } else if (returnFocusToButton) {
           buttonRef.current.focus();
       }
   }, [isOpen, returnFocusToButton]);
   
   
   // Handle changes in the currently focused element
   useEffect(() => {
       if (currentFocusIndex !== null) {
           itemRefs.current[currentFocusIndex].current!.focus(); // TODO: Optional chaining
       }
   }, [currentFocusIndex]);
   
   
   // Create a handler function for the button's clicks and keyboard events
   const buttonListener = (e: React.KeyboardEvent | React.MouseEvent) => {
       // Detect if event was a keyboard event or a mouse event
       if (isKeyboardEvent(e)) {
           const { key } = e;
           
           if (!(key === 'Tab' || key === 'Shift')) {
               e.preventDefault();
           }
           if (key === 'Enter' || key === ' ') {
               setIsOpen(true);
               setReturnFocusToButton(false);
           } else if (key === 'Tab') {
               setIsOpen(false);
               setReturnFocusToButton(false);
           }
       } else {
           setIsOpen(!isOpen);
           setReturnFocusToButton(true);
       }
   };
   
   
   // Create a function that handles menu logic based on keyboard events that occur on menu items
   const itemListener = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
       // Create mutable value that initializes as the currentFocusIndex value
       let newFocusIndex = currentFocusIndex;
       
       const { key } = e;
       
       
       // Prevent default browser behavior except when desirable
       if (!(key === 'Tab' || key === 'Shift' || key === 'Enter')) {
           e.preventDefault();
       }
       
       
       // Create conditional behavior based based on which key was pressed
       // Controls whether the menu is open or closed, if the button should regain focus on close, and if a handler function should be called
       if (key === 'Escape') {
           setIsOpen(false);
           setReturnFocusToButton(true);
           return;
       } else if (key === 'Tab') {
           setIsOpen(false);
           setReturnFocusToButton(false);
           return;
       } else if (key === 'Enter') {
           e.currentTarget.click();
           return;
       }
       
       
       // Controls the current index to focus
       if (newFocusIndex !== null) {
           if (key === 'ArrowUp') {
               newFocusIndex -= 1;
           } else if (key === 'ArrowDown') {
               newFocusIndex += 1;
           }
           
           if (newFocusIndex > itemRefs.current.length - 1) {
               newFocusIndex = 0;
           } else if (newFocusIndex < 0) {
               newFocusIndex = itemRefs.current.length - 1;
           }
       }
       
       
       // After any modification set state to the modified value
       setCurrentFocusIndex(newFocusIndex);
   };
   
   
   // Define spreadable props for button and items
   const buttonProps: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> = {
       onKeyDown: buttonListener,
       onClick: buttonListener,
       tabIndex: 0,
       ref: buttonRef,
       role: 'button',
       'aria-haspopup': true,
       'aria-expanded': isOpen,
   };
   
   const itemProps = [...Array(itemCount)].map((ignore, index) => ({
       onKeyDown: itemListener,
       tabIndex: -1,
       role: 'menuitem',
       ref: itemRefs.current[index],
   }));
   
   
   // Return a listener for the button, individual list items, and the state of the menu
   return [buttonProps, itemProps, isOpen] as const;
};
