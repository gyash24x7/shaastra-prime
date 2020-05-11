import { Icon, IconProps } from "@ui-kitten/components";
import React from "react";

interface SwitchingIconProps extends IconProps {
	name: string;
	isActive?: boolean;
}

export const SwitchingIcon = ({
	isActive,
	name,
	...rest
}: SwitchingIconProps) => {
	return (
		<Icon
			name={name}
			{...rest}
			pack={isActive ? "ant-filled" : "ant-outlined"}
		/>
	);
};
