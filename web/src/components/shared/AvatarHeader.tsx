import { Avatar } from "antd";
import React from "react";

export const AvatarHeader = () => {
	return (
		<div className="avatar-container">
			<div className="avatar">
				<Avatar src="" size={48} />
			</div>
			<div className="user-details">
				<div className="user-name">Yash Gupta</div>
				<div className="user-position">WEBOPS | CORE</div>
			</div>
		</div>
	);
};
