// Imports
import React, { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Create interface for button properties
interface ButtonProps<ButtonElement extends HTMLElement>
	extends Pick<
		React.DetailedHTMLProps<React.HTMLAttributes<ButtonElement>, ButtonElement>,
		'onKeyDown' | 'onClick' | 'tabIndex' | 'role' | 'aria-haspopup' | 'aria-expanded'
	> {
	ref: React.RefObject<HTMLButtonElement>;
}

// A custom Hook that abstracts away the listeners/controls for dropdown menus
export interface DropdownMenuOptions {
	disableFocusFirstItemOnClick?: boolean;
	handleItemKeyboardSelect?<T extends React.KeyboardEvent<HTMLElement>>(event: T): void;
}

interface DropdownMenuResponse<ButtonElement extends HTMLElement> {
	readonly buttonProps: ButtonProps<HTMLButtonElement>;
	readonly itemProps: {
		onKeyDown: (e: React.KeyboardEvent<ButtonElement>) => void;
		tabIndex: number;
		role: string;
		ref: React.RefObject<ButtonElement>;
	}[];
	readonly isOpen: boolean;
	readonly setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	readonly moveFocus: (itemIndex: number) => void;
}

export default function useDropdownMenu<OptionElement extends HTMLElement = HTMLButtonElement>(
	itemCount: number,
	options?: DropdownMenuOptions
): DropdownMenuResponse<OptionElement> {
	// Use state
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const currentFocusIndex = useRef<number | null>(null);
	const firstRun = useRef(true);
	const clickedOpen = useRef(false);

	// Create refs
	const buttonRef = useRef<HTMLButtonElement>(null);
	const itemRefs = useMemo<React.RefObject<OptionElement>[]>(
		() => Array.from({ length: itemCount }, () => createRef<OptionElement>()),
		[itemCount]
	);

	// Create type guard
	const isKeyboardEvent = (e: React.KeyboardEvent | React.MouseEvent): e is React.KeyboardEvent =>
		(e as React.KeyboardEvent).key !== undefined;

	// Handles moving the focus between menu items
	const moveFocus = useCallback(
		(itemIndex: number): void => {
			if (itemRefs[itemIndex]) {
				currentFocusIndex.current = itemIndex;
				itemRefs[itemIndex].current?.focus();
			}
		},
		[itemRefs]
	);

	// Focus the first item when the menu opens
	useEffect(() => {
		// Stop if this is the first fire of the Hook, and update the ref
		if (firstRun.current) {
			firstRun.current = false;
			return;
		}

		// If the menu is currently open focus on the first item in the menu
		if (isOpen && !options?.disableFocusFirstItemOnClick) {
			moveFocus(0);
		} else if (!isOpen) {
			clickedOpen.current = false;
		}
	}, [isOpen, moveFocus, options?.disableFocusFirstItemOnClick]);

	// Handle listening for clicks and auto-hiding the menu
	useEffect(() => {
		// Ignore if the menu isn't open
		if (!isOpen) {
			return;
		}

		// Initialize object to track if the removal happens before the addition of the event listener
		//  -> We're using an object here so that arrow functions below capture the reference and not the value
		const removalTracker = {
			removed: false,
		};

		// This function is designed to handle every click
		const handleEveryClick = (event: MouseEvent): void => {
			// Make this happen asynchronously
			setTimeout(() => {
				// Type guard
				if (!(event.target instanceof Element)) {
					return;
				}

				// Ignore if we're clicking inside the menu
				if (event.target.closest('[role="menu"]') instanceof Element) {
					return;
				}

				// Hide dropdown
				setIsOpen(false);
			}, 10);
		};

		// Add listener
		//  -> Force it to be async to fix: https://github.com/facebook/react/issues/20074
		setTimeout(() => {
			if (removalTracker.removed) {
				return;
			}

			document.addEventListener('click', handleEveryClick);
		}, 1);

		// Return function to remove listener
		return (): void => {
			removalTracker.removed = true;

			document.removeEventListener('click', handleEveryClick);
		};
	}, [isOpen]);

	// Disable scroll when the menu is opened, and revert back when the menu is closed
	useEffect(() => {
		const disableArrowScroll = (event: KeyboardEvent): void => {
			if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
				event.preventDefault();
			}
		};

		document.addEventListener('keydown', disableArrowScroll);

		return (): void => document.removeEventListener('keydown', disableArrowScroll);
	}, [isOpen]);

	// Create a handler function for the button's clicks and keyboard events
	const buttonListener = (e: React.KeyboardEvent | React.MouseEvent): void => {
		// Detect if event was a keyboard event or a mouse event
		if (isKeyboardEvent(e)) {
			const { key } = e;

			if (!['Enter', ' ', 'Tab', 'ArrowDown', 'Escape'].includes(key)) {
				return;
			}

			if ((key === 'Tab' || key === 'ArrowDown') && clickedOpen.current && isOpen) {
				e.preventDefault();
				moveFocus(0);
			}

			if (key === 'Enter' || key === ' ') {
				e.preventDefault();
				setIsOpen(true);
			}

			if (key === 'Escape') {
				e.preventDefault();
				setIsOpen(false);
			}
		} else {
			if (options?.disableFocusFirstItemOnClick) {
				clickedOpen.current = !isOpen;
			}

			setIsOpen(!isOpen);
		}
	};

	// Create a function that handles menu logic based on keyboard events that occur on menu items
	const itemListener = (e: React.KeyboardEvent<OptionElement>): void => {
		// Destructure the key property from the event object
		const { key } = e;

		// Handle keyboard controls
		if (['Tab', 'Shift', 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', ' '].includes(key)) {
			// Create mutable value that initializes as the currentFocusIndex value
			let newFocusIndex = currentFocusIndex.current;

			// Controls whether the menu is open or closed, if the button should regain focus on close, and if a handler function should be called
			if (key === 'Escape') {
				setIsOpen(false);
				buttonRef.current?.focus();
				return;
			}

			if (key === 'Tab') {
				setIsOpen(false);
				return;
			}

			if (key === 'Enter' || key === ' ') {
				if (options?.handleItemKeyboardSelect) {
					options.handleItemKeyboardSelect(e);
				} else if (e.currentTarget instanceof HTMLAnchorElement && !e.currentTarget.href) {
					e.currentTarget.click();
				}

				setIsOpen(false);
				return;
			}

			// Controls the current index to focus
			if (newFocusIndex !== null) {
				if (key === 'ArrowUp') {
					newFocusIndex -= 1;
				} else if (key === 'ArrowDown') {
					newFocusIndex += 1;
				}

				if (newFocusIndex > itemRefs.length - 1) {
					newFocusIndex = 0;
				} else if (newFocusIndex < 0) {
					newFocusIndex = itemRefs.length - 1;
				}
			}

			// After any modification set state to the modified value
			if (newFocusIndex !== null) {
				moveFocus(newFocusIndex);
			}

			return;
		}

		// Handle printable keys
		if (/[a-zA-Z0-9./<>?;:"'`!@#$%^&*()\\[\]{}_+=|\\-~,]/.test(key)) {
			const index = itemRefs.findIndex(
				(ref) =>
					ref.current?.innerText?.toLowerCase().startsWith(key.toLowerCase()) ||
					ref.current?.textContent?.toLowerCase().startsWith(key.toLowerCase()) ||
					ref.current?.getAttribute('aria-label')?.toLowerCase().startsWith(key.toLowerCase())
			);

			if (index !== -1) {
				moveFocus(index);
			}
		}
	};

	// Define spreadable props for button and items
	const buttonProps: ButtonProps<HTMLButtonElement> = {
		onKeyDown: buttonListener,
		onClick: buttonListener,
		tabIndex: 0,
		ref: buttonRef,
		role: 'button',
		'aria-haspopup': true,
		'aria-expanded': isOpen,
	};

	const itemProps = Array.from({ length: itemCount }, (_ignore, index) => ({
		onKeyDown: itemListener,
		tabIndex: -1,
		role: 'menuitem',
		ref: itemRefs[index],
	}));

	// Return a listener for the button, individual list items, and the state of the menu
	return { buttonProps, itemProps, isOpen, setIsOpen, moveFocus } as const;
}
