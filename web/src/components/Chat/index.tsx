import { Card, Space, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { DrawerContext } from "../../utils/context";
import { stringGen } from "../../utils/lorem";
import { CommonDrawerTitle } from "../shared/CommonDrawerTitle";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { ChannelDescription } from "./ChannelDescription";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";

const { Title } = Typography;

const defaultMessages = [...Array(1)].map(() => ({
	content: stringGen.generateSentences(4),
	by: stringGen.generateWords(2),
	createdAt: "12:30",
	likes: Math.round(Math.random() * 10)
}));

export const ChatScreen = () => {
	const [messages, setMessages] = useState(defaultMessages);
	const { setDrawerComponent, setDrawerProps } = useContext(DrawerContext)!;

	const scrollToBottom = () => {
		const container = document.querySelector(".messages-container")!;
		const { clientHeight, scrollTop, scrollHeight } = container;
		const newMessage = container.children[container.children.length - 1];
		if (
			clientHeight + scrollTop + 2 * newMessage.clientHeight >=
			scrollHeight
		) {
			container.scrollTop = container.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<Card
			extra={
				<Space>
					<span
						onClick={() =>
							setMessages(
								messages.concat([
									{
										content: stringGen.generateSentences(4),
										by: stringGen.generateWords(2),
										createdAt: "12:30",
										likes: Math.round(Math.random() * 10)
									}
								])
							)
						}
					>
						New Message
					</span>
					<span
						onClick={() => {
							setDrawerProps({
								title: (
									<CommonDrawerTitle
										title="House of Lords"
										onClose={() => setDrawerComponent(undefined)}
									/>
								),
								className: "channel-drawer"
							});
							setDrawerComponent(<ChannelDescription />);
						}}
					>
						<SwitchingIcon className="icon" name="info" />
					</span>
				</Space>
			}
			title={<Title level={3}>House Of Lords</Title>}
			className="message-screen"
		>
			<Card.Grid className="messages-container" hoverable={false}>
				{messages.map((message) => (
					<Message key={message.by} message={message} />
				))}
			</Card.Grid>
			<Card.Grid className="message-input-container" hoverable={false}>
				<MessageInput />
			</Card.Grid>
		</Card>
	);
};
