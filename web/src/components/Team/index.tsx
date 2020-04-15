import { Typography } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

import { PrivateLayout } from "../shared/PrivateLayout";
import { TeamCard } from "../shared/TeamCard";

export const TeamScreen = () => {
	const { department } = useParams();

	return (
		<PrivateLayout title={`${department} Team`}>
			<div className="screen-wrapper">
				<Typography.Title level={4}>Cores</Typography.Title>
				<div className="grid-row">
					{[...Array(2)].map((_, i) => (
						<div key={i} className="grid-col">
							<TeamCard />
						</div>
					))}
				</div>
				<Typography.Title level={4}>Heads</Typography.Title>
				<div className="grid-row">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="grid-col">
							<TeamCard />
						</div>
					))}
				</div>
				<Typography.Title level={4}>Coords</Typography.Title>
				<div className="grid-row">
					{[...Array(7)].map((_, i) => (
						<div key={i} className="grid-col">
							<TeamCard />
						</div>
					))}
				</div>
			</div>
		</PrivateLayout>
	);
};
