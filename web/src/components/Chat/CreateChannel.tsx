import { ThunderboltFilled } from "@ant-design/icons";
import { Button, Form, Input, Result, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
	refetchGetChannelsQuery,
	useCreateChannelMutation,
	User,
	useSearchUserLazyQuery
} from "../../generated";
import { ShowError } from "../shared/ShowError";

const { useForm, Item } = Form;
const { Option } = Select;

export const CreateChannel = () => {
	const [form] = useForm();
	const [searchStr, setSearchStr] = useState("");
	const [searchUsers, setSearchUsers] = useState<Partial<User>[]>([]);

	const [searchUser, { error, data }] = useSearchUserLazyQuery();
	const [
		createChannel,
		{ data: createChannelData, error: createChannelError, loading }
	] = useCreateChannelMutation({ refetchQueries: [refetchGetChannelsQuery()] });

	useEffect(() => {
		searchUser({ variables: { searchStr } });
	}, [searchStr, searchUser]);

	useEffect(() => {
		if (data?.searchUser) setSearchUsers(data.searchUser);
	}, [data]);

	if (error || createChannelError) {
		console.log(error || createChannelError);
		return <ShowError />;
	}

	if (createChannelData?.createChannel) {
		return (
			<Result
				icon={<ThunderboltFilled />}
				title="Channel Created Successfully!"
			/>
		);
	}

	const handleFinish = async () => {
		console.log(form.getFieldsValue());
		try {
			const values = await form.validateFields();
			createChannel({
				variables: {
					name: values["name"],
					description: values["description"],
					members: values["members"]
				}
			});
		} catch (error) {}
	};

	return (
		<Form form={form} layout="vertical" size="large" onFinish={handleFinish}>
			<Item
				name="name"
				required
				rules={[{ required: true, message: "Channel Name is Required!" }]}
			>
				<Input placeholder="Name" autoFocus />
			</Item>
			<Item
				name="description"
				required
				rules={[
					{ required: true, message: "Channel Description is Required!" }
				]}
			>
				<Input placeholder="Description" />
			</Item>
			<Item
				name="members"
				required
				rules={[{ required: true, message: "Member List cannot be empty!" }]}
			>
				<Select
					mode="multiple"
					onSearch={setSearchStr}
					filterOption={false}
					onChange={(members) => form.setFieldsValue({ members })}
					placeholder="Search Members"
				>
					{searchUsers.map((user) => (
						<Option key={user.id} value={user.id!}>
							{user.name}
						</Option>
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
					Create Channel
				</Button>
			</Item>
		</Form>
	);
};
