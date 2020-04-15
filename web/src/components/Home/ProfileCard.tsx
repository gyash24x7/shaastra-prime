import { Card } from "antd";
import React from "react";

import { AvatarHeader } from "../shared/AvatarHeader";
import { SwitchingIcon } from "../shared/SwitchingIcon";

export const ProfileCard = () => {
	return (
		<Card
			className="profile-card"
			cover={<img alt="" src="https://source.unsplash.com/featured/500x400" />}
			actions={[
				<SwitchingIcon name="settings" />,
				<SwitchingIcon name="edit" />
			]}
		>
			<AvatarHeader />
		</Card>
	);
};
