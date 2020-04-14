import { Card } from "antd";
import React from "react";

import { NavIcon } from "../Navigation/NavIcon";
import { AvatarHeader } from "./AvatarHeader";

export const TeamCard = () => {
	return (
		<Card
			className="team-card"
			actions={[<NavIcon name="settings" />, <NavIcon name="edit" />]}
		>
			<AvatarHeader />
		</Card>
	);
};
