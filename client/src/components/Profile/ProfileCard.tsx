import React from "react";
import Avatar from "@atlaskit/avatar";
import { MenuGroup, Section, HeadingItem, ButtonItem } from "@atlaskit/menu";
import PhoneIcon from "@atlaskit/icon/glyph/hipchat/dial-out";
import MailIcon from "@atlaskit/icon/glyph/email";
import PersonIcon from "@atlaskit/icon/glyph/person";

export const ProfileCard = () => (
	<figure>
		<img
			src="https://source.unsplash.com/random/300x300"
			alt="sample87"
			className="cover-pic"
		/>
		<figcaption>
			<Avatar
				src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg"
				size="xlarge"
			/>
			<h2>
				Yash Gupta<span>WebOps | Core</span>
			</h2>
			<p>
				I'm looking for something that can deliver a 50-pound payload of snow on
				a small feminine target. Can you suggest something? Hello...?
			</p>
			<div className="user-details">
				<MenuGroup>
					<Section>
						<HeadingItem>Personal Details</HeadingItem>
						<ButtonItem
							description="Mobile"
							elemBefore={<PhoneIcon label="Phone" />}
						>
							7388378834
						</ButtonItem>
						<ButtonItem
							description="Email"
							elemBefore={<MailIcon label="Email" />}
						>
							gyash@shaastra.org
						</ButtonItem>
						<ButtonItem
							description="Roll Number"
							elemBefore={<PersonIcon label="Roll Number" />}
						>
							CH16B025
						</ButtonItem>
					</Section>
				</MenuGroup>
			</div>
		</figcaption>
	</figure>
);
