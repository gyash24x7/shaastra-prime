import React from "react";
import { selectChannelHeader } from "../../store/selectors/Channel";
import { useSelector } from "react-redux";

interface ChatHeaderProps {
	channelId: string
}

export const ChatHeader = ( { channelId }: ChatHeaderProps ) => {

	const channel = useSelector( selectChannelHeader( channelId ) );

	return (
		<div className="chat-header">
			<div># { channel.name }</div>
			<div className="channel-members">
				{ channel.members.map( member => member.name + ", " ) }
			</div>
		</div>
	);
};
