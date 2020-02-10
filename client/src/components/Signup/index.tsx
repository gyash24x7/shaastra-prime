import React, { useState } from "react";
import { ErrorMessage, HelperMessage, ValidMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import Select from "@atlaskit/select";
import { useGetDepartmentsQuery, useCreateUserMutation } from "../../generated";
import { ShowError } from "../Shared/ShowError";
import { Loader } from "../Shared/Loader";
import { Redirect } from "react-router-dom";

const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const upiRegex = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;

export const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [rollNumber, setRollNumber] = useState("");
	const [password, setPassword] = useState("");
	const [department, setDepartment] = useState(0);
	const [mobile, setMobile] = useState("");
	const [upi, setUpi] = useState("");
	const [touched, setTouched] = useState({
		name: false,
		email: false,
		rollNumber: false,
		password: false,
		department: false,
		mobile: false,
		upi: false
	});

	const { data, loading, error } = useGetDepartmentsQuery();

	const [
		createUser,
		{ data: MutationData, loading: MutationLoading, error: MutationError }
	] = useCreateUserMutation();

	if (error) return <ShowError />;
	if (loading) return <Loader />;

	const options =
		data?.getDepartments?.map(({ name, id }) => ({
			label: name,
			value: id
		})) || [];

	if (MutationError) return <ShowError />;

	const handleBtnClick = () => {
		createUser({
			variables: {
				name,
				rollNumber,
				email,
				password,
				mobile,
				departmentId: department
			}
		});
	};

	if (MutationData?.createUser?.id) return <Redirect to="/verifyUser" />;

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
				setDepartment(parseInt(e.value));
				setTouched({ ...touched, department: true });
				break;
			case "upi":
				setUpi(e.target.value);
				setTouched({ ...touched, upi: true });
		}
	};

	return (
		<div style={{ width: "100%" }}>
			<div className="field-row">
				<div className="ak-field-group">
					<label htmlFor="name">Name</label>
					<TextField
						autoComplete="off"
						name="name"
						id="name"
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
					<label htmlFor="email">Email</label>
					<TextField
						type="email"
						name="email"
						id="Personal Email Address"
						value={email}
						onChange={handleOnChange("email")}
					/>
					{!touched.email && !emailRegex.test(email) && (
						<HelperMessage>Not smail :)</HelperMessage>
					)}
					{!emailRegex.test(email) && touched.email && (
						<ErrorMessage>Please enter a valid Email</ErrorMessage>
					)}
					{emailRegex.test(email) && (
						<ValidMessage>I'll remember that!</ValidMessage>
					)}
				</div>
			</div>
			<div className="field-row">
				<div className="ak-field-group">
					<label htmlFor="rollNumber">Roll Number</label>
					<TextField
						autoComplete="off"
						name="rollNumber"
						id="rollNumber"
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
					<label htmlFor="password">Password</label>
					<TextField
						type="password"
						name="password"
						id="password"
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
					<label htmlFor="mobile">Mobile</label>
					<TextField
						autoComplete="off"
						type="number"
						name="mobile"
						id="mobile"
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
					<label htmlFor="upi">Upi Id</label>
					<TextField
						name="upi"
						id="UPI Id"
						value={upi}
						onChange={handleOnChange("upi")}
					/>
					{!touched.upi && !upiRegex.test(upi) && (
						<HelperMessage>Enter you UPI Id</HelperMessage>
					)}
					{!upiRegex.test(upi) && touched.upi && (
						<ErrorMessage>Please enter a valid upi id</ErrorMessage>
					)}
					{upiRegex.test(upi) && (
						<ValidMessage>I'll remember that!</ValidMessage>
					)}
				</div>
			</div>
			<div className="field-row">
				<div className="ak-field-group">
					<label htmlFor="department">Department</label>
					<Select
						options={options}
						name="department"
						id="department"
						onChange={handleOnChange("department")}
						value={
							(department &&
								options.find(({ value }) => parseInt(value) === department)) ||
							null
						}
						className="single-select"
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
				isLoading={MutationLoading}
				isDisabled={
					!name ||
					!emailRegex.test(email) ||
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
