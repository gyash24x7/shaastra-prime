import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { PublicLayout } from "../shared/PublicLayout";

const { Title } = Typography;

export const OTPScreen = () => {
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
			<div className="login-form-container">
				<Title level={3} className="form-title">
					VERIFICATION
				</Title>{" "}
				<Form
					form={form}
					onFinish={handleSubmit}
					layout="vertical"
					size="large"
				>
					<Form.Item
						name="otp"
						label="OTP"
						rules={[
							{ len: 6, message: "Enter OTP send to your Smail!" },
							{ required: true, message: "OTP is required!" }
						]}
					>
						<Input placeholder="Enter OTP" type="number" />
					</Form.Item>
					<Form.Item>
						<Button
							htmlType="submit"
							block
							style={{ marginTop: 15 }}
							className="button"
							type="primary"
						>
							Submit OTP
						</Button>
					</Form.Item>
				</Form>
			</div>
		</PublicLayout>
	);
};
