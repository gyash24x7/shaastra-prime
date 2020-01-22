import React from "react";
import { ChatInput } from "./ChatInput";
import { MessageBox } from "./MessageBox";
import { ChatHeader } from "./ChatHeader";


interface ChatProps {
	channelId: string
}

export const Chat = ( { channelId }: ChatProps ) => (
	<div className="chat-window">
		<ChatHeader channelId={ channelId }/>
		<MessageBox channelId={ channelId }/>
		<ChatInput/>
	</div>
);
