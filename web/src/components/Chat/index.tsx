import { Card, Typography } from "antd";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetChannelDetailsQuery } from "../../generated";
import { DrawerContext } from "../../utils/context";
import { stringGen } from "../../utils/lorem";
import { CommonDrawerTitle } from "../shared/CommonDrawerTitle";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";
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
	const { setDrawerComponent, setDrawerProps } = useContext(DrawerContext)!;

	const { channelId } = useParams();

	const { data, error } = useGetChannelDetailsQuery({
		variables: { channelId: channelId || "" }
	});

	// const scrollToBottom = () => {
	// 	const container = document.querySelector(".messages-container");
	// 	if (container) {
	// 		const { clientHeight, scrollTop, scrollHeight } = container;
	// 		const newMessage = container.children[container.children.length - 1];
	// 		if (
	// 			clientHeight + scrollTop + 2 * newMessage.clientHeight >=
	// 			scrollHeight
	// 		) {
	// 			container.scrollTop = container.scrollHeight;
	// 		}
	// 	}
	// };

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	if (data?.getChannelDetails) {
		let channel = data.getChannelDetails;
		return (
			<Card
				extra={
					<span
						onClick={() => {
							setDrawerProps({
								title: (
									<CommonDrawerTitle
										title={channel.name}
										onClose={() => setDrawerComponent(undefined)}
									/>
								),
								className: "channel-drawer"
							});
							setDrawerComponent(<ChannelDescription channel={channel} />);
						}}
					>
						<SwitchingIcon className="icon" name="info" />
					</span>
				}
				title={<Title level={3}>{channel.name}</Title>}
				className="message-screen"
			>
				<Card.Grid className="messages-container" hoverable={false}>
					{defaultMessages.map((message) => (
						<Message key={message.by} message={message} />
					))}
				</Card.Grid>
				<Card.Grid className="message-input-container" hoverable={false}>
					<MessageInput />
				</Card.Grid>
			</Card>
		);
	}

	return <Loader />;
};
