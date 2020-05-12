import { CalendarFilled } from "@ant-design/icons";
import { Card, Space, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { statusColor } from ".";
import { DrawerContext } from "../../utils/context";
import { TaskDescription } from "./TaskDescription";

const { Title } = Typography;

export const KanbanItem = (props: any) => {
	const { toggleDrawer } = useContext(DrawerContext)!;

	const handleItemClick = () => {
		toggleDrawer({
			props: {
				title: props.task.brief,
				className: "no-padding-drawer",
				width: "75vw"
			},
			component: <TaskDescription data={props.task} />
		});
	};

	return (
		<Card className="kanban-item" bordered={false} onClick={handleItemClick}>
			<Title level={4}>{props.task.brief}</Title>
			<Space>
				<Tag icon={<CalendarFilled />} color="lime">
					{props.task.createdAt.format("DD/MM/YYYY")}
				</Tag>
				<Tag color="red">{props.task.byDept}</Tag>
				<Tag color={statusColor[props.task.status]}>{props.task.status}</Tag>
			</Space>
		</Card>
	);
};
