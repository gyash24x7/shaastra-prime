import "./styles.scss";

import { Button, Form, Input, Typography } from "antd";
import React from "react";

import { PublicLayout } from "../shared/PublicLayout";
import { SwitchingIcon } from "../shared/SwitchingIcon";

export const LoginScreen = () => {
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
		<PublicLayout>
			<div className="form-container">
				<Typography.Title level={3}>LOGIN</Typography.Title>
				<Form
					form={form}
					onFinish={handleSubmit}
					layout="vertical"
					size="large"
				>
					<Form.Item
						name="rollNumber"
						label="Roll Number"
						rules={[
							{ len: 8, message: "Enter Valid Roll Number!" },
							{ required: true, message: "Roll Number is required!" }
						]}
					>
						<Input
							placeholder="Enter Roll Number"
							type="text"
							prefix={<SwitchingIcon name="user" className="icon input-icon" />}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{ min: 8, message: "Enter Valid Password" },
							{ required: true, message: "Password is required!" }
						]}
					>
						<Input
							placeholder="Enter Password"
							type="password"
							prefix={<SwitchingIcon name="lock" className="icon input-icon" />}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							htmlType="submit"
							block
							style={{ marginTop: 15 }}
							className="button primary"
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</PublicLayout>
	);
};
