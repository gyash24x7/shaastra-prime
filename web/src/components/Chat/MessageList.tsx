import { Empty, Spin } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
	GetMessagesDocument,
	Message,
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

	const getGroupedMsgs = (messages: Partial<Message>[]) => {
		let dates = new Set<string>(
			messages.map((msg) =>
				moment(parseInt(msg.createdAt!)).format("DD/MM/YYYY")
			)
		);
		let dateWiseMsgs: Record<string, Partial<Message>[]> = {};

		Array.from(dates).forEach((date) => {
			dateWiseMsgs[date] = messages.filter(
				(msg) => moment(parseInt(msg.createdAt!)).format("DD/MM/YYYY") === date
			);
		});

		return dateWiseMsgs;
	};

	useEffect(() => {
		scrollToBottom();
	}, [data]);

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	let groupedMsgs = getGroupedMsgs(data?.getMessages || []);

	return (
		<div className="messages-container" ref={scroller} onScroll={handleScroll}>
			{Object.keys(groupedMsgs).map((date) => (
				<Fragment key={date}>
					{groupedMsgs[date].map((msg) => (
						<MessageItem message={msg} key={msg.id} />
					))}
					<div className="message-date">
						{moment(date, "DD/MM/YYYY").format("dddd, Do MMMM")}
					</div>
				</Fragment>
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
