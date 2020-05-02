import { Tag, Typography } from "antd";
import React from "react";
import { status, statusColor } from ".";
import { KanbanItem } from "./KanbanItem";

const { Title } = Typography;

export const KanbanLayout = (props: any) => {
	return (
		<div className="kanban-container">
			{status.map((status) => (
				<div
					className="kanban-col"
					style={{ border: "2px solid", borderColor: statusColor[status] }}
					key={status}
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
