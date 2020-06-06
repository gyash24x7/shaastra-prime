import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { AsyncStorage, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVerifyUserMutation } from "../../generated";
import { AuthContext } from "../../utils/context";
import globalStyles from "../../utils/globalStyles";
import { VerticalSpace } from "../Shared/VerticalSpace";
import styles from "./styles";

const otpRegex = /^\d{6}$/;

export const VerificationScreen = () => {
	const [verifyUser, { error, loading }] = useVerifyUserMutation({
		async onCompleted(data) {
			if (data.verifyUser) {
				await AsyncStorage.setItem("verificationToken", data.verifyUser);
				setAuthStatus([true, true]);
			}
		}
	});

	const navigation = useNavigation();

	const [otp, setOtp] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const { setAuthStatus } = useContext(AuthContext)!;

	const handleSubmit = async () => {
		if (otp && otpRegex.test(otp)) {
			setErrorMsg("");
			verifyUser({ variables: { otp } });
		} else {
			setErrorMsg("Please enter a valid OTP!");
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" backgroundColor="#141414" />
			<Layout style={styles.wrapper}>
				<Image
					source={require("../../assets/images/LightLogo.png")}
					style={styles.appLogo}
				/>
				<Layout style={styles.container}>
					<Text category="h3" style={styles.title}>
						VERIFICATION
					</Text>
					<Text style={{ alignSelf: "center" }}>
						Enter the OTP sent to your Smail
					</Text>
					<VerticalSpace />
					<Input
						placeholder="OTP"
						size="large"
						value={otp}
						onChangeText={setOtp}
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
					<VerticalSpace />
					<Text
						style={[globalStyles.link, { alignSelf: "center" }]}
						onPress={async () => {
							await AsyncStorage.clear();
							setAuthStatus([false, false]);
						}}
					>
						BACK TO LOGIN
					</Text>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
};
