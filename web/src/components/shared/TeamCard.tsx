import { Card } from "antd";
import React from "react";

import { AvatarHeader } from "./AvatarHeader";
import { SwitchingIcon } from "./SwitchingIcon";

export const TeamCard = () => {
	return (
		<Card
			className="team-card grid-col"
			actions={[
				<SwitchingIcon name="settings" />,
				<SwitchingIcon name="edit" />
			]}
		>
			<AvatarHeader withAvatar />
		</Card>
	);
};
