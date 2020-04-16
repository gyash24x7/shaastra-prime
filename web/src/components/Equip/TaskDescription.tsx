import { Button, Descriptions, Tag, Typography } from "antd";
import React from "react";

import { statusColor } from ".";
import { AvatarHeader } from "../shared/AvatarHeader";

export const TaskDescription = ({ data }: any) => {
	return (
		<Descriptions
			title={<Typography.Title level={3}>{data.brief}</Typography.Title>}
			column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
			bordered
			layout="vertical"
		>
			<Descriptions.Item
				label={<Typography.Title level={4}>Details</Typography.Title>}
				span={3}
			>
				<Typography.Text strong>{data.details}</Typography.Text>
			</Descriptions.Item>
			<Descriptions.Item
				label={
					<Typography.Title level={4}>By&nbsp;Department</Typography.Title>
				}
			>
				<Typography.Text strong>{data.byDept}</Typography.Text>
			</Descriptions.Item>

			<Descriptions.Item
				label={<Typography.Title level={4}>Deadline</Typography.Title>}
			>
				{data.createdAt.format("DD MMMM")}
			</Descriptions.Item>
			<Descriptions.Item
				label={<Typography.Title level={4}>Created&nbsp;On</Typography.Title>}
			>
				{data.createdAt.format("DD MMMM")}
			</Descriptions.Item>
			<Descriptions.Item
				label={<Typography.Title level={4}>Assigned To</Typography.Title>}
				span={2}
			>
				<div className="grid-row">
					{data.assignedTo.map((_: any, i: number) => (
						<AvatarHeader key={i} />
					))}
				</div>
			</Descriptions.Item>
			<Descriptions.Item
				label={<Typography.Title level={4}>Created&nbsp;By</Typography.Title>}
			>
				<AvatarHeader />
			</Descriptions.Item>
			<Descriptions.Item
				label={<Typography.Title level={4}>Status</Typography.Title>}
			>
				<Tag color={statusColor[data.status]}>{data.status}</Tag>
			</Descriptions.Item>
			<Descriptions.Item
				label={<Typography.Title level={4}>Actions</Typography.Title>}
			>
				<div className="grid-row">
					<Button className="action-btn button default">Assign Task</Button>
					<Button className="action-btn button warning">Submit Task</Button>
					<Button className="action-btn button primary">
						Mark As Completed
					</Button>
					<Button className="action-btn button danger">Delete Task</Button>
					<Button className="action-btn button default">
						View Conversation
					</Button>
				</div>
			</Descriptions.Item>
		</Descriptions>
	);
};
