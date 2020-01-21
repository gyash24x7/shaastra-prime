import React, { Fragment, useState } from "react";
import GlobalNavigation from "@atlaskit/global-navigation";
import { AtlassianIcon } from "@atlaskit/logo";
import AppSwitcherIcon from "@atlaskit/icon/glyph/app-switcher";
import NotificationIcon from "@atlaskit/icon/glyph/notification";
import Avatar from "@atlaskit/avatar";
import { GlobalItem } from "@atlaskit/navigation-next";
import Drawer from "@atlaskit/drawer";
import { Link } from "react-router-dom";
import { ButtonItem, HeadingItem, MenuGroup, Section } from "@atlaskit/menu";

export const GlobalNav = () => {
	const [ isDrawerOpen, setIsDrawerOpen ] = useState( false );

	const AppSwitcherComponent = ( props: any ) => (
		<Fragment>
			<Link to="/">
				<GlobalItem icon={ AppSwitcherIcon } onClick={ () => {} }/>
			</Link>
			<GlobalItem
				icon={ NotificationIcon }
				onClick={ () => {
					setIsDrawerOpen( true );
				} }
			/>
		</Fragment>
	);

	return (
		<Fragment>
			<GlobalNavigation
				productIcon={ () => <AtlassianIcon/> }
				onProductClick={ () => {} }
				appSwitcherComponent={ AppSwitcherComponent }
				onSettingsClick={ () => {} }
			/>
			<Drawer
				onClose={ () => setIsDrawerOpen( false ) }
				isOpen={ isDrawerOpen }
				width="narrow"
			>
				<MenuGroup>
					<Section>
						<HeadingItem>Starred</HeadingItem>
						<ButtonItem
							description="Next-gen software project"
							elemBefore={ <Avatar appearance="square"/> }
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
