import React from "react";
import { connect } from "react-redux";
import { Store, User } from "../typings";
import { Link, Redirect } from "react-router-dom";
import Button from "@atlaskit/button";
import { Login } from "../components/Login";

export interface PageProps {
	user: User;
}

const mapStateToProps = ( { user }: Store ) => (
	{ user }
);

export const LoginPage = connect( mapStateToProps )( ( { user }: PageProps ) => {
	if ( user?.name ) return <Redirect to="/"/>;

	return (
		<div className="login-wrapper">
			<div className="login-container">
				<Login user={ user }/>
				<br/>
				<br/>
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
				<div className="shadow"/>
			</div>
		</div>
	);
} );
