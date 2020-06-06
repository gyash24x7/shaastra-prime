import { Button, Form, Input, message, Typography } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { useForgotPasswordMutation } from "../../generated";
import { ShowError } from "../shared/ShowError";
import { VerticalSpace } from "../shared/VerticalSpace";

const { Title } = Typography;

interface SetNewPasswordProps {
	email: string;
}

export const SetNewPassword = ({ email }: SetNewPasswordProps) => {
	const [form] = Form.useForm();
	const history = useHistory();

	const [resetPassword, { loading, error }] = useForgotPasswordMutation({
		onCompleted(data) {
			if (data.forgotPassword) {
				message.success("Password changed successfully!");
				history.push("/");
			}
		}
	});

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			if (values["newPassword"] !== values["confirmPassword"]) {
				throw new Error("Passwords do not match!");
			}
			resetPassword({
				variables: { email, newPassword: values["newPassword"] }
			});
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
				SET NEW PASSWORD
			</Title>
			<VerticalSpace size="large" />
			<Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
				<Form.Item
					name="newPassword"
					label="New Password"
					rules={[
						{ min: 8, message: "Password should be atleast 8 characters long" },
						{ required: true, message: "Password is required!" }
					]}
				>
					<Input placeholder="New Password" type="password" />
				</Form.Item>
				<Form.Item
					name="confirmPassword"
					label="Confirm Password"
					required
					rules={[
						{ min: 8, message: "Password should be atleast 8 characters long" },
						{ required: true, message: "Password is required!" }
					]}
				>
					<Input placeholder="Confirm Password" type="password" />
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
						Reset Password
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
