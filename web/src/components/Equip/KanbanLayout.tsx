import { CalendarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { status, statusColor } from ".";
import { DrawerContext } from "../../utils/context";
import { TaskDescription } from "./TaskDescription";

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

export const KanbanItem = (props: any) => {
	const { setDrawerComponent } = useContext(DrawerContext);

	return (
		<Card
			className="kanban-item"
			bordered={false}
			onClick={() => setDrawerComponent!(<TaskDescription data={props.task} />)}
		>
			<Title level={4}>{props.task.brief}</Title>
			<Tag icon={<CalendarFilled />}>
				{props.task.createdAt.format("DD/MM/YYYY")}
			</Tag>
			<Tag color="red">{props.task.byDept}</Tag>
		</Card>
	);
};
