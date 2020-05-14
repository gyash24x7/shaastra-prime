import { Card } from "antd";
import React from "react";
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
					getMessages: data?.getMessages.concat(
						subscriptionData.data!.newMessage
					)
				}
			});
		},
		variables: { channelId }
	});

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
