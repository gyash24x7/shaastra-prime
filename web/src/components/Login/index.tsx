import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { refetchMeQuery, useLoginMutation } from "../../generated";
import { ShowError } from "../shared/ShowError";
import { SwitchingIcon } from "../shared/SwitchingIcon";

// eslint-disable-next-line
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const { Title } = Typography;

export const LoginScreen = () => {
	const [form] = Form.useForm();

	const [login, { data, error, loading }] = useLoginMutation({
		refetchQueries: [refetchMeQuery()]
	});

	if (error) return <ShowError />;

	if (data?.login) {
		localStorage.setItem("user", JSON.stringify(data.login));
		return <Redirect to="/verification" />;
	}

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
