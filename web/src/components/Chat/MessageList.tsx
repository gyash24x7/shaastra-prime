import { Empty, Spin } from "antd";
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
	const [fetchingEnabled, setFetchingEnabled] = useState(true);
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
				newMessage &&
				clientHeight + scrollTop + 2 * newMessage.clientHeight >= scrollHeight
			) {
				scroller.current.scrollTop = scroller.current.scrollHeight;
			}
		}
	};

	const handleScroll = () => {
		if (
			scroller.current &&
			scroller.current.scrollTop < 10 &&
			hasMore &&
			fetchingEnabled
		) {
			setFetchingEnabled(false);
			fetchMore({
				variables: { channelId, skip },
				updateQuery(prev, { fetchMoreResult }) {
					if (!fetchMoreResult) return prev;
					if (fetchMoreResult?.getMessages?.length! < 20) {
						setHasMore(false);
					}
					return {
						...prev,
						getMessages: [...prev.getMessages, ...fetchMoreResult.getMessages]
					};
				}
			}).then(() => {
				setFetchingEnabled(true);
				setSkip(skip + 20);
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
		<div className="messages-container" ref={scroller} onScroll={handleScroll}>
			{data?.getMessages.map((message) => (
				<MessageItem key={message.id} message={message} />
			))}
			{(loading || !fetchingEnabled) && (
				<div style={{ padding: 20, alignSelf: "center" }}>
					<Spin />
				</div>
			)}
			{!hasMore && (
				<div style={{ padding: 20, alignSelf: "center" }}>
					You've reached the top
				</div>
			)}
			{data?.getMessages.length === 0 && (
				<div className="grid-row">
					<Empty description="No Messages" />
				</div>
			)}
		</div>
	);
};
