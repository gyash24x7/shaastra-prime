import { Button, Form, Input, Select, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useCreateUserMutation } from "../../generated";
import { DepartmentContext } from "../../utils/context";
import { ShowError } from "../shared/ShowError";

const { Title } = Typography;

// eslint-disable-next-line
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const SignupScreen = () => {
	const [form] = Form.useForm();

	const [createUser, { data, loading, error }] = useCreateUserMutation();
	const { departments } = useContext(DepartmentContext);
	if (error) {
		console.log(error);
		return <ShowError />;
	}

	if (data?.createUser) {
		localStorage.setItem("authToken", data.createUser);
		return <Redirect to="/" />;
	}

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			createUser({
				variables: {
					name: values["name"],
					email: values["email"],
					rollNumber: values["rollNumber"],
					password: values["password"],
					mobile: values["mobile"],
					departmentId: values["department"]
				}
			});
		} catch (errorInfo) {
			console.log("Failed:", errorInfo);
		}
	};

	return (
		<div className="signup-form-container">
			<Title level={3} className="form-title" style={{ paddingBottom: 20 }}>
				SIGN UP
			</Title>
			<Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
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
					<Form.Item
						name="department"
						label="Department"
						className="grid-col form-field"
						rules={[{ required: true, message: "Departments are required!" }]}
					>
						<Select
							options={departments.map((dept) => ({
								label: dept.name,
								value: dept.id
							}))}
							tagRender={(props) => (
								<Tag {...props} color="red">
									{props.label}
								</Tag>
							)}
							placeholder="Select Department"
						/>
					</Form.Item>
				</div>
				<div className="grid-row">
					<Form.Item className="grid-col form-field">
						<Button
							htmlType="submit"
							type="primary"
							loading={loading}
							block
							style={{ marginTop: 15 }}
							className="button"
						>
							Submit
						</Button>
					</Form.Item>
				</div>
			</Form>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<span>Already have an account?</span>
				<Link to="/login">Login</Link>
			</div>
		</div>
	);
};
