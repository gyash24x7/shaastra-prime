import { Card, Typography } from "antd";
import React, { Fragment } from "react";
import { useGetDeptmembersQuery, UserRole } from "../../generated";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";
import { UserCard } from "../shared/UserCard";

interface TeamProps {
	deptId: string;
}
const { Title } = Typography;

export const TeamComponent = (props: TeamProps) => {
	const { data, error } = useGetDeptmembersQuery({
		variables: { deptId: props.deptId }
	});

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	if (data?.getDeptMembers) {
		return (
			<Fragment>
				<Card.Grid className="team-card-grid" hoverable={false}>
					<Title level={4}>Cores</Title>
					<div className="grid-row">
						{data.getDeptMembers
							.filter(({ role }) => role === UserRole.Core)
							.map((user, i) => (
								<div className="grid-col team-member" key={i}>
									<UserCard withAvatar user={user} />
								</div>
							))}
					</div>
				</Card.Grid>
				<Card.Grid className="team-card-grid" hoverable={false}>
					<Title level={4}>Heads</Title>
					<div className="grid-row">
						{data.getDeptMembers
							.filter(({ role }) => role === UserRole.Head)
							.map((user, i) => (
								<div className="grid-col team-member" key={i}>
									<UserCard withAvatar user={user} />
								</div>
							))}
					</div>
				</Card.Grid>
				<Card.Grid className="team-card-grid" hoverable={false}>
					<Title level={4}>Coordinators</Title>
					<div className="grid-row">
						{data.getDeptMembers
							.filter(({ role }) => role === UserRole.Coord)
							.map((user, i) => (
								<div className="grid-col team-member" key={i}>
									<UserCard withAvatar user={user} />
								</div>
							))}
					</div>
				</Card.Grid>
			</Fragment>
		);
	}

	return <Loader />;
};
