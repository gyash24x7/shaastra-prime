import { Button, Popconfirm, Typography } from "antd";
import React, { useContext } from "react";
import { TaskOperationProps } from ".";
import { refetchGetTasksQuery, useDeleteTaskMutation } from "../../generated";
import { DrawerContext } from "../../utils/context";
import { ShowError } from "../shared/ShowError";

const { Text } = Typography;

export const DeleteTask = ({ taskId }: TaskOperationProps) => {
	const [deleteTask, { loading, error }] = useDeleteTaskMutation({
		variables: { taskId },
		refetchQueries: [refetchGetTasksQuery()]
	});

	const { toggleDrawer } = useContext(DrawerContext)!;

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	return (
		<Popconfirm
			placement="top"
			onConfirm={() => deleteTask().then(() => toggleDrawer())}
			title={<Text strong>Are you sure?</Text>}
			okText="Yes"
			cancelText="No"
			okButtonProps={{ className: "button" }}
			cancelButtonProps={{ className: "button" }}
		>
			<Button className="button" loading={loading} danger>
				Delete Task
			</Button>
		</Popconfirm>
	);
};
