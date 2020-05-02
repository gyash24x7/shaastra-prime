import { Layout } from "antd";
import { DrawerProps } from "antd/lib/drawer";
import { ModalProps } from "antd/lib/modal";
import React, { useState } from "react";
import { useLocation } from "react-use";
import { DrawerContext, ModalContext } from "../../utils/context";
import { PrimaryNav } from "../Navigation/PrimaryNav";
import { getSecondaryNav } from "../Navigation/SecondaryNav";
import { CommonDrawer } from "./CommonDrawer";
import { CommonModal } from "./CommonModal";

const { Content, Sider } = Layout;

interface PrivateLayoutProps {
	children: any;
}

export const PrivateLayout = (props: PrivateLayoutProps) => {
	const [drawerComponent, setDrawerComponent] = useState<JSX.Element>();
	const [modalComponent, setModalComponent] = useState<JSX.Element>();
	const [modalProps, setModalProps] = useState<ModalProps>({});
	const [drawerProps, setDrawerProps] = useState<DrawerProps>({});
	const { pathname } = useLocation();
	const SecondaryNav = getSecondaryNav(pathname!);

	return (
		<div className="private-container">
			<DrawerContext.Provider value={{ setDrawerComponent, setDrawerProps }}>
				<ModalContext.Provider value={{ setModalComponent, setModalProps }}>
					<Layout>
						<Sider width="270" collapsedWidth="0">
							<SecondaryNav />
						</Sider>
						<Content>
							<div className="screen-wrapper">{props.children}</div>
						</Content>
					</Layout>
					<PrimaryNav />
				</ModalContext.Provider>
			</DrawerContext.Provider>
			<CommonModal
				component={modalComponent}
				visible={!!modalComponent}
				onCancel={() => setModalComponent(undefined)}
				modalProps={modalProps}
			/>
			<CommonDrawer
				component={drawerComponent}
				visible={!!drawerComponent}
				onClose={() => setDrawerComponent(undefined)}
				drawerProps={drawerProps}
			/>
		</div>
	);
};
