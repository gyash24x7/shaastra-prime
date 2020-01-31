import React, { useState } from "react";
import { ErrorMessage, HelperMessage, ValidMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import Select from "@atlaskit/select";
import { useSelector } from "react-redux";
import { selectDepartmentList } from "../../store/selectors/Departments";

const regex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const Signup = () => {
	const departments = useSelector(selectDepartmentList);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [rollNumber, setRollNumber] = useState("");
	const [password, setPassword] = useState("");
	const [department, setDepartment] = useState("");
	const [mobile, setMobile] = useState("");
	const [touched, setTouched] = useState({
		name: false,
		email: false,
		rollNumber: false,
		password: false,
		department: false,
		mobile: false
	});

	const options = departments.map(({ name, id }) => ({
		label: name,
		value: id
	}));

	const handleBtnClick = async () => {
		console.log("user created!");
	};

	const handleOnChange = (field: string) => (e: any) => {
		switch (field) {
			case "name":
				setName(e.target.value);
				setTouched({ ...touched, name: true });
				break;
			case "email":
				setEmail(e.target.value);
				setTouched({ ...touched, email: true });
				break;
			case "mobile":
				setMobile(e.target.value);
				setTouched({ ...touched, mobile: true });
				break;
			case "rollNumber":
				setRollNumber(e.target.value);
				setTouched({ ...touched, rollNumber: true });
				break;
			case "password":
				setPassword(e.target.value);
				setTouched({ ...touched, password: true });
				break;
			case "department":
				setDepartment(e.value);
				setTouched({ ...touched, department: true });
				break;
		}
	};

	return (
		<div style={{ width: "100%" }}>
			<div className="field-row">
				<div className="ak-field-group">
					<TextField
						autoComplete="off"
						name="name"
						label="Name"
						value={name}
						onChange={handleOnChange("name")}
					/>
					{!touched.name && !name && (
						<HelperMessage>Enter your Name</HelperMessage>
					)}
					{!name && touched.name && (
						<ErrorMessage>Name is required</ErrorMessage>
					)}
					{name && <ValidMessage>Lovely name!</ValidMessage>}
				</div>
				<div className="ak-field-group">
					<TextField
						type="email"
						name="email"
						label="Personal Email Address"
						value={email}
						onChange={handleOnChange("email")}
					/>
					{!touched.email && !regex.test(email) && (
						<HelperMessage>Not smail :)</HelperMessage>
					)}
					{!regex.test(email) && touched.email && (
						<ErrorMessage>Please enter a valid email</ErrorMessage>
					)}
					{regex.test(email) && (
						<ValidMessage>I'll remember that!</ValidMessage>
					)}
				</div>
			</div>
			<div className="field-row">
				<div className="ak-field-group">
					<TextField
						autoComplete="off"
						name="rollNumber"
						label="Roll Number"
						value={rollNumber}
						onChange={handleOnChange("rollNumber")}
					/>
					{!touched.rollNumber && rollNumber.length !== 8 && (
						<HelperMessage>Enter your Roll Number</HelperMessage>
					)}
					{rollNumber.length !== 8 && touched.rollNumber && (
						<ErrorMessage>Please Enter a valid Roll Number</ErrorMessage>
					)}
					{rollNumber.length === 8 && (
						<ValidMessage>Nice Roll Number!</ValidMessage>
					)}
				</div>
				<div className="ak-field-group">
					<TextField
						type="password"
						name="password"
						label="Password"
						value={password}
						onChange={handleOnChange("password")}
					/>
					{!touched.password && password.length < 8 && (
						<HelperMessage>
							Use 8 or more characters with a mix of letters, numbers & symbols.
						</HelperMessage>
					)}
					{password.length < 8 && touched.password && (
						<ErrorMessage>
							Password needs to be more than 8 characters.
						</ErrorMessage>
					)}
					{password.length >= 8 && (
						<ValidMessage>Awesome password!</ValidMessage>
					)}
				</div>
			</div>
			<div className="field-row">
				<div className="ak-field-group">
					<TextField
						autoComplete="off"
						type="number"
						name="mobile"
						label="Mobile"
						value={mobile}
						onChange={handleOnChange("mobile")}
					/>
					{!touched.mobile && mobile.length !== 10 && (
						<HelperMessage>Enter your 10 digit Mobile Number</HelperMessage>
					)}
					{mobile.length !== 10 && touched.mobile && (
						<ErrorMessage>Please Enter a valid Mobile Number</ErrorMessage>
					)}
					{mobile.length === 10 && <ValidMessage>Noted!</ValidMessage>}
				</div>
				<div className="ak-field-group">
					<Select
						options={options}
						name="department"
						label="Department"
						onChange={handleOnChange("department")}
						value={
							(department &&
								options.find(({ value }) => value === department)) ||
							null
						}
					/>
					{!touched.department && !department && (
						<HelperMessage>Choose your Department</HelperMessage>
					)}
					{!department && touched.department && (
						<ErrorMessage>Department is required</ErrorMessage>
					)}
					{department && <ValidMessage>Great Choice!</ValidMessage>}
				</div>
			</div>
			<br />
			<Button
				type="submit"
				appearance="primary"
				isLoading={false}
				isDisabled={
					!name ||
					!regex.test(email) ||
					rollNumber.length !== 8 ||
					password.length <= 8 ||
					mobile.length !== 10 ||
					!department
				}
				onClick={handleBtnClick}
				className="submit-btn"
			>
				sign up
			</Button>
		</div>
	);
};
