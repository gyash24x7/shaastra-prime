import { Card, Typography } from "antd";
import React, { useState } from "react";

import { UserDetails } from "./UserDetails";
import { UserMedia } from "./UserMedia";

const TabComponents: Record<string, JSX.Element> = {
	Details: <UserDetails />,
	Media: <UserMedia />
};

export const UserDataCard = () => {
	const [activeTab, setActiveTab] = useState("Details");
	return (
		<Card
			title={<Typography.Title level={3}>User Data</Typography.Title>}
			tabList={[
				{
					key: "Details",
					tab: <Typography.Text strong>Details</Typography.Text>
				},
				{
					key: "Media",
					tab: <Typography.Text strong>Media</Typography.Text>
				}
			]}
			activeTabKey={activeTab}
			className="user-card"
			onTabChange={setActiveTab}
		>
			{TabComponents[activeTab]}
		</Card>
	);
};
