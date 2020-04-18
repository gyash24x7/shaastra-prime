import { Drawer } from "antd";
import React from "react";

interface CommonDrawerProps {
	component?: JSX.Element;
	visible: boolean;
	onClose?: () => void;
}

export const CommonDrawer = (props: CommonDrawerProps) => {
	return (
		<Drawer
			visible={props.visible}
			onClose={props.onClose || undefined}
			width="50vw"
		>
			{props.component}
		</Drawer>
	);
};
