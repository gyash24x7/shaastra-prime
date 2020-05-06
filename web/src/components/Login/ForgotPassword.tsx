import { Button, Form, Input, Typography } from "antd";
import React from "react";

const { Title } = Typography;

export const ForgotPasswordScreen = () => {
	const [form] = Form.useForm();

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			console.log("Success:", values);
		} catch (errorInfo) {
			console.log("Failed:", errorInfo);
		}
	};

	return (
		<div className="login-form-container">
			<Title level={3} className="form-title" style={{ paddingBottom: 20 }}>
				FORGOT PASSWORD
			</Title>{" "}
			<Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
				<Form.Item
					name="rollNumber"
					label="Roll Number"
					rules={[
						{ len: 8, message: "Enter Valid Roll Number!" },
						{ required: true, message: "Roll Number is required!" }
					]}
				>
					<Input placeholder="Enter Roll Number" type="text" />
				</Form.Item>
				<Form.Item>
					<Button
						htmlType="submit"
						block
						style={{ marginTop: 15 }}
						className="button"
						type="primary"
					>
						Get OTP
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
