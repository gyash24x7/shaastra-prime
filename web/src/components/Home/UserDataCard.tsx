import { Card, Tag, Typography } from "antd";
import React, { Fragment, useState } from "react";
import { UserMedia } from "./UserMedia";

const TabComponents: Record<string, JSX.Element> = {
	Media: <UserMedia />
};

const { Title, Text } = Typography;

export const UserDataCard = () => {
	const [activeTab, setActiveTab] = useState("Media");
	return (
		<Card
			title={<Title level={3}>Yash Gupta</Title>}
			tabList={[
				{
					key: "Media",
					tab: (
						<div className="tab-title">
							<Text strong>Media</Text>
						</div>
					)
				}
			]}
			activeTabKey={activeTab}
			className="user-card card-with-tabs"
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
