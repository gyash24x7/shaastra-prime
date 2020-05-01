import { Card, Collapse } from "antd";
import React from "react";
import { AvatarHeader } from "../shared/AvatarHeader";
import { Message } from "./Message";

export const ChannelDescription = () => {
	return (
		<Collapse accordion defaultActiveKey="members">
			<Collapse.Panel key="members" header="Members">
				{[...Array(6)].map((_, i) => (
					<AvatarHeader key={i} />
				))}
			</Collapse.Panel>
			<Collapse.Panel key="pinned" header="Pinned Messages">
				{[...Array(8)].map((_, i) => (
					<Message key={i} />
				))}
			</Collapse.Panel>
			<Collapse.Panel key="media" header="Media">
				<div className="media-box-container">
					{[...Array(10)].map((_, i) => (
						<Card className="media-box" key={i}></Card>
					))}
				</div>
			</Collapse.Panel>
		</Collapse>
	);
};
