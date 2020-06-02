import { Card, Typography } from "antd";
import React, { useState } from "react";
import { useGetTasksQuery } from "../../generated";
import { ShowError } from "../shared/ShowError";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { GridLayout } from "./GridLayout";
import { KanbanLayout } from "./KanbanLayout";
import { TableLayout } from "./TableLayout";

export const departments = [
	"WEBOPS",
	"SPONS",
	"O&IP",
	"EVOLVE",
	"EVENTS",
	"C&D",
	"FINANCE",
	"ENVISAGE",
	"QMS",
	"SHOWS"
];

export const status = [
	"NOT_ASSIGNED",
	"ASSIGNED",
	"IN_PROGRESS",
	"SUBMITTED",
	"COMPLETED"
];

export const statusColor: Record<string, string> = {
	NOT_ASSIGNED: "#de350b",
	ASSIGNED: "#172b4d",
	IN_PROGRESS: "#0747a6",
	SUBMITTED: "#FFAB00",
	COMPLETED: "#00875A"
};

const { Title } = Typography;

export const EquipScreen = () => {
	const [activeKey, setActiveKey] = useState("table");
	const { data, loading, error } = useGetTasksQuery();

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	const tablist = [
		{
			key: "table",
			tab: (
				<div className="tab-title">
					<SwitchingIcon name="table" />
					<Typography.Text strong>Table View</Typography.Text>
				</div>
			)
		},
		{
			key: "kanban",
			tab: (
				<div className="tab-title">
					<SwitchingIcon name="kanban" />
					<Typography.Text strong>Kanban View</Typography.Text>
				</div>
			)
		},
		{
			key: "grid",
			tab: (
				<div className="tab-title">
					<SwitchingIcon name="grid" />
					<Typography.Text strong>Grid View</Typography.Text>
				</div>
			)
		}
	];

	const tabContent: Record<string, JSX.Element> = {
		table: <TableLayout data={data?.getTasks || []} loading={loading} />,
		kanban: <KanbanLayout data={data?.getTasks || []} loading={loading} />,
		grid: <GridLayout data={data?.getTasks || []} loading={loading} />
	};

	return (
		<Card
			title={<Title level={3}>My Tasks</Title>}
			tabList={tablist}
			activeTabKey={activeKey}
			onTabChange={setActiveKey}
			tabBarExtraContent={<div />}
			className="equip-card card-with-tabs"
		>
			{tabContent[activeKey]}
		</Card>
	);
};

export interface TaskOperationProps {
	taskId: string;
}
