import { Button, Descriptions, Tag, Typography } from "antd";
import React from "react";
import { statusColor } from ".";
import { AvatarHeader } from "../shared/AvatarHeader";

const { Text, Title } = Typography;

export const TaskDescription = ({ data }: any) => {
	return (
		<Descriptions
			title={<Title level={3}>{data.brief}</Title>}
			column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
			bordered
			size="middle"
			layout="vertical"
		>
			<Descriptions.Item label={<strong>Details</strong>} span={3}>
				<Text strong>{data.details}</Text>
			</Descriptions.Item>
			<Descriptions.Item label={<strong>By&nbsp;Department</strong>}>
				<Text strong>{data.byDept}</Text>
			</Descriptions.Item>

			<Descriptions.Item label={<strong>Deadline</strong>}>
				{data.createdAt.format("DD MMMM")}
			</Descriptions.Item>
			<Descriptions.Item label={<strong>Created&nbsp;On</strong>}>
				{data.createdAt.format("DD MMMM")}
			</Descriptions.Item>
			<Descriptions.Item label={<strong>Assigned To</strong>} span={2}>
				<div className="grid-row">
					{data.assignedTo.map((_: any, i: number) => (
						<AvatarHeader key={i} />
					))}
				</div>
			</Descriptions.Item>
			<Descriptions.Item label={<strong>Created&nbsp;By</strong>}>
				<AvatarHeader />
			</Descriptions.Item>
			<Descriptions.Item label={<strong>Status</strong>}>
				<Tag color={statusColor[data.status]}>{data.status}</Tag>
			</Descriptions.Item>
			<Descriptions.Item label={<strong>Actions</strong>}>
				<Button className="action-btn button">Assign Task</Button>
				<Button className="action-btn button">Submit Task</Button>
				<Button className="action-btn button" type="primary">
					Mark As Completed
				</Button>
				<Button className="action-btn button" type="danger">
					Delete Task
				</Button>
				<Button className="action-btn button default">View Conversation</Button>
			</Descriptions.Item>
		</Descriptions>
	);
};
