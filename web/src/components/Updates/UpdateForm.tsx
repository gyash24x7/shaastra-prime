import { Form, Input } from "antd";
import React from "react";
import Editor from "../Editor";

const { useForm, Item } = Form;

export const UpdateForm = () => {
	const [form] = useForm();
	return (
		<Form form={form} layout="vertical" size="large">
			<Item name="subject" required>
				<Input placeholder="Subject" autoFocus />
			</Item>
			<Item name="brief" required>
				<Input placeholder="Brief" />
			</Item>
			<Item name="subject" required>
				<Editor />
			</Item>
		</Form>
	);
};
