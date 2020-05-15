import { Icon, IconProps } from "@ui-kitten/components";
import React from "react";

interface SwitchingIconProps extends IconProps {
	name: string;
	isActive?: boolean;
	color?: string;
}

export const SwitchingIcon = ({
	isActive,
	name,
	color,
	...rest
}: SwitchingIconProps) => {
	return (
		<Icon
			name={name}
			{...rest}
			pack={isActive ? "ant-filled" : "ant-outlined"}
			color={color}
		/>
	);
};
