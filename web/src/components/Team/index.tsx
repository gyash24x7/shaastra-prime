import { Card, Typography } from "antd";
import React, { useState } from "react";
import { PrivateLayout } from "../shared/PrivateLayout";
import { TeamComponent } from "./TeamComponent";

const { Title, Text } = Typography;

export const TeamScreen = () => {
	const tabList = [
		{
			tab: <Text strong>WebOps</Text>,
			key: "WebOps"
		},
		{
			tab: <Text strong>C & D</Text>,
			key: "C&D"
		},
		{
			tab: <Text strong>QMS</Text>,
			key: "Qms"
		},
		{
			tab: <Text strong>Finance</Text>,
			key: "fin"
		},
		{
			tab: <Text strong>Publicity</Text>,
			key: "publicity"
		},
		{
			tab: <Text strong>O & IP</Text>,
			key: "O&IP"
		},
		{
			tab: <Text strong>Spons</Text>,
			key: "spons"
		},
		{
			tab: <Text strong>Evolve</Text>,
			key: "Evolve"
		},
		{
			tab: <Text strong>Envisage</Text>,
			key: "Envisage"
		},
		{
			tab: <Text strong>S & E</Text>,
			key: "S&E"
		}
	];

	const [activeDept, setActiveDept] = useState("WebOps");

	return (
		<PrivateLayout>
			<Card
				title={<Title level={3}>Team Shaastra</Title>}
				tabList={tabList}
				tabBarExtraContent={<div></div>}
				onTabChange={(tab) => setActiveDept(tab)}
				className="team-card"
			>
				<TeamComponent team={activeDept} />
			</Card>
		</PrivateLayout>
	);
};
