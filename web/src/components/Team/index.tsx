import { Card, Typography } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { PrivateLayout } from "../shared/PrivateLayout";
import { TeamCard } from "../shared/TeamCard";

const { Title } = Typography;

export const TeamScreen = () => {
	const { department } = useParams();
	const [activeKey, setActiveKey] = useState("core");

	const tabList = [
		{ key: "core", tab: <Title level={4}>Cores</Title> },
		{ key: "head", tab: <Title level={4}>Heads</Title> },
		{ key: "coord", tab: <Title level={4}>Coords</Title> }
	];

	const tabContent: Record<string, JSX.Element> = {
		core: (
			<div className="grid-row">
				{[...Array(2)].map((_, i) => (
					<TeamCard key={i} />
				))}
			</div>
		),
		head: (
			<div className="grid-row">
				{[...Array(3)].map((_, i) => (
					<TeamCard key={i} />
				))}
			</div>
		),
		coord: (
			<div className="grid-row">
				{[...Array(7)].map((_, i) => (
					<TeamCard key={i} />
				))}
			</div>
		)
	};

	return (
		<PrivateLayout title={`${department} Team`}>
			<div className="screen-wrapper">
				<Card
					tabList={tabList}
					activeTabKey={activeKey}
					tabBarExtraContent={<div />}
					onTabChange={setActiveKey}
					className="team-card-wrapper"
				>
					{tabContent[activeKey]}
				</Card>
			</div>
		</PrivateLayout>
	);
};
