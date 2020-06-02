import { Button, Popconfirm, Typography } from "antd";
import React from "react";
import { TaskOperationProps } from ".";
import { refetchGetTaskQuery, useSubmitTaskMutation } from "../../generated";
import { ShowError } from "../shared/ShowError";

const { Text } = Typography;

export const SubmitTask = ({ taskId }: TaskOperationProps) => {
	const [submitTask, { loading, error }] = useSubmitTaskMutation({
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
			onConfirm={() => submitTask()}
			title={<Text strong>Are you sure?</Text>}
			okText="Yes"
			cancelText="No"
			okButtonProps={{ className: "button" }}
			cancelButtonProps={{ className: "button" }}
		>
			<Button className="button" loading={loading}>
				Submit Task
			</Button>
		</Popconfirm>
	);
};
