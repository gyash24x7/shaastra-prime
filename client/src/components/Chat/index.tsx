import React, { useEffect } from "react";
import { withNavigationViewController } from "@atlaskit/navigation-next";
import { ChatNav } from "./ChatNav";
import { WindowProps } from "../Navigation";
import { ChatInput } from "./ChatInput";
import { MessageBox } from "./MessageBox";

export const Chat = withNavigationViewController(
	({ navigationViewController }: WindowProps) => {
		useEffect(() => {
			navigationViewController.setView(ChatNav.id);
		}, [navigationViewController]);

		return (
			<div className="chat-window">
				<div className="chat-header">
					<div># Core Team</div>
				</div>
				<MessageBox />
				<ChatInput />
			</div>
		);
	}
);
