import { DeploymentUnitOutlined } from "@ant-design/icons";
import { Card, Result, Tag, Typography } from "antd";
import React, { Fragment, useContext, useState } from "react";
import { UserContext } from "../../utils/context";
import { UserMedia } from "./UserMedia";

export const TabComponents: Record<string, JSX.Element> = {
	Media: <UserMedia />
};

const { Title } = Typography;

export const UserDataCard = () => {
	const [activeTab, setActiveTab] = useState("Media");
	const { user } = useContext(UserContext)!;

	return (
		<Card
			title={<Title level={3}>{user.name}</Title>}
			// tabList={[
			// 	{
			// 		key: "Media",
			// 		tab: (
			// 			<div className="tab-title">
			// 				<Text strong>Media</Text>
			// 			</div>
			// 		)
			// 	}
			// ]}
			activeTabKey={activeTab}
			className="user-card card-with-tabs"
			onTabChange={setActiveTab}
			tabBarExtraContent={<div />}
			extra={
				<Fragment>
					<Tag color="red">{user.department?.name}</Tag>
					<Tag color="gold">{user.role}</Tag>
				</Fragment>
			}
		>
			<Result
				icon={<DeploymentUnitOutlined />}
				title="New Features Coming Soon!"
				subTitle="Stay Tuned!"
			/>
		</Card>
	);
};
