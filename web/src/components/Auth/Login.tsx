import { Button, Form, Input, Typography } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../generated";
import { AuthContext } from "../../utils/context";
import { ShowError } from "../shared/ShowError";

// eslint-disable-next-line
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const { Title } = Typography;

export const LoginScreen = () => {
	const [form] = Form.useForm();
	const { setAuthStatus } = useContext(AuthContext)!;

	const [login, { error, loading, data }] = useLoginMutation({
		onCompleted(data) {
			if (data.login) {
				localStorage.setItem("authToken", data.login[0]);
				localStorage.setItem("verificationToken", data.login[1]);
				setAuthStatus(data.login.map((val) => !!val));
			}
		}
	});

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			login({
				variables: {
					email: values["email"],
					password: values["password"]
				}
			});
		} catch (errorInfo) {
			console.log("Failed:", errorInfo);
		}
	};

	if (error || (data && !data.login)) {
		console.log(error);
		return <ShowError />;
	}

	return (
		<div className="login-form-container">
			<Title level={3} className="form-title" style={{ paddingBottom: 20 }}>
				LOGIN
			</Title>
			<Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{ required: true, message: "Email is required!" },
						{ pattern: emailRegex, message: "Enter Valid Email" }
					]}
				>
					<Input placeholder="Enter Email" type="text" />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={[
						{ min: 8, message: "Enter Valid Password" },
						{ required: true, message: "Password is required!" }
					]}
				>
					<Input placeholder="Enter Password" type="password" />
				</Form.Item>
				<Form.Item>
					<Button
						htmlType="submit"
						block
						style={{ marginTop: 15 }}
						loading={loading}
						className="button"
						type="primary"
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Link to="/signup">Sign Up</Link>
				<Link to="/forgotpassword">Forgot Password</Link>
			</div>
		</div>
	);
};
