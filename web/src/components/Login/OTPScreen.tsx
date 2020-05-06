import { Button, Form, Input, Typography } from "antd";
import React, { useContext } from "react";
import { refetchMeQuery, useVerifyUserMutation } from "../../generated";
import { UserContext } from "../../utils/context";
import { ShowError } from "../shared/ShowError";

const { Title } = Typography;

export const OTPScreen = () => {
	const [ form ] = Form.useForm();
	const { user } = useContext( UserContext );

	const [ verifyUser, { loading, error } ] = useVerifyUserMutation( { refetchQueries: [ refetchMeQuery() ] } )

	if ( error ) {
		console.log( error );
		return <ShowError />;
	}

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			verifyUser({variables:{email:user!.email, otp: values.otp}})
		} catch (errorInfo) {
			console.log("Failed:", errorInfo);
		}
	};

	return (
		<div className="login-form-container">
			<Title level={3} className="form-title" style={{ paddingBottom: 20 }}>
				VERIFICATION
			</Title>{" "}
			<Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
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
						loading={loading}
					>
						Submit OTP
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
