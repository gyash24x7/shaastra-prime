import { Avatar, Card } from "antd";
import React from "react";
import { User } from "../../generated";
import { RecursivePartial } from "../../generated/types";
import { UserCardSmall } from "./UserCardSmall";

interface UserCardProps {
	withAvatar?: boolean;
	avatarSize?: number;
	noPadding?: boolean;
	user?: RecursivePartial<User>;
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
						src={
							props.user?.profilePic ||
							"https://library.kissclipart.com/20180922/eve/kissclipart-icon-full-name-clipart-computer-icons-avatar-icon-f6cf26ff2213f36e.jpg"
						}
						size={props.avatarSize || 48}
						style={{ border: "2px solid #303030" }}
					/>
				</div>
			)}
			<UserCardSmall noPadding={props.noPadding} user={props.user!} />
		</Card>
	);
};
