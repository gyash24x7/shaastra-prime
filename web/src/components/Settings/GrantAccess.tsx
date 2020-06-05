import { Button, Card, message, Select, Space, Typography } from "antd";
import React, { useContext, useState } from "react";
import {
	refetchGetDeptmembersQuery,
	useGetDeptmembersQuery,
	useGrantAccessMutation,
	UserRole
} from "../../generated";
import { UserContext } from "../../utils/context";
import { VerticalSpace } from "../shared/VerticalSpace";

const { Title } = Typography;

export const GrantAccess = () => {
	const [userId, setUserId] = useState<string>();
	const [role, setRole] = useState<UserRole>();
	const { user } = useContext(UserContext)!;

	const [grantAccess, { loading, error }] = useGrantAccessMutation({
		refetchQueries: [
			refetchGetDeptmembersQuery({ deptId: user.department!.id! })
		],
		onCompleted: () => {
			setUserId(undefined);
			setRole(undefined);
			message.success("Access Granted Successfully!");
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
		<Card title={<Title level={3}>Grant Access</Title>}>
			<div className="grid-row">
				<div className="grid-col" style={{ margin: 10 }}>
					<Select
						value={userId}
						onChange={(val) => setUserId(val.toString())}
						size="large"
						allowClear
						options={memberData?.getDeptMembers
							.filter((member) => member.id !== user.id)
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
						value={role}
						onChange={(val) => setRole(val.toString() as UserRole)}
						size="large"
						allowClear
						options={[
							{ label: "COORD", value: "COORD" },
							{ label: "HEAD", value: "HEAD" }
						]}
						style={{ width: "100%" }}
						placeholder="Select Role"
					/>
				</div>
			</div>
			<VerticalSpace size="large" />
			<Space size="large">
				<Button
					className="button"
					type="primary"
					loading={loading}
					disabled={!userId || !role}
					onClick={() =>
						grantAccess({ variables: { userId: userId!, role: role! } })
					}
				>
					Grant Access
				</Button>
				<Button
					className="button"
					onClick={() => {
						setUserId(undefined);
						setRole(undefined);
					}}
				>
					Cancel
				</Button>
			</Space>
		</Card>
	);
};
