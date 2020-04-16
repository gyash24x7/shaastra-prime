import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import React from "react";

import { status, statusColor } from ".";

export const KanbanLayout = (props: any) => {
	return (
		<div className="kanban-container">
			{status.map((status) => (
				<Card
					className="kanban-col"
					title={
						<Tag color={statusColor[status]}>
							<Typography.Text strong>{status}</Typography.Text>
						</Tag>
					}
				>
					{props.data
						.filter((data: any) => data.status === status)
						.map((task: any) => (
							<KanbanItem task={task} key={task.key} />
						))}
				</Card>
			))}
		</div>
	);
};

const KanbanItem = (props: any) => {
	return (
		<Card
			className="kanban-item"
			actions={[
				<SettingOutlined key="setting" />,
				<EditOutlined key="edit" />,
				<EllipsisOutlined key="ellipsis" />
			]}
		>
			{props.task.brief}
		</Card>
	);
};
