import { Card, Typography } from "antd";
import React from "react";
import { DrawerContext } from "../../utils/context";
import { PrivateLayout } from "../shared/PrivateLayout";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { ChannelDescription } from "./ChannelDescription";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";

const { Title } = Typography;

export const ChatScreen = () => {
	return (
		<PrivateLayout>
			<DrawerContext.Consumer>
				{(props) => (
					<Card
						extra={
							<span
								onClick={() => {
									props!.setDrawerProps!({
										title: <Title level={4}>House Of Lords</Title>,
										className: "channel-drawer"
									});
									props!.setDrawerComponent(<ChannelDescription />);
								}}
							>
								<SwitchingIcon className="icon" name="info" />
							</span>
						}
						title={<Title level={3}>House Of Lords</Title>}
						className="message-screen"
					>
						<Card.Grid className="messages-container" hoverable={false}>
							{[...Array(20)].map((_, i) => (
								<Message key={i} />
							))}
						</Card.Grid>
						<Card.Grid className="message-input-container" hoverable={false}>
							<MessageInput />
						</Card.Grid>
					</Card>
				)}
			</DrawerContext.Consumer>
		</PrivateLayout>
	);
};
