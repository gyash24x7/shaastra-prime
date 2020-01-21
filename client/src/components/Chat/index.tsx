import React from "react";
import { ChatInput } from "./ChatInput";
import { MessageBox } from "./MessageBox";

export const Chat = () => (
	<div className="chat-window">
		<div className="chat-header">
			<div># Core Team</div>
		</div>
		<MessageBox />
		<ChatInput />
	</div>
);
