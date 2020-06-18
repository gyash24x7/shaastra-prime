import { Button, Descriptions, Space, Tag, Typography } from "antd";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import moment from "moment";
import React, { useContext } from "react";
import { statusColor, TaskOperationProps } from ".";
import { TaskStatus, useGetTaskQuery, UserRole } from "../../generated";
import { ModalContext, UserContext } from "../../utils/context";
import { composedDecorator } from "../Editor";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";
import { UserCardSmall } from "../shared/UserCardSmall";
import { AcceptTask } from "./AcceptTask";
import { AssignTask } from "./AssignTask";
import { CompleteTask } from "./CompleteTask";
import { DeleteTask } from "./DeleteTask";
import { SubmitTask } from "./SubmitTask";

const { Text } = Typography;

export const TaskDescription = ({ taskId }: TaskOperationProps) => {
	const { user } = useContext(UserContext)!;
	const { toggleModal } = useContext(ModalContext)!;
	const { data, error } = useGetTaskQuery({ variables: { taskId } });

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	if (data?.getTask) {
		return (
			<Descriptions column={2} bordered layout="horizontal">
				<Descriptions.Item label={<Text>Details</Text>} span={2}>
					<Editor
						editorState={EditorState.createWithContent(
							convertFromRaw(JSON.parse(data.getTask.details)),
							composedDecorator
						)}
						onChange={() => {}}
						readOnly
					/>
				</Descriptions.Item>
				<Descriptions.Item label={<Text>Deadline</Text>}>
					<Tag color="lime">
						{moment(parseInt(data.getTask.deadline)).format("DD MMMM")}
					</Tag>
				</Descriptions.Item>
				<Descriptions.Item label={<Text>By&nbsp;Department</Text>}>
					<Tag color="red">{data.getTask.byDept.name}</Tag>
				</Descriptions.Item>
				<Descriptions.Item label={<Text>Created&nbsp;On</Text>}>
					<Tag color="lime">
						{moment(parseInt(data.getTask.createdOn)).format("DD MMMM")}
					</Tag>
				</Descriptions.Item>
				<Descriptions.Item label={<Text>Status</Text>}>
					<Tag color={statusColor[data.getTask.status]}>
						{data.getTask.status}
					</Tag>
				</Descriptions.Item>
				<Descriptions.Item label={<Text>Assigned&nbsp;To</Text>} span={2}>
					<Space size="large">
						{data.getTask.assignedTo.map((user) => (
							<UserCardSmall key={user.id} user={user} />
						))}
					</Space>
				</Descriptions.Item>
				<Descriptions.Item label={<Text>Created&nbsp;By</Text>} span={2}>
					<Space>
						<UserCardSmall user={user} />
					</Space>
				</Descriptions.Item>
				<Descriptions.Item label={<Text>Actions</Text>}>
					<Space>
						{data.getTask.status === TaskStatus.NotAssigned &&
							user?.role === UserRole.Core && (
								<Button
									className="button"
									onClick={() => {
										toggleModal({
											component: <AssignTask taskId={data.getTask.id} />,
											props: { title: "Assign Task" }
										});
									}}
								>
									Assign Task
								</Button>
							)}
						{data.getTask.status === TaskStatus.InProgress && (
							<SubmitTask taskId={data.getTask.id} />
						)}
						{data.getTask.status === TaskStatus.Assigned && (
							<AcceptTask taskId={data.getTask.id} />
						)}
						{data.getTask.status === TaskStatus.Submitted && (
							<CompleteTask taskId={data.getTask.id} />
						)}
						{data.getTask.createdBy.id === user?.id && (
							<DeleteTask taskId={data.getTask.id} />
						)}
					</Space>
				</Descriptions.Item>
			</Descriptions>
		);
	}

	return <Loader />;
};
