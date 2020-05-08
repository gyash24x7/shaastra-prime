import { Button, Form, Input, Space } from "antd";
import React from "react";
import {
	refetchGetUpdatesQuery,
	useCreateUpdateMutation
} from "../../generated";
import { stringGen } from "../../utils/lorem";
import Editor from "../Editor";
import { ShowError } from "../shared/ShowError";

const { useForm, Item } = Form;

export const UpdateForm = () => {
	const [createUpdate, { loading, error }] = useCreateUpdateMutation({
		refetchQueries: [refetchGetUpdatesQuery()]
	});

	const [form] = useForm();

	const handleFinish = async () => {
		try {
			const values = await form.validateFields();
			console.log(values);
			createUpdate({
				variables: {
					subject: values["subject"],
					brief: values["brief"],
					content: stringGen.generateParagraphs(5)
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
			<Item name="subject" required>
				<Editor placeholder="Content" />
			</Item>
			<Item>
				<Space>
					<Button
						loading={loading}
						type="primary"
						className="button"
						htmlType="submit"
					>
						Send Update
					</Button>
					<Button className="button" htmlType="reset">
						Cancel
					</Button>
				</Space>
			</Item>
		</Form>
	);
};
