import { Button, Form, Input, Typography } from "antd";
import React, { useContext } from "react";
import { useVerifyUserMutation } from "../../generated";
import { AuthContext } from "../../utils/context";
import { ShowError } from "../shared/ShowError";

const { Title, Text } = Typography;
const otpRegex = /^\d{6}$/;

export const OTPScreen = () => {
	const [form] = Form.useForm();
	const { setAuthStatus } = useContext(AuthContext)!;

	const [verifyUser, { loading, error, data }] = useVerifyUserMutation({
		onCompleted(data) {
			if (data.verifyUser) {
				localStorage.setItem("verificationToken", data.verifyUser);
				setAuthStatus([true, true]);
			}
		}
	});

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			verifyUser({ variables: { otp: values.otp } });
		} catch (errorInfo) {
			console.log("Failed:", errorInfo);
		}
	};

	return (
		<div className="login-form-container">
			<Title level={3} className="form-title" style={{ paddingBottom: 20 }}>
				VERIFICATION
			</Title>
			<Text style={{ alignSelf: "center" }}>
				ENTER THE OTP SENT TO YOUR SMAIL
			</Text>
			<br />
			<br />
			<Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
				<Form.Item
					name="otp"
					label="OTP"
					rules={[
						{ required: true, message: "OTP is required!" },
						{ pattern: otpRegex, message: "Enter a valid OTP" }
					]}
				>
					<Input placeholder="Enter OTP" />
				</Form.Item>
				<Form.Item>
					<Button
						htmlType="submit"
						block
						style={{ marginTop: 15 }}
						className="button"
						type="primary"
						loading={loading}
					>
						Submit OTP
					</Button>
				</Form.Item>
				<Form.Item>
					<Button
						block
						className="button"
						onClick={() => {
							localStorage.clear();
							setAuthStatus([false, false]);
						}}
					>
						Back To Login
					</Button>
				</Form.Item>
			</Form>
			{data && !data.verifyUser && (
				<Text style={{ color: "#de350b", alignSelf: "center" }}>
					ENTERED OTP IS INCORRECT!
				</Text>
			)}
		</div>
	);
};
