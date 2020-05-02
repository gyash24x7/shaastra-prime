import { Avatar, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { UserCard } from "../shared/UserCard";

export const ProfileCard = () => {
	return (
		<Card
			className="profile-card"
			cover={<img alt="" src="https://source.unsplash.com/featured/500x400" />}
			actions={[
				<Link to="/settings">
					<SwitchingIcon name="settings" />
				</Link>,
				<SwitchingIcon name="edit" />,
				<SwitchingIcon name="ellipsis" />
			]}
		>
			<div className="avatar">
				<Avatar
					src="https://shaastra-2020.s3.ap-south-1.amazonaws.com/images/user2.svg"
					size={100}
				/>
			</div>
			<UserCard />
		</Card>
	);
};
