import Button from "@atlaskit/button";
import { ErrorMessage, HelperMessage, ValidMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import React, { useState } from "react";
import { useLoginMutation } from "../../generated";
import { ShowError } from "../Shared/ShowError";

export const Login = () => {
	const [rollNumber, setRollNumber] = useState("");
	const [password, setPassword] = useState("");
	const [touched, setTouched] = useState({
		rollNumber: false,
		password: false
	});

	const [login, { data, loading, error }] = useLoginMutation();

	if (data?.login?.id) window.location.pathname = "/";

	if (error) return <ShowError />;

	const onChange = (field: string) => (e: any) => {
		switch (field) {
			case "rollNumber":
				setTouched({ ...touched, rollNumber: true });
				setRollNumber(e.target.value.toUpperCase());
				break;
			case "password":
				setTouched({ ...touched, password: true });
				setPassword(e.target.value);
				break;
		}
	};

	const handleBtnClick = () => login({ variables: { rollNumber, password } });

	return (
		<div style={{ width: "100%" }}>
			<div className="ak-field-group">
				<label htmlFor="rollNumber">Roll Number</label>
				<TextField
					autoComplete="off"
					name="rollNumber"
					id="rollNumber"
					value={rollNumber}
					onChange={onChange("rollNumber")}
				/>
				{!touched.rollNumber && (
					<HelperMessage>Enter your Roll Number</HelperMessage>
				)}
				{touched.rollNumber && rollNumber.length !== 8 && (
					<ErrorMessage>Please Enter a valid Roll Number</ErrorMessage>
				)}
				{rollNumber.length === 8 && (
					<ValidMessage>Nice Roll Number!</ValidMessage>
				)}
			</div>
			<br />
			<div className="ak-field-group">
				<label htmlFor="password">Password</label>
				<TextField
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={onChange("password")}
				/>
				{!touched.password && (
					<HelperMessage>
						Use 8 or more characters with a mix of letters, numbers & symbols.
					</HelperMessage>
				)}
				{touched.password && password.length < 8 && (
					<ErrorMessage>
						Password needs to be more than 8 characters.
					</ErrorMessage>
				)}
				{password.length >= 8 && <ValidMessage>Awesome password!</ValidMessage>}
			</div>
			<br />
			<Button
				type="submit"
				appearance="primary"
				isLoading={loading}
				isDisabled={rollNumber.length !== 8 || password.length <= 8}
				className="submit-btn"
				onClick={handleBtnClick}
			>
				login
			</Button>
		</div>
	);
};
