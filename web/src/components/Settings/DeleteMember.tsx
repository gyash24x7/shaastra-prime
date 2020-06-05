import { Button, Card, message, Select, Space, Typography } from "antd";
import React, { useContext, useState } from "react";
import {
	refetchGetDeptmembersQuery,
	useDeleteMemberMutation,
	useGetDeptmembersQuery
} from "../../generated";
import { UserContext } from "../../utils/context";
import { VerticalSpace } from "../shared/VerticalSpace";

const { Title } = Typography;

export const DeleteMember = () => {
	const [userId, setUserId] = useState<string>();
	const { user } = useContext(UserContext)!;

	const [deleteMember, { loading, error }] = useDeleteMemberMutation({
		refetchQueries: [
			refetchGetDeptmembersQuery({ deptId: user.department!.id! })
		],
		onCompleted: () => {
			setUserId(undefined);
			message.success("Member Deleted Successfully!");
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
		<Card title={<Title level={3}>Delete User</Title>}>
			<Select
				value={userId}
				onChange={(val) => setUserId(val.toString())}
				size="large"
				allowClear
				style={{ width: "100%" }}
				options={memberData?.getDeptMembers
					.filter((member) => member.id !== user.id)
					.map((member) => ({
						label: member.name,
						value: member.id
					}))}
				placeholder="Select User"
			/>
			<VerticalSpace size="large" />
			<Space size="large">
				<Button
					className="button"
					type="primary"
					loading={loading}
					disabled={!userId}
					onClick={() => deleteMember({ variables: { userId: userId! } })}
				>
					Delete User
				</Button>
				<Button className="button" onClick={() => setUserId(undefined)}>
					Cancel
				</Button>
			</Space>
			<VerticalSpace />
		</Card>
	);
};
