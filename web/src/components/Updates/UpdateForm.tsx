import { ThunderboltFilled } from "@ant-design/icons";
import { Button, Form, Input, Result } from "antd";
import React from "react";
import {
	refetchGetUpdatesQuery,
	useCreateUpdateMutation
} from "../../generated";
import { EDITOR_NULL_VALUES } from "../../utils/constants";
import Editor from "../Editor";
import { ShowError } from "../shared/ShowError";

const { useForm, Item } = Form;

export const UpdateForm = () => {
	const [createUpdate, { loading, error, data }] = useCreateUpdateMutation({
		refetchQueries: [refetchGetUpdatesQuery()]
	});

	const [form] = useForm();

	const handleFinish = async () => {
		try {
			const values = await form.validateFields();
			createUpdate({
				variables: {
					subject: values["subject"],
					brief: values["brief"],
					content: values["content"]
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	if (data && data.createUpdate) {
		return (
			<Result icon={<ThunderboltFilled />} title="Update Sent Successfully!" />
		);
	}

	return (
		<Form form={form} layout="vertical" size="large" onFinish={handleFinish}>
			<Item
				name="subject"
				required
				rules={[{ required: true, message: "Subject is Required!" }]}
			>
				<Input placeholder="Subject" autoFocus />
			</Item>
			<Item
				name="brief"
				required
				rules={[{ required: true, message: "Brief Description is Required!" }]}
			>
				<Input placeholder="Brief" />
			</Item>
			<Item
				name="content"
				required
				rules={[{ required: true, message: "Content is Required!" }]}
			>
				<Editor
					placeholder="Content"
					setSerializedValue={(content) => {
						if (EDITOR_NULL_VALUES.includes(content)) {
							content = "";
						}
						form.setFieldsValue({ ...form.getFieldsValue(), content });
					}}
					style={{ maxHeight: 150, overflowY: "scroll" }}
				/>
			</Item>
			<Item>
				<Button
					loading={loading}
					type="primary"
					className="button"
					htmlType="submit"
				>
					Send Update
				</Button>
			</Item>
		</Form>
	);
};
