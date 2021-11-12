// Imports
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faMouse } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';

// Function component
const Demo: React.FC = () => {
	// Use the Hook
	const { buttonProps, itemProps, isOpen } = useDropdownMenu(3);

	// Return JSX
	return (
		<Layout title={`Demo`} description='A simple Hook for creating fully accessible dropdown menus in React'>
			<header className={clsx('hero hero--primary', styles.heroBanner)}>
				<div className='container'>
					<h1 className='hero__title'>Demo</h1>
				</div>
			</header>
			<main>
				<section className={styles.features}>
					<div className='container'>
						<div className='row'>
							<div className='col col--12'>
								<button {...buttonProps} type='button' className='demo-button'>
									<span>Try me!</span>
									<FontAwesomeIcon icon={faAngleDown} />
								</button>

								<div className={`demo-menu ${isOpen ? 'visible' : ''}`} role='menu'>
									<a
										{...itemProps[0]}
										href='https://github.com/sparksuite/react-accessible-dropdown-menu-hook'
										id='menu-item-1'
									>
										<FontAwesomeIcon icon={faGithub} fixedWidth={true} />
										View on GitHub
									</a>

									<a
										{...itemProps[1]}
										href='https://www.npmjs.com/package/react-accessible-dropdown-menu-hook'
										id='menu-item-2'
									>
										<FontAwesomeIcon icon={faNpm} fixedWidth={true} />
										View on npm
									</a>

									<a {...itemProps[2]} onClick={() => alert('Click!')} id='menu-item-3'>
										<FontAwesomeIcon icon={faMouse} fixedWidth={true} />
										Item with click handler
									</a>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col col--12'>
								<ul className='behavior'>
									<li>
										The menu can be revealed by clicking the button, or by focusing the button and pressing enter /
										space
									</li>
									<li>When the menu is revealed, the first menu item is automatically focused</li>
									<li>
										<em>Once focus is in the menu…</em>

										<ul>
											<li>
												The up / down arrow keys allow for navigation through the menu items (including wrapping from
												first to last and vice versa)
											</li>
											<li>Pressing tab will close the menu and move the focus to the next focusable element</li>
											<li>
												Pressing shift-tab will close the menu and move the focus to the previous focusable element
											</li>
											<li>Pressing escape will close the menu and return the focus to the button</li>
											<li>
												Pressing enter or space will activate that item and close the menu (whether it’s a link or has a
												click handler attached)
											</li>
											<li>
												Pressing any other character will move to the first menu item that starts with that character,
												if there is not a matching item, focus remains the same
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default Demo;
