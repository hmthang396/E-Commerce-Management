import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react';
import { AlignLeft, Maximize2, MoreHorizontal } from 'react-feather';
import logo from "../../assets/images/dashboard/multikart-logo.png";
import UserMenu from './common/UserMenu';
const Header = () => {
    const [sidebar, setSidebar] = useState(true);
	const [navMenus, setNavMenus] = useState(false);
    const toggle = () => {
		setNavMenus(!navMenus);
	};
    const goFull = () => {
		if (
			(document.fullScreenElement && document.fullScreenElement !== null) ||
			(!document.mozFullScreen && !document.webkitIsFullScreen)
		) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(
					Element.ALLOW_KEYBOARD_INPUT
				);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	};
    const openCloseSidebar = () => {
		if (sidebar) {
			setSidebar(false);
			document.querySelector(".page-main-header").classList.add("open");
			document.querySelector(".page-sidebar").classList.add("open");
		} else {
			setSidebar(true);
			document.querySelector(".page-main-header").classList.remove("open");
			document.querySelector(".page-sidebar").classList.remove("open");
		}
	};

    return (
        <Fragment>
            <div className ="page-main-header ">
                <div className="main-header-right row">
                    <div className="main-header-left d-lg-none">
                        <div className="logo-wrapper">
                            <a href="index.html">
                                <img className="blur-up lazyloaded" src={logo} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="mobile-sidebar">
                        <div className="media-body text-right switch-sm">
                            <label className="switch">
                                <a href="#javaScript" onClick={openCloseSidebar}>
                                    <AlignLeft />
                                </a>
                            </label>
                        </div>
                    </div>
                    <div className="nav-right col">
                        <ul className={"nav-menus " + (navMenus ? "open" : "")}>
                            <li>
								<a onClick={goFull} className="text-dark" href="#javaScript">
									<Maximize2 />
								</a>
							</li>
                            <UserMenu />
                        </ul>
                        <div
							className="d-lg-none mobile-toggle pull-right"
							onClick={() => toggle()}
						>
							<MoreHorizontal />
						</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header