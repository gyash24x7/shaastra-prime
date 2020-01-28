import React from "react";
import { Link } from "react-router-dom";
import Button from "@atlaskit/button";
import { Login } from "../components/Login";
import { getLogo } from "../components/Logos";

export interface PageProps {
	match: any;
}

const Logo = getLogo("#172b4d");

export const LoginPage = () => (
	<div className="login-wrapper">
		<div className="login-container">
			<div className="logo-wrapper">
				<Logo />
			</div>
			<Login />
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
