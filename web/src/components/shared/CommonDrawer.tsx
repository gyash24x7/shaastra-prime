import { Button, Drawer, Typography } from "antd";
import React, { Fragment, useContext } from "react";
import { DrawerContext, DrawerPropsExtended } from "../../utils/context";
import { SwitchingIcon } from "./SwitchingIcon";

interface CommonDrawerProps {
	component?: JSX.Element;
	visible: boolean;
	drawerProps?: DrawerPropsExtended;
	childDrawerComponent?: JSX.Element;
	childDrawerVisible?: boolean;
	childDrawerProps?: DrawerPropsExtended;
}

const { Title } = Typography;

export const CommonDrawer = (props: CommonDrawerProps) => {
	const { toggleDrawer } = useContext(DrawerContext)!;
	return (
		<Drawer
			width="50vw"
			{...props.drawerProps}
			visible={props.visible}
			closable={false}
			maskClosable
			title={
				<Fragment>
					<div className="drawer-header">
						<Title level={4}>{props.drawerProps?.title}</Title>
						<Button
							icon={<SwitchingIcon name="close" className="editor-icon" />}
							className="editor-btn"
							onClick={() => toggleDrawer()}
						/>
					</div>
					{props.drawerProps?.extra}
				</Fragment>
			}
		>
			{props.component}
			<Drawer
				{...props.childDrawerProps}
				visible={props.childDrawerVisible}
				closable={false}
				maskClosable
				title={
					<Fragment>
						<div className="drawer-header">
							<Title level={4}>{props.drawerProps?.title}</Title>
							<Button
								icon={<SwitchingIcon name="close" className="editor-icon" />}
								className="editor-btn"
								onClick={() => {
									props.drawerProps?.onClose &&
										props.drawerProps.onClose({} as any);
									toggleDrawer();
								}}
							/>
						</div>
						{props.drawerProps?.extra}
					</Fragment>
				}
			>
				{props.childDrawerComponent}
			</Drawer>
		</Drawer>
	);
};
