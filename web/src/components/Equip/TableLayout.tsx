import { Space, Tag, Typography } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import moment from "moment";
import React, { useContext, useState } from "react";
import { departments, status, statusColor } from ".";
import { DrawerContext, UserContext } from "../../utils/context";
import { UserCardSmall } from "../shared/UserCardSmall";
import { TaskDescription } from "./TaskDescription";

export const TableLayout = (props: any) => {
	const [filters, setFilters] = useState<any>(null);
	const [sorters, setSorters] = useState<any>(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

	const { user } = useContext(UserContext);

	const columns: Record<string, ColumnProps<any>> = {
		brief: {
			key: "brief",
			title: <Typography.Text strong>Brief</Typography.Text>,
			dataIndex: "brief"
		},
		status: {
			key: "status",
			title: <Typography.Text strong>Status</Typography.Text>,
			dataIndex: "status",
			render: (val: string) => <Tag color={statusColor[val]}>{val}</Tag>,
			filters: status.map((status) => ({ text: status, value: status })),
			onFilter: (value, record) => record.status === value,
			filteredValue: filters?.status || null
		},
		byDept: {
			key: "byDept",
			title: <Typography.Text strong>By&nbsp;Department</Typography.Text>,
			dataIndex: "byDept",
			render: (val: any) => <Tag color="red">{val.name}</Tag>,
			filters: departments.map((dept) => ({ text: dept, value: dept })),
			onFilter: (value, record) => record.byDept.name === value,
			filteredValue: filters?.byDept || null,
			sorter: (a, b) => a.byDept.name.localeCompare(b.byDept.name),
			sortOrder: sorters?.columnKey === "byDept" && sorters?.order
		},
		createdAt: {
			key: "createdAt",
			title: <Typography.Text strong>Created&nbsp;At</Typography.Text>,
			dataIndex: "createdAt",
			render: (val: string) => (
				<Tag color="lime">{moment(parseInt(val)).format("DD MMMM")}</Tag>
			),
			sorter: (a, b) => a.createdAt.diff(b.createdAt),
			sortOrder: sorters?.columnKey === "createdAt" && sorters?.order
		},
		deadline: {
			key: "deadline",
			title: <Typography.Text strong>Deadline</Typography.Text>,
			dataIndex: "deadline",
			render: (val: string) => (
				<Tag color="lime">{moment(parseInt(val)).format("DD MMMM")}</Tag>
			),
			sorter: (a, b) => a.deadline.diff(b.deadline),
			sortOrder: sorters?.columnKey === "createdAt" && sorters?.order
		},
		assignedTo: {
			key: "assignedTo",
			title: <Typography.Text strong>Assigned&nbsp;To</Typography.Text>,
			dataIndex: "assignedTo",
			render: (val: string[]) => (
				<Space size="large">
					{val.map((_, i) => (
						<UserCardSmall key={i} onlyName user={user} />
					))}
				</Space>
			)
		}
	};

	const handleOnChange = (_: any, filters: any, sorter: any) => {
		setFilters(filters);
		setSorters(sorter);
	};

	const { toggleDrawer } = useContext(DrawerContext)!;

	return (
		<Table
			dataSource={props.data.map((data: any) => ({ ...data, key: data.id }))}
			tableLayout="auto"
			columns={Object.keys(columns).map((str) => columns[str])}
			bordered
			loading={props.loading}
			onChange={handleOnChange}
			pagination={false}
			size="middle"
			rowSelection={{
				type: "radio",
				selectedRowKeys,
				onSelect(record) {
					toggleDrawer({
						props: {
							title: record.brief,
							width: "60vw",
							className: "no-padding-drawer",
							onClose() {
								setSelectedRowKeys([record.key]);
							}
						},
						component: <TaskDescription taskId={record.id} />
					});
				}
			}}
		/>
	);
};
