import { ClockCircleFilled } from "@ant-design/icons";
import { Card, Collapse, List, Tag, Typography } from "antd";
import React from "react";
import { Channel } from "../../generated";
import { stringGen } from "../../utils/lorem";
import { UserCard } from "../shared/UserCard";
import { UserCardSmall } from "../shared/UserCardSmall";
import { MessageItem } from "./MessageItem";

const defaultMessages = [...Array(8)].map(() => ({
	content: stringGen.generateSentences(4),
	by: stringGen.generateWords(2),
	createdAt: "12:30",
	likes: Math.round(Math.random() * 10)
}));

interface ChannelDescriptionProps {
	channel: Partial<Channel>;
}

const { Text, Paragraph } = Typography;

export const ChannelDescription = ({ channel }: ChannelDescriptionProps) => {
	return (
		<Collapse accordion defaultActiveKey="description">
			<Collapse.Panel key="description" header="Description">
				<List
					itemLayout="horizontal"
					dataSource={[
						{
							label: "Created By",
							value: (
								<UserCardSmall
									user={channel.createdBy}
									onlyName
									noNamePadding
								/>
							)
						},
						{
							label: "Created On",
							value: (
								<Tag color="lime" icon={<ClockCircleFilled />}>
									4th May, 2020, 12:45 AM
								</Tag>
							)
						}
					]}
					renderItem={(item) => (
						<List.Item>
							<Text strong>{item.label}</Text>
							<Paragraph>{item.value}</Paragraph>
						</List.Item>
					)}
				/>
			</Collapse.Panel>
			<Collapse.Panel key="members" header="Members">
				<div className="grid-row">
					{channel.members!.map((member) => (
						<div className="grid-col" key={member.id}>
							<UserCard user={member} />
						</div>
					))}
				</div>
			</Collapse.Panel>
			<Collapse.Panel key="pinned" header="Pinned Messages">
				{defaultMessages.map((message, i) => (
					<MessageItem key={i} message={message} />
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
