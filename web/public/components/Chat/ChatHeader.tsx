import React from "react";

interface ChatHeaderProps {
	channelId: string;
}

export const ChatHeader = ({ channelId }: ChatHeaderProps) => {
	console.log(channelId);
	return (
		<div className="chat-header">
			<div># Core Team</div>
			<div className="channel-members">
				Yash Gupta, Abhinav Kankane, Swarnav Das
			</div>
		</div>
	);
};
