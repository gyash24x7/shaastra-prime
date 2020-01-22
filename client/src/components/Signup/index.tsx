import React, { Fragment } from "react";
import Form, {
	ErrorMessage,
	Field,
	HelperMessage,
	ValidMessage
} from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import Select from "@atlaskit/select";
import { auth } from "../../auth";
import { useSelector } from "react-redux";
import { selectDepartmentList } from "../../store/selectors/Departments";

export const Signup = () => {

	const departments = useSelector( selectDepartmentList );

	const options = departments.map( ( { name, id } ) => (
		{
			label : name,
			value : id
		}
	) );

	const handleSubmit = async ( { email, password }: any ) => {
		const user = await auth.createUserWithEmailAndPassword( email, password );
		console.log( user );
	};

	return (
		<Form onSubmit={ handleSubmit }>
			{ ( { formProps, submitting } ) => (
				<form { ...formProps } noValidate style={ { width : "100%" } }>
					<div className="field-row">
						<Field
							name="name"
							label="Name"
							isRequired
							defaultValue=""
							validate={ ( value?: string ) => (
								value ? undefined : "INVALID"
							) }
						>
							{ ( { fieldProps, error, valid } ) => (
								<Fragment>
									<TextField autoComplete="off" { ...fieldProps } />
									{ !error && !valid && (
										<HelperMessage>Enter your Name</HelperMessage>
									) }
									{ error && <ErrorMessage>Name is required</ErrorMessage> }
									{ valid && <ValidMessage>Lovely name!</ValidMessage> }
								</Fragment>
							) }
						</Field>
						<Field
							name="email"
							label="Personal Email Address"
							defaultValue=""
							isRequired
							validate={ ( value?: string ) =>
								value?.length < 8 ? "TOO_SHORT" : undefined
							}
						>
							{ ( { fieldProps, error, valid } ) => (
								<Fragment>
									<TextField type="email" { ...fieldProps } />
									{ !error && !valid && (
										<HelperMessage>Not smail :)</HelperMessage>
									) }
									{ error && (
										<ErrorMessage>Please enter a valid email</ErrorMessage>
									) }
									{ valid && <ValidMessage>I'll remember that!</ValidMessage> }
								</Fragment>
							) }
						</Field>
					</div>
					<div className="field-row">
						<Field
							name="rollNumber"
							label="Roll Number"
							isRequired
							defaultValue=""
							validate={ ( value?: string ) =>
								value?.length === 8 ? undefined : "INVALID"
							}
						>
							{ ( { fieldProps, error, valid } ) => (
								<Fragment>
									<TextField autoComplete="off" { ...fieldProps } />
									{ !error && !valid && (
										<HelperMessage>Enter your Roll Number</HelperMessage>
									) }
									{ error && (
										<ErrorMessage>
											Please Enter a valid Roll Number
										</ErrorMessage>
									) }
									{ valid && <ValidMessage>Nice Roll Number!</ValidMessage> }
								</Fragment>
							) }
						</Field>
						<Field
							name="password"
							label="Password"
							defaultValue=""
							isRequired
							validate={ ( value?: string ) =>
								value?.length < 8 ? "TOO_SHORT" : undefined
							}
						>
							{ ( { fieldProps, error, valid } ) => (
								<Fragment>
									<TextField type="password" { ...fieldProps } />
									{ !error && !valid && (
										<HelperMessage>
											Use 8 or more characters with a mix of letters, numbers &
											symbols.
										</HelperMessage>
									) }
									{ error && (
										<ErrorMessage>
											Password needs to be more than 8 characters.
										</ErrorMessage>
									) }
									{ valid && <ValidMessage>Awesome password!</ValidMessage> }
								</Fragment>
							) }
						</Field>
					</div>
					<div className="field-row">
						<Field
							name="mobile"
							label="Mobile"
							isRequired
							defaultValue=""
							validate={ ( value?: string ) =>
								value?.length === 10 ? undefined : "INVALID"
							}
						>
							{ ( { fieldProps, error, valid } ) => (
								<Fragment>
									<TextField autoComplete="off"
									           type="number" { ...fieldProps } />
									{ !error && !valid && (
										<HelperMessage>
											Enter your 10 digit Mobile Number
										</HelperMessage>
									) }
									{ error && (
										<ErrorMessage>
											Please Enter a valid Mobile Number
										</ErrorMessage>
									) }
									{ valid && <ValidMessage>Noted!</ValidMessage> }
								</Fragment>
							) }
						</Field>
						<Field
							name="department"
							label="Department"
							defaultValue=""
							isRequired
							validate={ ( value?: string ) => (
								value ? undefined : "INVALID"
							) }
						>
							{ ( { error, valid, fieldProps }: any ) => (
								<Fragment>
									<Select options={ options } { ...fieldProps }/>
									{ !error && !valid && (
										<HelperMessage>Choose your Department</HelperMessage>
									) }
									{ error &&
									<ErrorMessage>Department is required</ErrorMessage> }
									{ valid && <ValidMessage>Great Choice!</ValidMessage> }
								</Fragment>
							) }
						</Field>
					</div>
					<br/>
					<Button
						type="submit"
						appearance="primary"
						isLoading={ submitting }
						className="submit-btn"
					>
						sign up
					</Button>
				</form>
			) }
		</Form>
	);
};
