import { Card, Typography } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { PrivateLayout } from "../shared/PrivateLayout";
import { TeamCard } from "../shared/TeamCard";

const { Title } = Typography;

export const TeamScreen = () => {
	const { department } = useParams();
	return (
		<PrivateLayout>
			<Card title={`${department} Team`}>
				<Card.Grid className="team-card-grid" hoverable={false}>
					<Title level={4}>Cores</Title>
					<div className="grid-row">
						{[...Array(2)].map((_, i) => (
							<TeamCard key={i} />
						))}
					</div>
				</Card.Grid>
				<Card.Grid className="team-card-grid" hoverable={false}>
					<Title level={4}>HEADS</Title>
					<br />
					<div className="grid-row">
						{[...Array(3)].map((_, i) => (
							<TeamCard key={i} />
						))}
					</div>
				</Card.Grid>
				<Card.Grid className="team-card-grid" hoverable={false}>
					<Title level={4}>COORDINATORS</Title>
					<div className="grid-row">
						{[...Array(7)].map((_, i) => (
							<TeamCard key={i} />
						))}
					</div>
				</Card.Grid>
			</Card>
		</PrivateLayout>
	);
};
