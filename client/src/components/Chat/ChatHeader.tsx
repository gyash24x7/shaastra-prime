import React from "react";

interface ChatHeaderProps {
	channelId: string;
}

export const ChatHeader = ({ channelId }: ChatHeaderProps) => {
	const channel = useSelector(selectChannelHeader(channelId));

	return (
		<div className="chat-header">
			<div># {channel.name}</div>
			<div className="channel-members">
				{channel.members.map(member => member.name + ", ")}
			</div>
		</div>
	);
};
