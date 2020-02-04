import React, { useState } from "react";
import { ErrorMessage, HelperMessage, ValidMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useObserver } from "mobx-react-lite";
import { useUserStore } from "../../store";
import { Redirect } from "react-router-dom";

export const Login = () =>
	useObserver(() => {
		const [rollNumber, setRollNumber] = useState("");
		const [password, setPassword] = useState("");
		const [touched, setTouched] = useState({
			rollNumber: false,
			password: false
		});

		const [isLoading, setIsLoading] = useState(false);

		const { login, isAuthenticated } = useUserStore();

		if (isAuthenticated) return <Redirect to="/" />;

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

		const handleBtnClick = () => {
			setIsLoading(true);
			login(rollNumber, password);
		};

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
					{password.length >= 8 && (
						<ValidMessage>Awesome password!</ValidMessage>
					)}
				</div>
				<br />
				<Button
					type="submit"
					appearance="primary"
					isLoading={isLoading}
					isDisabled={rollNumber.length !== 8 || password.length <= 8}
					className="submit-btn"
					onClick={handleBtnClick}
				>
					login
				</Button>
			</div>
		);
	});
