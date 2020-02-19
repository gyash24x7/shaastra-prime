import Banner from "@atlaskit/banner";
import Button from "@atlaskit/button";
import { HelperMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import React, { useState } from "react";

import { useVerifyUserMutation } from "../../generated";
import { VerificationProps } from "../../typings";
import { ShowError } from "../Shared/ShowError";

export const Verification = ({ rollNumber }: VerificationProps) => {
	const onChange = () => (e: any) => setOtp(e.target.value);
	const [otp, setOtp] = useState("");

	const [verifyUser, { data, loading, error }] = useVerifyUserMutation();
	const handleBtnClick = () => {
		verifyUser({ variables: { rollNumber, otp } });
	};

	if (data?.verifyUser) window.location.pathname = "/";

	if (error) return <ShowError />;

	return (
		<div style={{ width: "100%" }}>
			<div className="ak-field-group">
				<label htmlFor="otp">Enter OTP</label>
				<TextField
					autoComplete="off"
					name="otp"
					id="otp"
					value={otp}
					onChange={onChange()}
				/>
				<HelperMessage>Enter OTP sent to your smail</HelperMessage>
			</div>
			<br />
			<Button
				type="submit"
				appearance="primary"
				isLoading={loading}
				isDisabled={otp.length !== 6}
				className="submit-btn"
				onClick={handleBtnClick}
			>
				submit otp
			</Button>
			<br />
			<br />
			<Banner isOpen={data && !data.verifyUser} appearance="error">
				Entered OTP is incorrect!
			</Banner>
		</div>
	);
};
