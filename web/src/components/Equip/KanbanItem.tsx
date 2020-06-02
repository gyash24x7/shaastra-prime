import { CalendarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { statusColor } from ".";
import { Task } from "../../generated";
import { DrawerContext } from "../../utils/context";
import { TaskDescription } from "./TaskDescription";

const { Title } = Typography;

interface KanbanItemProps {
	task: Partial<Task>;
}

export const KanbanItem = ({ task }: KanbanItemProps) => {
	const { toggleDrawer } = useContext(DrawerContext)!;

	const handleItemClick = () => {
		toggleDrawer({
			props: {
				title: task.brief,
				className: "no-padding-drawer",
				width: "60vw"
			},
			component: <TaskDescription taskId={task.id!} />
		});
	};

	return (
		<Card className="kanban-item" bordered={false} onClick={handleItemClick}>
			<Title level={4}>{task.brief}</Title>
			<div className="wrap-row">
				<Tag icon={<CalendarFilled />} color="lime">
					{moment(parseInt(task.createdAt!)).format("DD/MM/YYYY")}
				</Tag>
				<Tag color="red">{task.byDept?.name}</Tag>
				<Tag color={statusColor[task.status!]}>{task.status}</Tag>
			</div>
		</Card>
	);
};
