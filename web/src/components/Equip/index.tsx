import "./styles.scss";

import { Card, Pagination, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";

import { stringGen } from "../../utils/lorem";
import { PrivateLayout } from "../shared/PrivateLayout";
import { SwitchingIcon } from "../shared/SwitchingIcon";
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

export const datasource = [...Array(25)].map((_, i) => ({
	key: i.toString(),
	brief: stringGen.generateWords(5),
	details: stringGen.generateSentences(3),
	status: status[Math.floor(5 * Math.random())],
	byDept: departments[Math.floor(10 * Math.random())],
	createdAt: moment().add(Math.round(7 * Math.random()), "days"),
	assignedTo: [stringGen.generateWords(2), stringGen.generateWords(2)]
}));

export const EquipScreen = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [activeKey, setActiveKey] = useState("table");

	const tablist = [
		{
			key: "table",
			tab: (
				<div className="equip-view-tab">
					<SwitchingIcon name="table" />
					<Typography.Text strong>Table View</Typography.Text>
				</div>
			)
		},
		{
			key: "kanban",
			tab: (
				<div className="equip-view-tab">
					<SwitchingIcon name="kanban" />
					<Typography.Text strong>Kanban View</Typography.Text>
				</div>
			)
		}
	];

	const tabContent: Record<string, JSX.Element> = {
		table: (
			<TableLayout
				data={datasource.slice(currentPage * 10 - 10, currentPage * 10)}
				page={currentPage}
			/>
		),
		kanban: <KanbanLayout data={datasource} />
	};

	return (
		<PrivateLayout title="Equip">
			<div className="screen-wrapper">
				<Card
					title={<Title level={3}>My Tasks</Title>}
					tabList={tablist}
					activeTabKey={activeKey}
					onTabChange={setActiveKey}
					tabBarExtraContent={
						activeKey === "table" ? (
							<Pagination
								total={datasource.length}
								current={currentPage}
								onChange={setCurrentPage}
							/>
						) : (
							<div />
						)
					}
				>
					{tabContent[activeKey]}
				</Card>
			</div>
		</PrivateLayout>
	);
};
