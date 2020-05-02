import { Drawer } from "antd";
import { DrawerProps } from "antd/lib/drawer";
import React from "react";

interface CommonDrawerProps {
	component?: JSX.Element;
	visible: boolean;
	onClose?: () => void;
	drawerProps?: DrawerProps;
}

export const CommonDrawer = (props: CommonDrawerProps) => {
	return (
		<Drawer
			{...props.drawerProps}
			visible={props.visible}
			closable={false}
			onClose={props.onClose || undefined}
			width="50vw"
		>
			{props.component}
		</Drawer>
	);
};
