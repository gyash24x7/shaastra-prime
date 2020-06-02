import { Button, Popconfirm, Typography } from "antd";
import React from "react";
import { TaskOperationProps } from ".";
import { refetchGetTaskQuery, useAcceptTaskMutation } from "../../generated";
import { ShowError } from "../shared/ShowError";

const { Text } = Typography;

export const AcceptTask = ({ taskId }: TaskOperationProps) => {
	const [acceptTask, { loading, error }] = useAcceptTaskMutation({
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
			onConfirm={() => acceptTask()}
			title={<Text strong>Are you sure?</Text>}
			okText="Yes"
			cancelText="No"
			okButtonProps={{ className: "button" }}
			cancelButtonProps={{ className: "button" }}
		>
			<Button className="button" loading={loading}>
				Accept Task
			</Button>
		</Popconfirm>
	);
};
