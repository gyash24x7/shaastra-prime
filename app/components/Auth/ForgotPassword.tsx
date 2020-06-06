import { Layout } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { RequestOTP } from "./RequestOTP";
import { SetNewPassword } from "./SetNewPassword";
import styles from "./styles";
import { VerifyOTP } from "./VerifyOTP";

export const ForgotPassword = () => {
	const [step, setStep] = useState(0);
	const [email, setEmail] = useState("");

	const handleStepChange = (val: string) => {
		setEmail(val);
		setStep(step + 1);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" backgroundColor="#141414" />
			<Layout style={styles.wrapper}>
				<Image
					source={require("../../assets/images/LightLogo.png")}
					style={styles.appLogo}
				/>
				{step === 0 && <RequestOTP nextStep={handleStepChange} />}
				{step === 1 && <VerifyOTP email={email} nextStep={handleStepChange} />}
				{step === 2 && (
					<SetNewPassword email={email} nextStep={handleStepChange} />
				)}
				{step === 3 && <PasswordResetSuccess />}
			</Layout>
		</SafeAreaView>
	);
};
