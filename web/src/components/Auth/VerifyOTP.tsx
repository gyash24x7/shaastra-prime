import { Button, Form, Input, message, Typography } from "antd";
import React from "react";
import { useVerifyPasswordOtpMutation } from "../../generated";
import { ShowError } from "../shared/ShowError";
import { VerticalSpace } from "../shared/VerticalSpace";

const { Title } = Typography;

interface VerifyOTPProps {
	nextStep: (val: string) => void;
	email: string;
}

const otpRegex = /^\d{6}$/;

export const VerifyOTP = ({ nextStep, email }: VerifyOTPProps) => {
	const [form] = Form.useForm();
	const [verifyOTP, { loading, error }] = useVerifyPasswordOtpMutation({
		onCompleted(data) {
			if (data.verifyPasswordOTP) {
				message.success("OTP verified!");
				nextStep(email);
			} else {
				message.error("Enter a Valid OTP!");
			}
		}
	});

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			verifyOTP({ variables: { email, passwordOTP: values["passwordOTP"] } });
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
				VERIFY OTP
			</Title>
			<VerticalSpace size="large" />
			<Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
				<Form.Item
					name="passwordOTP"
					label="OTP"
					rules={[
						{ required: true, message: "OTP is required!" },
						{ pattern: otpRegex, message: "Enter a valid OTP" }
					]}
				>
					<Input placeholder="Enter OTP" />
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
						Submit OTP
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
