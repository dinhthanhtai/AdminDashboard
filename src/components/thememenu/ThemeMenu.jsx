import React, { useRef, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setMode, setColor } from "../../features/theme/themeSlice";

import {
	mode_settings,
	color_settings
} from "../../assets/mockdata/mock-charts";

import "./styles.scss";

const clickOutside = (content_ref, toggle_ref) => {
	document.addEventListener("mousedown", (event) => {
		if (toggle_ref.current && toggle_ref.current.contains(event.target)) {
			content_ref.current.classList.toggle("active");
		} else {
			if (content_ref.current && !content_ref.current.contains(event.target)) {
				content_ref.current.classList.remove("active");
			}
		}
	});
};

const ThemeMenu = () => {
	const menu_ref = useRef(null);
	const menu_toggle_ref = useRef(null);

	clickOutside(menu_ref, menu_toggle_ref);

	const [currMode, setcurrMode] = useState("light");

	const [currColor, setcurrColor] = useState("blue");

	const setActiveMenu = () => menu_ref.current.classList.add("active");

	const closeMenu = () => menu_ref.current.classList.remove("active");

	const dispatch = useDispatch();

	const setModeTheme = (mode) => {
		setcurrMode(mode.id);
		localStorage.setItem("themeMode", mode.class);
		dispatch(setMode(mode.class));
	};

	const setColorTheme = (color) => {
		setcurrColor(color.id);
		localStorage.setItem("colorMode", color.class);
		dispatch(setColor(color.class));
	};

	useEffect(() => {
		const themeClass = mode_settings.find(
			(event) => event.class === localStorage.getItem("themeMode")
		);
		const colorClass = color_settings.find(
			(event) => event.class === localStorage.getItem("colorMode")
		);

		if (themeClass !== undefined) {
			setcurrMode(themeClass.id);
		}

		if (colorClass !== undefined) {
			setcurrColor(colorClass.id);
		}
	}, []);

	return (
		<div>
			<button
				ref={menu_toggle_ref}
				className='dropdown__toggle'
				onClick={setActiveMenu}
			>
				<i className='bx bx-palette' />
			</button>
			<div ref={menu_ref} className='theme-menu'>
				<h4>Theme Settings</h4>
				<button className='theme-menu__close' onClick={closeMenu}>
					<i className='bx bx-x' />
				</button>
				<div className='theme-menu__select'>
					<span>Choose mode</span>
					<ul className='mode-list'>
						{mode_settings.map((item, index) => (
							<li key={index} onClick={() => setModeTheme(item)}>
								<div
									className={`mode-list__color ${item.background} ${
										item.id === currMode && "active"
									}`}
								>
									<i className='bx bx-check'></i>
								</div>
								<span>{item.name}</span>
							</li>
						))}
					</ul>
				</div>
				<div className='theme-menu__select'>
					<span>Choose color</span>
					<ul className='mode-list'>
						{color_settings.map((item, index) => (
							<li key={index} onClick={() => setColorTheme(item)}>
								<div
									className={`mode-list__color ${item.background} ${
										item.id === currColor && "active"
									}`}
								>
									<i className='bx bx-check' />
								</div>
								<span> {item.name} </span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ThemeMenu;
