import { Avatar, Card } from "antd";
import React from "react";
import { UserCardSmall } from "./UserCardSmall";

interface UserCardProps {
	withAvatar?: boolean;
	avatarSize?: number;
	noPadding?: boolean;
}

export const UserCard = (props: UserCardProps) => {
	return (
		<Card
			bordered={false}
			className={
				props.withAvatar ? "avatar-container with-avatar" : "avatar-container"
			}
		>
			{props.withAvatar && (
				<div className="avatar">
					<Avatar
						src="https://shaastra-2020.s3.ap-south-1.amazonaws.com/images/user9.svg"
						size={props.avatarSize || 48}
					/>
				</div>
			)}
			<UserCardSmall noPadding={props.noPadding} />
		</Card>
	);
};
