import { DownOutlined } from "@ant-design/icons";
import { Card, Collapse, Drawer, Typography } from "antd";
import React from "react";

import { AvatarHeader } from "../shared/AvatarHeader";
import { MessageComponent } from "./Message";

export const ChannelDrawer = (props: any) => {
	return (
		<Drawer
			visible={props.visible}
			closable
			onClose={() => props.setVisible(false)}
		>
			<Collapse
				accordion
				defaultActiveKey="members"
				expandIcon={() => <DownOutlined className="icon" />}
			>
				<Collapse.Panel
					key="members"
					header={<Typography.Title level={4}>Members</Typography.Title>}
				>
					{[...Array(6)].map((_, i) => (
						<AvatarHeader key={i} />
					))}
				</Collapse.Panel>
				<Collapse.Panel
					key="pinned"
					header={
						<Typography.Title level={4}>Pinned Messages</Typography.Title>
					}
				>
					{[...Array(8)].map((_, i) => (
						<MessageComponent key={i} />
					))}
				</Collapse.Panel>
				<Collapse.Panel
					key="media"
					header={<Typography.Title level={4}>Media</Typography.Title>}
				>
					<div className="media-box-container">
						{[...Array(10)].map((_, i) => (
							<Card className="media-box" key={i}></Card>
						))}
					</div>
				</Collapse.Panel>
			</Collapse>
		</Drawer>
	);
};
