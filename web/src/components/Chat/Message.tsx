import { Avatar } from "antd";
import React from "react";

import { stringGen } from "../../utils/lorem";

interface MessageProps {
	isYour?: boolean;
}

export const MessageComponent = ({ isYour }: MessageProps) => {
	return (
		<div
			className="message-alignment-box"
			style={{ justifyContent: isYour ? "flex-end" : "flex-start" }}
		>
			<div className="message-box">
				<div className="avatar">
					<Avatar
						src="https://shaastra-2020.s3.ap-south-1.amazonaws.com/images/user2.svg"
						size={48}
					/>
				</div>
				<div className="message-details">
					<div className="sender-name">Yash Gupta</div>
					<div className="message-content">
						{stringGen.generateSentences(4)}
					</div>
				</div>
			</div>
		</div>
	);
};
