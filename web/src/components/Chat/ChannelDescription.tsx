import { ClockCircleFilled } from "@ant-design/icons";
import { Card, Collapse, Empty, List, Tag, Typography } from "antd";
import React from "react";
import { Channel } from "../../generated";
import { RecursivePartial } from "../../generated/types";
import { UserCardSmall } from "../shared/UserCardSmall";
import { MessageItem } from "./MessageItem";

interface ChannelDescriptionProps {
	channel: RecursivePartial<Channel>;
}

const { Text, Paragraph } = Typography;

export const ChannelDescription = ({ channel }: ChannelDescriptionProps) => {
	return (
		<Collapse accordion defaultActiveKey="description">
			<Collapse.Panel
				key="description"
				header="Description"
				className="channel-description-panel"
			>
				<List
					itemLayout="horizontal"
					dataSource={[
						{
							label: "Created By",
							value: (
								<UserCardSmall
									user={channel.createdBy!}
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
						<div className="grid-col" key={member!.id}>
							<UserCardSmall user={member!} />
						</div>
					))}
				</div>
			</Collapse.Panel>
			<Collapse.Panel key="starred" header="Starred Messages">
				{channel.starredMsgs?.map((message, i) => (
					<MessageItem key={i} message={message!} />
				))}
				{!channel.starredMsgs?.length && (
					<div className="grid-row">
						<Empty description="No Messages" />
					</div>
				)}
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
