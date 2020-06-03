import { ThunderboltFilled } from "@ant-design/icons";
import { Button, Form, Result, Select } from "antd";
import React, { useContext } from "react";
import { TaskOperationProps } from ".";
import {
	refetchGetTaskQuery,
	useAssignTaskMutation,
	useGetDeptmembersQuery
} from "../../generated";
import { UserContext } from "../../utils/context";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";

const { Option } = Select;
const { useForm, Item } = Form;

export const AssignTask = ({ taskId }: TaskOperationProps) => {
	const { user } = useContext(UserContext);
	const {
		data: memberData,
		error: memberError,
		loading: memberLoading
	} = useGetDeptmembersQuery({
		variables: { deptId: user!.department!.id! }
	});

	const [assignTask, { data, loading, error }] = useAssignTaskMutation({
		refetchQueries: [refetchGetTaskQuery({ taskId })]
	});

	const [form] = useForm();
	const handleFinish = async () => {
		try {
			const values = await form.validateFields();
			assignTask({ variables: { taskId, assignedTo: values["assignedTo"] } });
		} catch (e) {
			console.log(error);
		}
	};

	if (data?.assignTask) {
		return (
			<Result
				icon={<ThunderboltFilled />}
				title="Task Assigned Successfully!"
			/>
		);
	}

	if (memberError || error) {
		console.log(memberError, error);
		return <ShowError />;
	}

	if (memberLoading) {
		return <Loader />;
	}

	return (
		<Form form={form} onFinish={handleFinish} size="large">
			<Item
				name="assignedTo"
				required
				rules={[{ required: true, message: "Select atleast one person" }]}
			>
				<Select
					mode="multiple"
					placeholder="Select People to Assign this Task to"
					allowClear
				>
					{memberData?.getDeptMembers.map((member) => (
						<Option value={member.id}>{member.name}</Option>
					))}
				</Select>
			</Item>
			<Item>
				<Button
					loading={loading}
					type="primary"
					className="button"
					htmlType="submit"
				>
					Assign
				</Button>
			</Item>
		</Form>
	);
};
