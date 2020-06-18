import { ThunderboltFilled } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Result, Select } from "antd";
import { CompositeDecorator, convertToRaw, EditorState } from "draft-js";
import { Moment } from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useCreateTaskMutation, useGetChannelsQuery } from "../../generated";
import { DepartmentContext } from "../../utils/context";
import Editor from "../Editor";
import { DraftLink, LinkStrategy } from "../Editor/LinkifyPlugin";
import { ShowError } from "../shared/ShowError";

const { useForm, Item } = Form;
const { Option } = Select;

export const CreateTaskForm = () => {
	const [form] = useForm();
	const { departments } = useContext(DepartmentContext);

	const [createTask, { data, loading, error }] = useCreateTaskMutation();
	const { data: channelData, error: channelError } = useGetChannelsQuery();

	const decorator = new CompositeDecorator([
		{ strategy: LinkStrategy, component: DraftLink }
	]);
	const [editorState, setEditorState] = useState(
		EditorState.createEmpty(decorator)
	);

	const handleFinish = async () => {
		try {
			const values = await form.validateFields();
			createTask({
				variables: {
					brief: values["brief"],
					deadline: (values["deadline"] as Moment).format("DD/MM/YYYY"),
					details: values["details"],
					forDeptId: values["forDept"],
					channelIds: values["channelIds"] || []
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const rawContent = convertToRaw(editorState.getCurrentContent());
		const plainText = rawContent.blocks
			.map((block) => block.text.trim())
			.join("");

		let details = "";
		if (!plainText) details = "";
		else details = JSON.stringify(rawContent);

		form.setFieldsValue({ ...form.getFieldsValue(), details });
	}, [editorState, form]);

	if (error || channelError) {
		console.log(error, channelError);
		return <ShowError />;
	}

	if (data?.createTask) {
		return (
			<Result
				icon={<ThunderboltFilled />}
				title="Requirement Created Successfully!"
			/>
		);
	}

	return (
		<Form form={form} layout="vertical" size="large" onFinish={handleFinish}>
			<Item
				name="brief"
				required
				rules={[{ required: true, message: "Brief Description is Required!" }]}
			>
				<Input placeholder="Brief" />
			</Item>
			<Item
				name="forDept"
				required
				rules={[{ required: true, message: "Choose a Department" }]}
			>
				<Select placeholder="Select Concerned Department" allowClear>
					{departments.map((dept) => (
						<Option key={dept.id} value={dept.id}>
							{dept.name}
						</Option>
					))}
				</Select>
			</Item>
			<Item
				name="channelIds"
				required
				extra={
					<span style={{ fontSize: "90%" }}>
						The channels you select will receive updates regarding this
						requirement.
					</span>
				}
			>
				<Select
					placeholder="Select Messaging Channels"
					allowClear
					mode="multiple"
				>
					{(channelData?.getChannels || []).map((channel) => (
						<Option key={channel.id} value={channel.id}>
							{channel.name}
						</Option>
					))}
				</Select>
			</Item>
			<Item
				name="details"
				required
				rules={[{ required: true, message: "Details are required!" }]}
			>
				<Editor
					editorState={editorState}
					setEditorState={setEditorState}
					style={{ height: 80, margin: 10, overflowY: "scroll", zIndex: -1 }}
					placeholder="Details"
				/>
			</Item>
			<Item
				name="deadline"
				required
				rules={[{ required: true, message: "Deadline is required!" }]}
			>
				<DatePicker style={{ width: "100%" }} placeholder="Deadline" />
			</Item>
			<Item>
				<Button
					loading={loading}
					type="primary"
					className="button"
					htmlType="submit"
				>
					Create Task
				</Button>
			</Item>
		</Form>
	);
};
