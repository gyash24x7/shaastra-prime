import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { useForgotPasswordMutation } from "../../generated";
import globalStyles from "../../utils/globalStyles";
import { VerticalSpace } from "../Shared/VerticalSpace";
import styles from "./styles";

interface SetNewPasswordProps {
	email: string;
	nextStep: (val: string) => void;
}

export const SetNewPassword = ({ email, nextStep }: SetNewPasswordProps) => {
	const [resetPassword, { error, loading }] = useForgotPasswordMutation({
		onCompleted: (data) => data.forgotPassword && nextStep(email)
	});

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassowrd, setConfirmPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const navigation = useNavigation();

	const handleSubmit = async () => {
		if (newPassword.length >= 8) {
			if (newPassword === confirmPassowrd) {
				setErrorMsg("");
				resetPassword({ variables: { newPassword, email } });
			} else {
				setErrorMsg("Passwords do not match!");
			}
		} else {
			setErrorMsg("Password should be atleast 8 Characters long!");
		}
	};

	return (
		<Layout style={styles.container}>
			<Text category="h3" style={styles.title}>
				SET PASSWORD
			</Text>
			<Input
				placeholder="New Password"
				textContentType="password"
				secureTextEntry
				size="large"
				value={newPassword}
				onChangeText={setNewPassword}
			/>
			<VerticalSpace size="tiny" />
			<Input
				placeholder="Confirm Password"
				textContentType="password"
				secureTextEntry
				size="large"
				value={confirmPassowrd}
				onChangeText={setConfirmPassword}
			/>
			<VerticalSpace size="tiny" />
			<Button
				onPress={handleSubmit}
				children={() =>
					loading ? <Spinner status="control" /> : <Text>RESET PASSWORD</Text>
				}
			/>
			<Text style={globalStyles.errorMsg}>{errorMsg}</Text>
			{error && (
				<Text style={globalStyles.errorMsg}>Internal Server Error!</Text>
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
