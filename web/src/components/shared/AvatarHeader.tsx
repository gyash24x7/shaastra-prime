import { Avatar, Tag } from "antd";
import React from "react";

export const AvatarHeader = () => {
	return (
		<div className="avatar-container">
			<div className="avatar">
				<Avatar
					src="https://shaastra-2020.s3.ap-south-1.amazonaws.com/images/user2.svg"
					size={52}
				/>
			</div>
			<div className="user-details">
				<div className="user-name">Yash Gupta</div>
				<div className="user-position">
					<Tag color="#de350b">WEBOPS</Tag>
					<Tag color="#0747a6">CORE</Tag>
				</div>
			</div>
		</div>
	);
};
