import { Card, Tag, Typography } from "antd";
import React, { Fragment, useState } from "react";

import { UserDetails } from "./UserDetails";
import { UserMedia } from "./UserMedia";

const TabComponents: Record<string, JSX.Element> = {
	Details: <UserDetails />,
	Media: <UserMedia />
};

const { Title, Text } = Typography;

export const UserDataCard = () => {
	const [activeTab, setActiveTab] = useState("Details");
	return (
		<Card
			title={<Title level={3}>Yash Gupta</Title>}
			tabList={[
				{ key: "Details", tab: <Text strong>Details</Text> },
				{ key: "Media", tab: <Text strong>Media</Text> }
			]}
			activeTabKey={activeTab}
			className="user-card"
			onTabChange={setActiveTab}
			tabBarExtraContent={<div />}
			extra={
				<Fragment>
					<Tag color="red">WEBOPS</Tag>
					<Tag color="gold">CORE</Tag>
				</Fragment>
			}
		>
			{TabComponents[activeTab]}
		</Card>
	);
};
