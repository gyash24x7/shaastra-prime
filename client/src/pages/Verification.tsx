import Button from "@atlaskit/button";
import React from "react";
import { Link } from "react-router-dom";

import { getLogo } from "../components/Logos";
import { Verification } from "../components/Verification";
import { VerificationProps } from "../typings";

const Logo = getLogo("#172b4d");

export const VerificationPage = ({ rollNumber }: VerificationProps) => {
	return (
		<div className="login-wrapper">
			<div className="login-container">
				<div className="logo-wrapper">
					<Logo />
				</div>
				<Verification rollNumber={rollNumber} />
				<br />
				<br />
				<div className="btn-flex">
					<span>Don't have and account?</span>
					<Link to="/signup">
						<Button appearance="subtle" className="submit-btn">
							signup
						</Button>
					</Link>
				</div>
				<div className="btn-flex">
					<span>Forgot your password?</span>
					<Link to="/forgotpassword">
						<Button appearance="subtle" className="submit-btn">
							reset password
						</Button>
					</Link>
				</div>
			</div>
			<div className="background-container">
				<div className="shadow" />
			</div>
		</div>
	);
};
