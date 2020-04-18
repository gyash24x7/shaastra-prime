import { CalendarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import React from "react";

import { status, statusColor } from ".";

const { Title } = Typography;

export const KanbanLayout = (props: any) => {
	return (
		<div className="kanban-container">
			{status.map((status) => (
				<div
					className="kanban-col"
					style={{ border: "2px solid", borderColor: statusColor[status] }}
				>
					<Tag color={statusColor[status]}>
						<Title level={4}>{status}</Title>
					</Tag>
					{props.data
						.filter((data: any) => data.status === status)
						.map((task: any) => (
							<KanbanItem task={task} key={task.key} />
						))}
				</div>
			))}
		</div>
	);
};

export const KanbanItem = (props: any) => {
	return (
		<Card className="kanban-item" bordered={false}>
			<Title level={4}>{props.task.brief}</Title>
			<Tag icon={<CalendarFilled />}>
				{props.task.createdAt.format("DD/MM/YYYY")}
			</Tag>
			<Tag color="red">{props.task.byDept}</Tag>
		</Card>
	);
};
