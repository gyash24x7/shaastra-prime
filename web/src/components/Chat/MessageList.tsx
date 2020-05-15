import { Button, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
	GetMessagesDocument,
	useGetMessagesQuery,
	useNewMessageSubscription
} from "../../generated";
import { ShowError } from "../shared/ShowError";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
	channelId: string;
}

export const MessageList = ({ channelId }: MessageListProps) => {
	const [skip, setSkip] = useState(20);
	const [hasMore, setHasMore] = useState(true);
	const scroller = useRef<HTMLDivElement>(null);

	const { data, error, fetchMore, loading } = useGetMessagesQuery({
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
		if (scroller.current) {
			const { clientHeight, scrollTop, scrollHeight } = scroller.current;
			const newMessage =
				scroller.current.children[scroller.current.children.length - 1];
			if (
				clientHeight + scrollTop + 2 * newMessage.clientHeight >=
				scrollHeight
			) {
				scroller.current.scrollTop = scroller.current.scrollHeight;
			}
		}
	};

	const loadMoreMessages = () => {
		if (hasMore) {
			fetchMore({
				variables: { channelId, skip },
				updateQuery(prev, { fetchMoreResult }) {
					if (!fetchMoreResult) return prev;
					if (fetchMoreResult?.getMessages?.length! < 20) {
						setHasMore(false);
					}

					setSkip(skip + 20);
					return {
						...prev,
						getMessages: [...prev.getMessages, ...fetchMoreResult.getMessages]
					};
				}
			});
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [data]);

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	return (
		<div className="messages-container" ref={scroller}>
			{data?.getMessages.map((message) => (
				<MessageItem key={message.id} message={message} />
			))}
			<Button
				className="button"
				style={{ width: "fit-content", alignSelf: "center" }}
				onClick={loadMoreMessages}
				type="link"
			>
				{hasMore ? "Load More Messages" : "You've reached the top"}
			</Button>
			{loading && (
				<div style={{ padding: 20 }}>
					<Spin />
				</div>
			)}
		</div>
	);
};
