import React from "react";
import { Signup } from "../components/Signup";
import Button from "@atlaskit/button";
import { Link } from "react-router-dom";

export const SignupPage = () => (
	<div className="login-wrapper">
		<div className="login-container signup-container">
			<Signup />
			<br />
			<br />
			<div className="btn-flex">
				<span>Already have an account?</span>
				<Link to="/login">
					<Button appearance="subtle" className="submit-btn">
						login
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
			<div className="shadow signup" />
		</div>
	</div>
);
