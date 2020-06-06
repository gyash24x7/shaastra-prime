import React, { Fragment, useState } from "react";
import { RequestOTP } from "./RequestOTP";
import { SetNewPassword } from "./SetNewPassword";
import { VerifyOTP } from "./VerifyOTP";

export const ForgotPasswordScreen = () => {
	const [step, setStep] = useState(0);
	const [email, setEmail] = useState("");

	const handleStepChange = (val: string) => {
		setEmail(val);
		setStep(step + 1);
	};

	return (
		<Fragment>
			{step === 0 && <RequestOTP nextStep={handleStepChange} />}
			{step === 1 && <VerifyOTP nextStep={handleStepChange} email={email} />}
			{step === 2 && <SetNewPassword email={email} />}
		</Fragment>
	);
};
