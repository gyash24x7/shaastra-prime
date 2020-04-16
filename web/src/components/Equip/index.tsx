import { Button, Typography } from "antd";
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
	const [view, setView] = useState("table");

	return (
		<PrivateLayout title="Equip">
			<div className="screen-wrapper">
				<Typography.Title level={3}>My Tasks</Typography.Title>
				<div className="equip-toggle-container">
					<Button
						type={view === "kanban" ? "primary" : "default"}
						onClick={() => setView("kanban")}
						className="equip-toggle"
					>
						<SwitchingIcon name="grid" />
					</Button>
					<Button
						type={view === "table" ? "primary" : "default"}
						onClick={() => setView("table")}
						className="equip-toggle"
					>
						<SwitchingIcon name="table" />
					</Button>
				</div>
				{view === "kanban" && <KanbanLayout data={datasource} />}
				{view === "table" && <TableLayout data={datasource} />}
			</div>
		</PrivateLayout>
	);
};
