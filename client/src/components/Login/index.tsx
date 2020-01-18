import React from "react";
import { Login } from "./Login";
import Button from "@atlaskit/button";
import { Link } from "react-router-dom";

export default () => (
	<div className="login-wrapper">
		<div className="login-container">
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
