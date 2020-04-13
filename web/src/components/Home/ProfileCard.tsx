import { Card } from "antd";
import React from "react";

import { NavIcon } from "../Navigation/NavIcon";
import { AvatarHeader } from "../shared/AvatarHeader";

export const ProfileCard = () => {
	return (
		<Card
			className="profile-card"
			cover={<img alt="" src="https://source.unsplash.com/featured/500x400" />}
			actions={[<NavIcon name="settings" />, <NavIcon name="edit" />]}
		>
			<AvatarHeader />
		</Card>
	);
};
