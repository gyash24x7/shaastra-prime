import { Avatar, Tag } from "antd";
import React from "react";

interface AvatarHeaderProps {
	withAvatar?: boolean;
}

export const AvatarHeader = ({ withAvatar }: AvatarHeaderProps) => {
	return (
		<div
			className={
				withAvatar ? "avatar-container with-avatar" : "avatar-container"
			}
		>
			{withAvatar && (
				<div className="avatar">
					<Avatar
						src="https://shaastra-2020.s3.ap-south-1.amazonaws.com/images/user2.svg"
						size={48}
					/>
				</div>
			)}
			<div className="user-details">
				<div className="user-name">
					<Tag color="cyan">Yash Gupta</Tag>
				</div>
				<div className="user-position">
					<Tag color="red">WEBOPS</Tag>
					<Tag color="gold">CORE</Tag>
				</div>
			</div>
		</div>
	);
};
