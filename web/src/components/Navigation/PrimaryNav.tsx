import React from "react";

import LogoWhite from "../../images/2020_white.png";
import { NavIcon } from "./NavIcon";

export const PrimaryNav = () => {
	return (
		<div className="primary-nav">
			<div className="app-icon-container">
				<div className="logo-icon">
					<img src={LogoWhite} alt="" />
				</div>
				<NavIcon name="" />
				<NavIcon name="chat" />
				<NavIcon name="equip" />
				<NavIcon name="finbooks" />
			</div>
			<div className="app-settings-container">
				<NavIcon name="notification" linkDisabled />
				<NavIcon name="settings" />
				<NavIcon name="logout" linkDisabled />
			</div>
		</div>
	);
};
