import { MenuOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Mentions, Typography } from "antd";
import React, { useState } from "react";
import { PrivateLayout } from "../shared/PrivateLayout";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { ChannelDrawer } from "./ChannelDrawer";
import { MessageComponent } from "./Message";

const { Option } = Mentions;
const { Title } = Typography;

export const ChatScreen = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);

	return (
		<PrivateLayout>
			<div className="grid-row">
				<Card
					className="title-card"
					extra={
						<MenuOutlined
							className="icon"
							onClick={() => setDrawerVisible(true)}
						/>
					}
				>
					<Title level={3}>House Of Lords</Title>
				</Card>
			</div>
			<Card className="messages-container">
				{[...Array(20)].map((_, i) => {
					let rand = Math.round(Math.random());
					return <MessageComponent isYour={!!rand} key={i} />;
				})}
			</Card>
			<div className="message-input-box">
				<div className="message-input">
					<Mentions
						autoFocus
						placement="top"
						onChange={() => {}}
						onSelect={() => {}}
						rows={3}
					>
						<Option value="afc163">afc163</Option>
						<Option value="zombieJ">zombieJ</Option>
						<Option value="yesmeck">yesmeck</Option>
					</Mentions>
				</div>
				<Button className="file-upload-btn button default">
					<UploadOutlined className="icon" />
				</Button>
				<Button className="send-btn button" type="primary">
					<SwitchingIcon name="send" />
				</Button>
			</div>
			<ChannelDrawer visible={drawerVisible} setVisible={setDrawerVisible} />
		</PrivateLayout>
	);
};
