import { Card, Typography } from "antd";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetChannelDetailsQuery } from "../../generated";
import { DrawerContext } from "../../utils/context";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { ChannelDescription } from "./ChannelDescription";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

const { Title, Text } = Typography;

export const ChatScreen = () => {
	const { toggleDrawer } = useContext(DrawerContext)!;

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
						onClick={() =>
							toggleDrawer({
								props: {
									title: channel.name,
									extra: <Text>{channel.description}</Text>,
									className: "channel-drawer"
								},
								component: <ChannelDescription channel={channel} />
							})
						}
					>
						<SwitchingIcon className="icon" name="info" />
					</span>
				}
				title={<Title level={3}>{channel.name}</Title>}
				className="message-screen"
			>
				<MessageList channelId={channelId!} />
				<Card.Grid className="message-input-container" hoverable={false}>
					<MessageInput channelId={channelId!} />
				</Card.Grid>
			</Card>
		);
	}

	return <Loader />;
};
