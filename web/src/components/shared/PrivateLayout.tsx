import { Layout } from "antd";
import React, { useState } from "react";
import { DrawerContext } from "../../utils/context";
import { PrimaryNav } from "../Navigation/PrimaryNav";
import { SecondaryNav } from "../Navigation/SecondaryNav";
import { CommonDrawer } from "./CommonDrawer";

const { Content, Sider } = Layout;

interface PrivateLayoutProps {
	children: any;
}

export const PrivateLayout = (props: PrivateLayoutProps) => {
	const [activeDrawerComponent, setActiveDrawerComponent] = useState<
		JSX.Element | undefined
	>();

	return (
		<div className="private-container">
			<DrawerContext.Provider
				value={{
					component: activeDrawerComponent,
					visible: !!activeDrawerComponent,
					setDrawerComponent: setActiveDrawerComponent
				}}
			>
				<Layout>
					<Sider breakpoint="xl" width="270" collapsedWidth="0">
						<SecondaryNav />
					</Sider>
					<Layout>
						<Content>
							<div className="screen-wrapper">{props.children}</div>
						</Content>
					</Layout>
				</Layout>
				<PrimaryNav />
			</DrawerContext.Provider>

			<CommonDrawer
				component={activeDrawerComponent}
				visible={!!activeDrawerComponent}
				onClose={() => setActiveDrawerComponent(undefined)}
			/>
		</div>
	);
};
