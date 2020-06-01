import { ThunderboltFilled } from "@ant-design/icons";
import { Button, Form, Input, Result } from "antd";
import { convertToRaw, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import {
	refetchGetUpdatesQuery,
	useCreateUpdateMutation
} from "../../generated";
import Editor, { composedDecorator } from "../Editor";
import { ShowError } from "../shared/ShowError";

const { useForm, Item } = Form;

export const UpdateForm = () => {
	const [createUpdate, { loading, error, data }] = useCreateUpdateMutation({
		refetchQueries: [refetchGetUpdatesQuery()]
	});

	const [form] = useForm();
	const [editorState, setEditorState] = useState(
		EditorState.createEmpty(composedDecorator)
	);

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

	useEffect(() => {
		const rawContent = convertToRaw(editorState.getCurrentContent());
		const plainText = rawContent.blocks
			.map((block) => block.text.trim())
			.join("");

		let content = "";
		if (!plainText) content = "";
		else content = JSON.stringify(rawContent);

		form.setFieldsValue({ ...form.getFieldsValue(), content });
	}, [editorState, form]);

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
					editorState={editorState}
					setEditorState={setEditorState}
					style={{ height: 80, margin: 10, overflowY: "scroll", zIndex: -1 }}
					placeholder="Content"
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
