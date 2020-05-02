import { Drawer } from "antd";
import { DrawerProps } from "antd/lib/drawer";
import React from "react";

interface CommonDrawerProps {
	component?: JSX.Element;
	visible: boolean;
	drawerProps?: DrawerProps;
	childDrawerComponent?: JSX.Element;
	childDrawerVisible?: boolean;
	childDrawerProps?: DrawerProps;
}

export const CommonDrawer = (props: CommonDrawerProps) => {
	return (
		<Drawer
			width="50vw"
			{...props.drawerProps}
			visible={props.visible}
			closable={false}
		>
			{props.component}
			<Drawer
				{...props.childDrawerProps}
				visible={props.childDrawerVisible}
				closable={false}
			>
				{props.childDrawerComponent}
			</Drawer>
		</Drawer>
	);
};
