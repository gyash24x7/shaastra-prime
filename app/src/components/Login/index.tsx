import { IonContent, IonPage } from "@ionic/react";
import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LightLogo from "../../images/LightLogo.png";
import "./styles.css";

const { Title } = Typography;

// eslint-disable-next-line
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const LoginScreen = () => {
	const [form] = Form.useForm();
	return (
		<IonPage>
			<IonContent>
				<div className="login-wrapper">
					<img src={LightLogo} alt="" className="logo" />
					<Title level={3} className="form-title" style={{ paddingBottom: 20 }}>
						LOGIN
					</Title>
					<Form form={form} layout="vertical" size="large">
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
								className="button"
								type="primary"
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "80%"
						}}
					>
						<Link to="/signup">Sign Up</Link>
						<Link to="/forgotpassword">Forgot Password</Link>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};
