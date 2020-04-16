import { Card, Tag, Typography } from "antd";
import React, { Fragment, useState } from "react";

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
			title={<Typography.Title level={3}>Yash Gupta</Typography.Title>}
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
			tabBarExtraContent={<div />}
			extra={
				<Fragment>
					<Tag color="#de350b">WEBOPS</Tag>
					<Tag color="#0747a6">CORE</Tag>
				</Fragment>
			}
		>
			{TabComponents[activeTab]}
		</Card>
	);
};
