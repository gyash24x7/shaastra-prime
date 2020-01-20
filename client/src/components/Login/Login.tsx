import React, { Fragment } from "react";
import Form, {
	Field,
	HelperMessage,
	ErrorMessage,
	ValidMessage
} from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { connect } from "react-redux";
import { getLoginAction, LoginActionData } from "../../store/actions/User";
import { Store, User } from "../../typings";
import { Redirect } from "react-router-dom";

interface LoginProps {
	dispatch: Function;
	user: User;
}

const mapStateToProps = ({ user }: Store) => ({ user });

export const Login = connect(mapStateToProps)((props: LoginProps) => {
	if (props.user) return <Redirect to="/" />;

	return (
		<Form
			onSubmit={({ rollNumber, password }: LoginActionData) =>
				props.dispatch(getLoginAction({ rollNumber, password }))
			}
		>
			{({ formProps, submitting }) => (
				<form {...formProps} noValidate style={{ width: "100%" }}>
					<Field
						name="rollNumber"
						label="Roll Number"
						isRequired
						defaultValue=""
						validate={(value?: string) =>
							value?.length === 8 ? undefined : "INVALID"
						}
					>
						{({ fieldProps, error, valid }) => (
							<Fragment>
								<TextField autoComplete="off" {...fieldProps} />
								{!error && !valid && (
									<HelperMessage>Enter your Roll Number</HelperMessage>
								)}
								{error && (
									<ErrorMessage>Please Enter a valid Roll Number</ErrorMessage>
								)}
								{valid && <ValidMessage>Nice Roll Number!</ValidMessage>}
							</Fragment>
						)}
					</Field>
					<Field
						name="password"
						label="Password"
						defaultValue=""
						isRequired
						validate={(value?: string) =>
							value?.length < 8 ? "TOO_SHORT" : undefined
						}
					>
						{({ fieldProps, error, valid }) => (
							<Fragment>
								<TextField type="password" {...fieldProps} />
								{!error && !valid && (
									<HelperMessage>
										Use 8 or more characters with a mix of letters, numbers &
										symbols.
									</HelperMessage>
								)}
								{error && (
									<ErrorMessage>
										Password needs to be more than 8 characters.
									</ErrorMessage>
								)}
								{valid && <ValidMessage>Awesome password!</ValidMessage>}
							</Fragment>
						)}
					</Field>
					<br />
					<Button
						type="submit"
						appearance="primary"
						isLoading={submitting}
						className="submit-btn"
					>
						login
					</Button>
				</form>
			)}
		</Form>
	);
});
