import MailIcon from "@atlaskit/icon/glyph/email";
import PhoneIcon from "@atlaskit/icon/glyph/hipchat/dial-out";
import PersonIcon from "@atlaskit/icon/glyph/person";
import { ButtonItem, HeadingItem, MenuGroup, Section } from "@atlaskit/menu";
import React from "react";

import { useMeQuery } from "../../generated";
import { Loader } from "../Shared/Loader";
import { ShowError } from "../Shared/ShowError";
import { CoverPic } from "./CoverPic";
import { ProfilePic } from "./ProfilePic";

export const ProfileCard = () => {
	const { data, error } = useMeQuery();

	if (error) return <ShowError />;

	if (data?.me) {
		const user = data.me;
		return (
			<figure>
				<CoverPic />
				<figcaption>
					<ProfilePic />
					<h2>
						{user.name}
						<span>
							{user.department.name} | {user.role}
						</span>
					</h2>
					<p>{user.about}</p>
					<div className="user-details">
						<MenuGroup>
							<Section>
								<HeadingItem>Personal Details</HeadingItem>
								<ButtonItem
									description="Mobile"
									elemBefore={<PhoneIcon label="Phone" />}
								>
									{user.mobile}
								</ButtonItem>
								<ButtonItem
									description="Email"
									elemBefore={<MailIcon label="Email" />}
								>
									{user.email}
								</ButtonItem>
								<ButtonItem
									description="Roll Number"
									elemBefore={<PersonIcon label="Roll Number" />}
								>
									{user.rollNumber}
								</ButtonItem>
							</Section>
						</MenuGroup>
					</div>
				</figcaption>
			</figure>
		);
	}

	return <Loader />;
};
