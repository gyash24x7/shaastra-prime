import { Button, Form, Input, message, Typography } from "antd";
import React from "react";
import { useGetPasswordOtpMutation } from "../../generated";
import { ShowError } from "../shared/ShowError";
import { VerticalSpace } from "../shared/VerticalSpace";

const { Title } = Typography;

interface RequestOTPProps {
	nextStep: (val: string) => void;
}

const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const RequestOTP = ({ nextStep }: RequestOTPProps) => {
	const [form] = Form.useForm();
	const [requestOTP, { loading, error }] = useGetPasswordOtpMutation({
		onCompleted(data) {
			if (data.getPasswordOTP) {
				message.success("Password OTP sent to your Smail!");
				nextStep(form.getFieldsValue()["email"]);
			} else {
				message.error("This User doesn't exist!");
			}
		}
	});

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			requestOTP({ variables: { email: values["email"] } });
		} catch (errorInfo) {
			console.log("Failed:", errorInfo);
		}
	};

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	return (
		<div className="login-form-container">
			<Title level={3} className="form-title">
				REQUEST OTP
			</Title>
			<VerticalSpace size="large" />
			<Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{ pattern: emailRegex, message: "Enter Valid Email!" },
						{ required: true, message: "Email is required!" }
					]}
				>
					<Input placeholder="Enter Email" type="email" />
				</Form.Item>
				<VerticalSpace size="middle" />
				<Form.Item>
					<Button
						htmlType="submit"
						block
						className="button"
						type="primary"
						loading={loading}
					>
						Request OTP
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
