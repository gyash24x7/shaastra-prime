import { Col, Row, Typography } from "antd";
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
				<Row style={{ margin: "5px -15px 10px -15px" }}>
					{[...Array(2)].map((_, i) => (
						<Col key={i} lg={8} xl={6}>
							<TeamCard />
						</Col>
					))}
				</Row>
				<Typography.Title level={4}>Heads</Typography.Title>
				<Row style={{ margin: "5px -15px 10px -15px" }}>
					{[...Array(3)].map((_, i) => (
						<Col key={i} lg={8} xl={6}>
							<TeamCard />
						</Col>
					))}
				</Row>
				<Typography.Title level={4}>Coords</Typography.Title>
				<Row style={{ margin: "5px -15px 10px -15px" }}>
					{[...Array(6)].map((_, i) => (
						<Col key={i} lg={8} xl={6}>
							<TeamCard />
						</Col>
					))}
				</Row>
			</div>
		</PrivateLayout>
	);
};
