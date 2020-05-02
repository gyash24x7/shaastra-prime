import { Tag, Typography } from "antd";
import React from "react";
import { statusColor } from ".";
import { KanbanItem } from "./KanbanItem";

const { Title } = Typography;

export const KanbanLayout = (props: any) => {
	return (
		<div className="kanban-container">
			<div
				className="kanban-col"
				style={{
					border: "2px solid",
					borderColor: statusColor["NOT_ASSIGNED"]
				}}
			>
				<Tag color={statusColor["NOT_ASSIGNED"]}>
					<Title level={4}>IN PIPELINE</Title>
				</Tag>
				{props.data
					.filter(({ status }: any) =>
						["NOT_ASSIGNED", "ASSIGNED"].includes(status)
					)
					.map((task: any) => (
						<KanbanItem task={task} key={task.key} />
					))}
			</div>
			<div
				className="kanban-col"
				style={{ border: "2px solid", borderColor: statusColor["IN_PROGRESS"] }}
			>
				<Tag color={statusColor["IN_PROGRESS"]}>
					<Title level={4}>WORK IN PROGRESS</Title>
				</Tag>
				{props.data
					.filter(({ status }: any) => ["IN_PROGRESS"].includes(status))
					.map((task: any) => (
						<KanbanItem task={task} key={task.key} />
					))}
			</div>
			<div
				className="kanban-col"
				style={{ border: "2px solid", borderColor: statusColor["COMPLETED"] }}
			>
				<Tag color={statusColor["COMPLETED"]}>
					<Title level={4}>FINISHED</Title>
				</Tag>
				{props.data
					.filter(({ status }: any) =>
						["SUBMITTED", "COMPLETED"].includes(status)
					)
					.map((task: any) => (
						<KanbanItem task={task} key={task.key} />
					))}
			</div>
		</div>
	);
};
