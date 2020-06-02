import { Button, Popconfirm, Typography } from "antd";
import React from "react";
import { TaskOperationProps } from ".";
import { refetchGetTaskQuery, useCompleteTaskMutation } from "../../generated";
import { ShowError } from "../shared/ShowError";

const { Text } = Typography;

export const CompleteTask = ({ taskId }: TaskOperationProps) => {
	const [completeTask, { loading, error }] = useCompleteTaskMutation({
		variables: { taskId },
		refetchQueries: [refetchGetTaskQuery({ taskId })],
		awaitRefetchQueries: true
	});

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	return (
		<Popconfirm
			placement="top"
			onConfirm={() => completeTask()}
			title={<Text strong>Are you sure?</Text>}
			okText="Yes"
			cancelText="No"
			okButtonProps={{ className: "button" }}
			cancelButtonProps={{ className: "button" }}
		>
			<Button className="button" loading={loading} type="primary">
				Complete Task
			</Button>
		</Popconfirm>
	);
};
