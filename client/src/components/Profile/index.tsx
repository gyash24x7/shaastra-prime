import React, { useEffect } from "react";
import { WindowProps } from "../Navigation";
import { withNavigationViewController } from "@atlaskit/navigation-next";
import { ProfileNav } from "./ProfileNav";
import Avatar from "@atlaskit/avatar";
import { MenuGroup, Section, HeadingItem, ButtonItem } from "@atlaskit/menu";
import { ProfileCard } from "./ProfileCard";

export const Profile = withNavigationViewController(
	({ navigationViewController }: WindowProps) => {
		useEffect(() => {
			navigationViewController.setView(ProfileNav.id);
		}, [navigationViewController]);

		return (
			<div className="content-window">
				<div className="profile-container">
					<div className="profile-cover" />
					<ProfileCard />
					<div className="profile-details">
						<h2>Your Activity</h2>
						<div className="activity-container">
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
						</div>
					</div>
				</div>
			</div>
		);
	}
);
