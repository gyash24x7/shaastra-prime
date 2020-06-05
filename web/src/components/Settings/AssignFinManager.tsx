import { Button, Card, message, Select, Space, Typography } from "antd";
import React, { useContext, useState } from "react";
import {
	refetchGetDeptmembersQuery,
	useAssignFinManagerMutation,
	useGetDeptmembersQuery,
	UserRole
} from "../../generated";
import { DepartmentContext, UserContext } from "../../utils/context";
import { VerticalSpace } from "../shared/VerticalSpace";

const { Title } = Typography;

export const AssignFinManager = () => {
	const [userId, setUserId] = useState<string>();
	const [deptId, setDeptId] = useState<string>();
	const { user } = useContext(UserContext)!;
	const { departments } = useContext(DepartmentContext);

	const [assignFinManager, { loading, error }] = useAssignFinManagerMutation({
		refetchQueries: [
			refetchGetDeptmembersQuery({ deptId: user.department!.id! })
		],
		onCompleted: () => {
			setUserId(undefined);
			setDeptId(undefined);
			message.success("Fin Manager Assigned Successfully!");
		}
	});

	const { data: memberData, error: memberError } = useGetDeptmembersQuery({
		variables: { deptId: user.department!.id! }
	});

	if (error || memberError) {
		console.log(error || memberError);
		message.error("Some Error Occurred!");
	}

	return (
		<Card title={<Title level={3}>Assign Fin Manager</Title>}>
			<div className="grid-row">
				<div className="grid-col" style={{ margin: 10 }}>
					<Select
						value={userId}
						onChange={(val) => setUserId(val.toString())}
						size="large"
						allowClear
						options={memberData?.getDeptMembers
							.filter(
								(member) =>
									member.id !== user.id && member.role === UserRole.Head
							)
							.map((member) => ({
								label: member.name,
								value: member.id
							}))}
						placeholder="Select User"
						style={{ width: "100%" }}
					/>
				</div>
				<div className="grid-col" style={{ margin: 10 }}>
					<Select
						value={deptId}
						onChange={(val) => setDeptId(val.toString())}
						size="large"
						allowClear
						options={departments.map((dept) => ({
							label: dept.name,
							value: dept.id
						}))}
						style={{ width: "100%" }}
						placeholder="Select Department"
					/>
				</div>
			</div>
			<VerticalSpace size="large" />
			<Space size="large">
				<Button
					className="button"
					type="primary"
					loading={loading}
					disabled={!userId || !deptId}
					onClick={() =>
						assignFinManager({
							variables: { userId: userId!, deptId: deptId! }
						})
					}
				>
					Assign Fin Manager
				</Button>
				<Button
					className="button"
					onClick={() => {
						setUserId(undefined);
						setDeptId(undefined);
					}}
				>
					Cancel
				</Button>
			</Space>
		</Card>
	);
};
