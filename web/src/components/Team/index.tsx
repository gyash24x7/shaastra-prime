import { Card, Typography } from "antd";
import React, { useState } from "react";
import { TeamComponent } from "./TeamComponent";

const { Title, Text } = Typography;

export const TeamScreen = () => {
	const tabList = [
		{
			tab: (
				<div className="tab-title">
					<Text strong>WebOps</Text>
				</div>
			),
			key: "WebOps"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>C&D</Text>
				</div>
			),
			key: "C&D"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>QMS</Text>
				</div>
			),
			key: "Qms"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>Finance</Text>
				</div>
			),
			key: "fin"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>Publicity</Text>
				</div>
			),
			key: "publicity"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>O&IP</Text>
				</div>
			),
			key: "O&IP"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>Spons</Text>
				</div>
			),
			key: "spons"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>Evolve</Text>
				</div>
			),
			key: "Evolve"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>Envisage</Text>
				</div>
			),
			key: "Envisage"
		},
		{
			tab: (
				<div className="tab-title">
					<Text strong>S&E</Text>
				</div>
			),
			key: "S&E"
		}
	];

	const [activeDept, setActiveDept] = useState("WebOps");

	return (
		<Card
			title={<Title level={3}>Team Shaastra</Title>}
			tabList={tabList}
			tabBarExtraContent={<div></div>}
			onTabChange={(tab) => setActiveDept(tab)}
			className="team-card card-with-tabs "
		>
			<TeamComponent team={activeDept} />
		</Card>
	);
};
