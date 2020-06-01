import { Empty, Tag, Typography } from "antd";
import React from "react";
import { statusColor } from ".";
import { Task } from "../../generated";
import { Loader } from "../shared/Loader";
import { KanbanItem } from "./KanbanItem";

const { Text } = Typography;

interface KanbanLayoutProps {
	data: Partial<Task>[];
	loading?: boolean;
}

export const KanbanLayout = (props: KanbanLayoutProps) => {
	const inPipelineData = props.data.filter(({ status }: any) =>
		["NOT_ASSIGNED", "ASSIGNED"].includes(status)
	);

	const inProgressData = props.data.filter(({ status }: any) =>
		["IN_PROGRESS"].includes(status)
	);

	const finishedData = props.data.filter(({ status }: any) =>
		["SUBMITTED", "COMPLETED"].includes(status)
	);

	if (props.loading) {
		return <Loader />;
	}

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
					<Text style={{ fontSize: 18 }}>IN PIPELINE</Text>
				</Tag>
				{inPipelineData.map((task) => (
					<KanbanItem task={task} key={task.id} />
				))}
				{inPipelineData.length === 0 && (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)}
			</div>
			<div
				className="kanban-col"
				style={{ border: "2px solid", borderColor: statusColor["IN_PROGRESS"] }}
			>
				<Tag color={statusColor["IN_PROGRESS"]}>
					<Text style={{ fontSize: 18 }}>WORK IN PROGRESS</Text>
				</Tag>
				{inProgressData.map((task) => (
					<KanbanItem task={task} key={task.id} />
				))}
				{inProgressData.length === 0 && (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)}
			</div>
			<div
				className="kanban-col"
				style={{ border: "2px solid", borderColor: statusColor["COMPLETED"] }}
			>
				<Tag color={statusColor["COMPLETED"]}>
					<Text style={{ fontSize: 18 }}>FINISHED</Text>
				</Tag>
				{finishedData.map((task) => (
					<KanbanItem task={task} key={task.id} />
				))}
				{finishedData.length === 0 && (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)}
			</div>
		</div>
	);
};
