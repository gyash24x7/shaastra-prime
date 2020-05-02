import { Avatar, Card, Tag } from "antd";
import React, { useContext } from "react";
import { DrawerContext } from "../../utils/context";
import { Loader } from "./Loader";

interface UserCardProps {
	withAvatar?: boolean;
	avatarSize?: number;
}

export const UserCard = ({ withAvatar, avatarSize }: UserCardProps) => {
	const { setDrawerComponent } = useContext(DrawerContext)!;

	return (
		<Card
			bordered={false}
			className={
				withAvatar ? "avatar-container with-avatar" : "avatar-container"
			}
		>
			{withAvatar && (
				<div className="avatar">
					<Avatar
						src="https://shaastra-2020.s3.ap-south-1.amazonaws.com/images/user9.svg"
						size={avatarSize || 48}
					/>
				</div>
			)}
			<div className="user-details">
				<div
					className="user-name"
					onClick={() => setDrawerComponent(<Loader />)}
				>
					<Tag color="cyan">Yash Gupta</Tag>
				</div>
				<div className="user-position">
					<Tag color="red">WEBOPS</Tag>
					<Tag color="gold">CORE</Tag>
				</div>
			</div>
		</Card>
	);
};
