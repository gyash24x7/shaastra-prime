import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import { SwitchingIcon } from "../shared/SwitchingIcon";

interface NavIconProps {
	name: string;
	linkDisabled?: boolean;
	onClick?: () => void;
}

export const NavIcon = ({ name, linkDisabled }: NavIconProps) => {
	const { pathname } = useLocation();
	const isActive = pathname.split("/")[1] === name;
	const WrapperComponent = linkDisabled ? Fragment : Link;
	let linkProps: any = {};
	if (!linkDisabled) linkProps.to = `/${name}`;

	return (
		<WrapperComponent {...linkProps}>
			<SwitchingIcon name={name} isActive={isActive} className="app-icon" />
		</WrapperComponent>
	);
};
