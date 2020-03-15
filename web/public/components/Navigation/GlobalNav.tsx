import React, { Fragment, useState } from "react";
import GlobalNavigation from "@atlaskit/global-navigation";
import Avatar from "@atlaskit/avatar";
import Drawer from "@atlaskit/drawer";
import { ButtonItem, HeadingItem, MenuGroup, Section } from "@atlaskit/menu";
import { getIcon } from "../Logos";
import { AppSwitcher } from "./AppSwitcher";

export const GlobalNav = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	return (
		<Fragment>
			<GlobalNavigation
				productIcon={getIcon("fff")}
				onProductClick={() => {}}
				appSwitcherComponent={() => (
					<AppSwitcher setIsDrawerOpen={setIsDrawerOpen} />
				)}
			/>
			<Drawer
				onClose={() => setIsDrawerOpen(false)}
				isOpen={isDrawerOpen}
				width="narrow"
			>
				<MenuGroup>
					<Section>
						<HeadingItem>Starred</HeadingItem>
						<ButtonItem
							description="Next-gen software project"
							elemBefore={<Avatar appearance="square" />}
						>
							Navigation System
						</ButtonItem>
						<ButtonItem description="Next-gen service desk">
							Analytics Platform
						</ButtonItem>
						<HeadingItem>Recent</HeadingItem>
						<ButtonItem description="Next-gen software project">
							Fabric Editor
						</ButtonItem>
						<ButtonItem description="Classic business project">
							Content Services
						</ButtonItem>
						<ButtonItem description="Next-gen software project">
							Trinity Mobile
						</ButtonItem>
						<ButtonItem description="Classic service desk">
							Customer Feedback
						</ButtonItem>
						<ButtonItem description="Classic software project">
							Design System
						</ButtonItem>
					</Section>
					<Section hasSeparator>
						<ButtonItem>View all projects</ButtonItem>
						<ButtonItem>Create project</ButtonItem>
					</Section>
				</MenuGroup>
			</Drawer>
		</Fragment>
	);
};
