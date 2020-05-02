import { Drawer } from "antd";
import { DrawerProps } from "antd/lib/drawer";
import React, { useContext } from "react";
import { DrawerContext } from "../../utils/context";

interface CommonDrawerProps {
	component?: JSX.Element;
	visible: boolean;
	drawerProps?: DrawerProps;
	childDrawerComponent?: JSX.Element;
	childDrawerVisible?: boolean;
	childDrawerProps?: DrawerProps;
}

export const CommonDrawer = (props: CommonDrawerProps) => {
	const { setDrawerComponent, setChildDrawerComponent } = useContext(
		DrawerContext!
	)!;

	return (
		<Drawer
			width="50vw"
			{...props.drawerProps}
			visible={props.visible}
			closable={false}
			maskClosable
			onClose={() => setDrawerComponent(undefined)}
		>
			{props.component}
			<Drawer
				{...props.childDrawerProps}
				visible={props.childDrawerVisible}
				closable={false}
				maskClosable
				onClose={() => setChildDrawerComponent(undefined)}
			>
				{props.childDrawerComponent}
			</Drawer>
		</Drawer>
	);
};
