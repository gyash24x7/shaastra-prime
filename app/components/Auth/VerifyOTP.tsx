import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { useVerifyPasswordOtpMutation } from "../../generated";
import globalStyles from "../../utils/globalStyles";
import { VerticalSpace } from "../Shared/VerticalSpace";
import styles from "./styles";

const otpRegex = /^\d{6}$/;

interface VerifyOTPProps {
	email: string;
	nextStep: (val: string) => void;
}

export const VerifyOTP = ({ email, nextStep }: VerifyOTPProps) => {
	const [verifyOTP, { data, error, loading }] = useVerifyPasswordOtpMutation({
		onCompleted: (data) => data.verifyPasswordOTP && nextStep(email)
	});

	const [passwordOTP, setPasswordOTP] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const navigation = useNavigation();

	const handleSubmit = async () => {
		if (passwordOTP && otpRegex.test(passwordOTP)) {
			setErrorMsg("");
			verifyOTP({ variables: { passwordOTP, email } });
		} else {
			setErrorMsg("Please enter a valid OTP!");
		}
	};

	return (
		<Layout style={styles.container}>
			<Text category="h3" style={styles.title}>
				VERIFY OTP
			</Text>
			<Input
				placeholder="OTP"
				size="large"
				value={passwordOTP}
				onChangeText={setPasswordOTP}
			/>
			<VerticalSpace size="tiny" />
			<Button
				onPress={handleSubmit}
				children={() =>
					loading ? <Spinner status="control" /> : <Text>SUBMIT OTP</Text>
				}
			/>
			<Text style={globalStyles.errorMsg}>{errorMsg}</Text>
			{error && (
				<Text style={globalStyles.errorMsg}>Internal Server Error!</Text>
			)}
			{data && !data.verifyPasswordOTP && (
				<Text style={globalStyles.errorMsg}>Entered OTP is incorrect!</Text>
			)}
			<VerticalSpace />
			<Text
				style={[globalStyles.link, { alignSelf: "center" }]}
				onPress={() => navigation.navigate("Login")}
			>
				Login
			</Text>
		</Layout>
	);
};
