import { Tag, Typography } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { Moment } from "moment";
import React, { useState } from "react";

import { departments, status, statusColor } from ".";
import { AvatarHeader } from "../shared/AvatarHeader";
import { TaskDescription } from "./TaskDescription";

export const TableLayout = (props: any) => {
	const [filters, setFilters] = useState<any>(null);
	const [sorters, setSorters] = useState<any>(null);

	const columns: Record<string, ColumnProps<any>> = {
		brief: {
			key: "brief",
			title: <Typography.Text strong>Brief</Typography.Text>,
			dataIndex: "brief",
			width: 200
		},
		status: {
			key: "status",
			title: <Typography.Text strong>Status</Typography.Text>,
			dataIndex: "status",
			render: (val: string) => <Tag color={statusColor[val]}>{val}</Tag>,
			filters: status.map((status) => ({ text: status, value: status })),
			onFilter: (value, record) => record.status === value,
			filteredValue: filters?.status || null,
			width: 200
		},
		byDept: {
			key: "byDept",
			title: <Typography.Text strong>By&nbsp;Department</Typography.Text>,
			dataIndex: "byDept",
			filters: departments.map((dept) => ({ text: dept, value: dept })),
			onFilter: (value, record) => record.byDept === value,
			filteredValue: filters?.byDept || null,
			sorter: (a, b) => a.byDept.localeCompare(b.byDept),
			sortOrder: sorters?.columnKey === "byDept" && sorters?.order,
			width: 250
		},
		createdAt: {
			key: "createdAt",
			title: <Typography.Text strong>Created&nbsp;At</Typography.Text>,
			dataIndex: "createdAt",
			render: (val: Moment) => val.format("DD MMMM"),
			sorter: (a, b) => a.createdAt.diff(b.createdAt),
			sortOrder: sorters?.columnKey === "createdAt" && sorters?.order,
			width: 150
		},
		assignedTo: {
			key: "assignedTo",
			title: <Typography.Text strong>Assigned&nbsp;To</Typography.Text>,
			dataIndex: "assignedTo",
			render: (val: string[]) => (
				<div className="grid-row">
					{val.map((_, i) => (
						<AvatarHeader key={i} />
					))}
				</div>
			),
			colSpan: 2
		}
	};

	const handleOnChange = (_: any, filters: any, sorter: any) => {
		setFilters(filters);
		setSorters(sorter);
	};

	const expandableConfig = {
		expandedRowRender: (val: any) => <TaskDescription data={val} />,
		expandRowByClick: true
	};

	return (
		<Table
			dataSource={props.data}
			tableLayout="auto"
			columns={Object.keys(columns).map((str) => columns[str])}
			bordered
			onChange={handleOnChange}
			expandable={expandableConfig}
			pagination={false}
		/>
	);
};
