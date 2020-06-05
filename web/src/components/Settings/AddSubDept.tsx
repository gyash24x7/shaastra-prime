import { Button, Card, Input, message, Space, Typography } from "antd";
import React, { useState } from "react";
import {
	refetchGetDepartmentsQuery,
	refetchMeQuery,
	useAddSubDeptMutation
} from "../../generated";
import { VerticalSpace } from "../shared/VerticalSpace";

const { Title } = Typography;

export const AddSubDept = () => {
	const [subDept, setSubDept] = useState("");
	const [addSubDept, { loading, error }] = useAddSubDeptMutation({
		refetchQueries: [refetchMeQuery(), refetchGetDepartmentsQuery()],
		onCompleted: () => {
			setSubDept("");
			message.success("Sub Department Added Successfully!");
		}
	});

	if (error) {
		console.log(error);
		message.error("Some Error Occurred!");
	}

	return (
		<Card title={<Title level={3}>Add Sub Department</Title>}>
			<Input
				value={subDept}
				onChange={(e) => setSubDept(e.target.value)}
				size="large"
				placeholder="Sub Department"
			/>
			<VerticalSpace size="large" />
			<Space size="large">
				<Button
					type="primary"
					className="button"
					loading={loading}
					disabled={!subDept}
					onClick={() => addSubDept({ variables: { subDept } })}
				>
					Add Sub Department
				</Button>
				<Button className="button" danger onClick={() => setSubDept("")}>
					Cancel
				</Button>
			</Space>
		</Card>
	);
};
