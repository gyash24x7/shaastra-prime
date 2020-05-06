import { HomeFilled, HomeOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ICON_MAP } from "../../utils/getIcon";

interface SwitchingIconProps {
	name: string;
	isActive?: boolean;
	className?: string;
	onClick?: () => void;
}

export const SwitchingIcon = ({
	name,
	isActive = false,
	className = "",
	onClick
}: SwitchingIconProps) => {
	let OutlinedIcon = (ICON_MAP[name] && ICON_MAP[name][0]) || HomeOutlined;
	let FilledIcon = (ICON_MAP[name] && ICON_MAP[name][1]) || HomeFilled;

	const [hover, setHover] = useState(false);

	return (
		<div
			className={className}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => onClick && onClick()}
		>
			{hover || isActive ? (
				<FilledIcon className="icon" />
			) : (
				<OutlinedIcon className="icon" />
			)}
		</div>
	);
};
