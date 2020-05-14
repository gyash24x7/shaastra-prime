import { Card } from "antd";
import React, { useEffect } from "react";
import {
	GetMessagesDocument,
	useGetMessagesQuery,
	useNewMessageSubscription
} from "../../generated";
import { Loader } from "../shared/Loader";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
	channelId: string;
}

export const MessageList = ({ channelId }: MessageListProps) => {
	const { data, error } = useGetMessagesQuery({
		variables: { channelId }
	});

	useNewMessageSubscription({
		onSubscriptionData({ subscriptionData, client }) {
			client.writeQuery({
				query: GetMessagesDocument,
				variables: { channelId },
				data: {
					getMessages: [subscriptionData.data?.newMessage, ...data!.getMessages]
				}
			});
		},
		variables: { channelId }
	});

	const scrollToBottom = () => {
		const container = document.querySelector(".messages-container");
		if (container) {
			const { clientHeight, scrollTop, scrollHeight } = container;
			const newMessage = container.children[container.children.length - 1];
			if (
				clientHeight + scrollTop + 2 * newMessage.clientHeight >=
				scrollHeight
			) {
				container.scrollTop = container.scrollHeight;
			}
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [data]);

	if (error) {
		console.log(error);
	}

	if (data?.getMessages) {
		return (
			<Card.Grid className="messages-container" hoverable={false}>
				{data.getMessages.map((message) => (
					<MessageItem key={message.id} message={message} />
				))}
			</Card.Grid>
		);
	}

	return <Loader />;
};
