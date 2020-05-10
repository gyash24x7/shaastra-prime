const ICON_MAP: Record<string, string[]> = {
	file: ["file-outline", "file"],
	info: ["info-outline", "info"]
};
import { Icon, IconProps } from "@ui-kitten/components";
import React from "react";

interface SwitchingIconProps extends IconProps {
	name: string;
	isActive: boolean;
}

export const SwitchingIcon = ({
	isActive,
	name,
	...rest
}: SwitchingIconProps) => {
	if (isActive) return <Icon name={ICON_MAP[name][1]} {...rest} />;
	else return <Icon name={ICON_MAP[name][0]} {...rest} />;
};
