import { CalendarFilled } from "@ant-design/icons";
import { Card, Space, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { DrawerContext } from "../../utils/context";
import { CommonDrawerTitle } from "../shared/CommonDrawerTitle";
import { TaskDescription } from "./TaskDescription";

const { Title } = Typography;

export const KanbanItem = (props: any) => {
	const { setDrawerComponent, setDrawerProps } = useContext(DrawerContext)!;

	const handleItemClick = () => {
		setDrawerProps({
			title: (
				<CommonDrawerTitle
					title={props.task.brief}
					onClose={() => setDrawerComponent(undefined)}
				/>
			),
			className: "no-padding-drawer",
			width: "75vw"
		});
		setDrawerComponent!(<TaskDescription data={props.task} />);
	};

	return (
		<Card className="kanban-item" bordered={false} onClick={handleItemClick}>
			<Title level={4}>{props.task.brief}</Title>
			<Space>
				<Tag icon={<CalendarFilled />} color="lime">
					{props.task.createdAt.format("DD/MM/YYYY")}
				</Tag>
				<Tag color="red">{props.task.byDept}</Tag>
			</Space>
		</Card>
	);
};
