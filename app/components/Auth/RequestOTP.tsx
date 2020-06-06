import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { useGetPasswordOtpMutation } from "../../generated";
import globalStyles from "../../utils/globalStyles";
import { VerticalSpace } from "../Shared/VerticalSpace";
import styles from "./styles";

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

interface RequestOTPProps {
	nextStep: (val: string) => void;
}

export const RequestOTP = ({ nextStep }: RequestOTPProps) => {
	const [getPasswordOTP, { data, error, loading }] = useGetPasswordOtpMutation({
		onCompleted: (data) => data.getPasswordOTP && nextStep(email)
	});

	const [email, setEmail] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const navigation = useNavigation();

	const handleSubmit = async () => {
		if (email && emailRegex.test(email)) {
			setErrorMsg("");
			getPasswordOTP({ variables: { email } });
		} else {
			setErrorMsg("Please enter a valid email!");
		}
	};

	return (
		<Layout style={styles.container}>
			<Text category="h3" style={styles.title}>
				REQUEST OTP
			</Text>
			<Input
				placeholder="Email"
				textContentType="emailAddress"
				size="large"
				value={email}
				onChangeText={(val) => setEmail(val.trim())}
			/>
			<VerticalSpace size="tiny" />
			<Button
				onPress={handleSubmit}
				children={() =>
					loading ? <Spinner status="control" /> : <Text>REQUEST OTP</Text>
				}
			/>
			<Text style={globalStyles.errorMsg}>{errorMsg}</Text>
			{error && (
				<Text style={globalStyles.errorMsg}>Internal Server Error!</Text>
			)}
			{data && !data.getPasswordOTP && (
				<Text style={globalStyles.errorMsg}>
					User with this Email doesn't exist!
				</Text>
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
