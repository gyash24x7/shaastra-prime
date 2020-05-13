import { Card } from "antd";
import React from "react";
import { useNewMessageSubscription } from "../../generated";
import { stringGen } from "../../utils/lorem";
import { Message } from "./Message";

const defaultMessages = [...Array(1)].map(() => ({
	content: stringGen.generateSentences(4),
	by: stringGen.generateWords(2),
	createdAt: "12:30",
	likes: Math.round(Math.random() * 10)
}));

export const MessageList = () => {
	const { data } = useNewMessageSubscription();

	if (data?.newMessage) {
		console.log(data.newMessage);
	}

	return (
		<Card.Grid className="messages-container" hoverable={false}>
			{defaultMessages.map((message) => (
				<Message key={message.by} message={message} />
			))}
		</Card.Grid>
	);
};
