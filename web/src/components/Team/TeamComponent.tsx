import { Card, Typography } from "antd";
import React, { Fragment } from "react";
import { UserCard } from "../shared/UserCard";

interface TeamProps {
	team: string;
}
const { Title } = Typography;

export const TeamComponent = (props: TeamProps) => {
	console.log(props.team);
	return (
		<Fragment>
			<Card.Grid className="team-card-grid" hoverable={false}>
				<Title level={4}>Cores</Title>
				<div className="grid-row">
					{[...Array(2)].map((_, i) => (
						<div className="grid-col team-member" key={i}>
							<UserCard withAvatar />
						</div>
					))}
				</div>
			</Card.Grid>
			<Card.Grid className="team-card-grid" hoverable={false}>
				<Title level={4}>Heads</Title>
				<div className="grid-row">
					{[...Array(3)].map((_, i) => (
						<div className="grid-col team-member" key={i}>
							<UserCard key={i} withAvatar />
						</div>
					))}
				</div>
			</Card.Grid>
			<Card.Grid className="team-card-grid" hoverable={false}>
				<Title level={4}>Coordinators</Title>
				<div className="grid-row">
					{[...Array(7)].map((_, i) => (
						<div className="grid-col team-member" key={i}>
							<UserCard key={i} withAvatar />
						</div>
					))}
				</div>
			</Card.Grid>
		</Fragment>
	);
};
