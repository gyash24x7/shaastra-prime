import { Card, Collapse } from "antd";
import React from "react";
import { stringGen } from "../../utils/lorem";
import { UserCard } from "../shared/UserCard";
import { Message } from "./Message";

const defaultMessages = [...Array(8)].map(() => ({
	content: stringGen.generateSentences(4),
	by: stringGen.generateWords(2),
	createdAt: "12:30",
	likes: Math.round(Math.random() * 10)
}));

export const ChannelDescription = () => {
	return (
		<Collapse accordion defaultActiveKey="members">
			<Collapse.Panel key="members" header="Members">
				<div className="grid-row">
					{[...Array(6)].map((_, i) => (
						<div className="grid-col" key={i}>
							<UserCard />
						</div>
					))}
				</div>
			</Collapse.Panel>
			<Collapse.Panel key="pinned" header="Pinned Messages">
				{defaultMessages.map((message, i) => (
					<Message key={i} message={message} />
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
