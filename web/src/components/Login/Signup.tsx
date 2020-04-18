import { Button, Form, Input, Select, Tag, Typography } from "antd";
import React from "react";

import { PublicLayout } from "../shared/PublicLayout";

// eslint-disable-next-line
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const SignupScreen = () => {
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
			<div className="signup-form-container">
				<Typography.Title level={3}>SIGN UP</Typography.Title>
				<Form
					form={form}
					onFinish={handleSubmit}
					layout="vertical"
					size="large"
				>
					<div className="grid-row">
						<Form.Item
							name="name"
							label="Name"
							className="grid-col form-field"
							rules={[{ required: true, message: "Name is required!" }]}
						>
							<Input placeholder="Enter Name" type="text" />
						</Form.Item>
						<Form.Item
							name="email"
							className="grid-col form-field"
							label="Email"
							rules={[
								{ required: true, message: "Email is required!" },
								{ pattern: emailRegex, message: "Enter Valid Email" }
							]}
						>
							<Input placeholder="Enter Email" type="email" />
						</Form.Item>
					</div>
					<div className="grid-row">
						<Form.Item
							name="mobile"
							label="Mobile Number"
							className="grid-col form-field"
							rules={[
								{ len: 10, message: "Enter Valid Mobile Number!" },
								{ required: true, message: "Mobile Number is required!" }
							]}
						>
							<Input placeholder="Enter Mobile Number" type="number" />
						</Form.Item>
						<Form.Item
							name="rollNumber"
							label="Roll Number"
							className="grid-col form-field"
							rules={[
								{ len: 8, message: "Enter Valid Roll Number!" },
								{ required: true, message: "Roll Number is required!" }
							]}
						>
							<Input placeholder="Enter Roll Number" type="text" />
						</Form.Item>
					</div>
					<div className="grid-row">
						<Form.Item
							name="departments"
							label="Departments"
							className="grid-col form-field"
							rules={[{ required: true, message: "Departments are required!" }]}
						>
							<Select
								mode="multiple"
								options={[
									{ label: "WebOps", value: "WebOps" },
									{ label: "O&IP", value: "O&IP" },
									{ label: "C&D", value: "C&D" },
									{ label: "Finance", value: "Finance" },
									{ label: "Evolve", value: "Evolve" },
									{ label: "Envisage", value: "Envisage" }
								]}
								tagRender={(props) => (
									<Tag {...props} color="red">
										{props.value}
									</Tag>
								)}
							/>
						</Form.Item>
					</div>
					<div className="grid-row">
						<Form.Item
							name="password"
							className="grid-col form-field"
							label="Password"
							rules={[
								{ min: 8, message: "Enter Valid Password" },
								{ required: true, message: "Password is required!" }
							]}
						>
							<Input placeholder="Enter Password" type="password" />
						</Form.Item>

						<Form.Item
							name="passwordRe"
							className="grid-col form-field"
							label="Re Enter Password"
							rules={[
								{ min: 8, message: "Enter Valid Password" },
								{ required: true, message: "Password is required!" },
								{}
							]}
						>
							<Input placeholder="Enter Password" type="password" />
						</Form.Item>
					</div>
					<div className="grid-row">
						<Form.Item className="grid-col form-field">
							<Button
								htmlType="submit"
								type="primary"
								block
								style={{ marginTop: 15 }}
								className="button"
							>
								Submit
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</PublicLayout>
	);
};
