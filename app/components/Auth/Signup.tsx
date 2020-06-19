import { useNavigation } from "@react-navigation/native";
import {
	Button,
	IndexPath,
	Input,
	Layout,
	Select,
	SelectItem,
	Spinner,
	Text
} from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { AsyncStorage, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateUserMutation, useGetDepartmentsQuery } from "../../generated";
import { AuthContext } from "../../utils/context";
import globalStyles from "../../utils/globalStyles";
import { LoadingScreen } from "../Navigation/LoadingScreen";
import { ShowError } from "../Shared/ShowError";
import { VerticalSpace } from "../Shared/VerticalSpace";
import styles from "./styles";

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const SignupScreen = () => {
	const [createUser, { error, loading }] = useCreateUserMutation({
		async onCompleted(data) {
			if (data.createUser) {
				await AsyncStorage.setItem("authToken", data.createUser[0]);
				setAuthStatus(data.createUser.map((val) => !!val));
			}
		}
	});

	const navigation = useNavigation();
	const { data: deptData, error: deptError } = useGetDepartmentsQuery();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [rollNumber, setRollNumber] = useState("");
	const [mobile, setMobile] = useState("");
	const [departmentIndex, setDepartmentIndex] = useState<IndexPath>();
	const [errorMsg, setErrorMsg] = useState("");
	const { setAuthStatus } = useContext(AuthContext)!;

	const getFormError = (): string | null => {
		if (!name) return "Name is required!";

		if (!email || !emailRegex.test(email)) return "Please enter a valid email!";

		if (!password || password.length < 8)
			return "Password should be more than 8 Characters long!";

		if (!mobile || mobile.length !== 10)
			return "Please Enter a valid 10 digit mobile number";

		if (!rollNumber || rollNumber.length !== 8)
			return "Please Enter a valid roll number!";

		if (!departmentIndex) return "Please select the department!";

		return null;
	};

	const handleSubmit = async () => {
		const error = getFormError();
		if (!error) {
			setErrorMsg("");
			createUser({
				variables: {
					name,
					email,
					rollNumber,
					password,
					mobile,
					departmentId: deptData!.getDepartments[departmentIndex!.row].id
				}
			});
		} else {
			setErrorMsg(error);
		}
	};

	if (deptError) {
		console.log(deptError);
		return <ShowError />;
	}

	if (deptData?.getDepartments) {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar barStyle="light-content" backgroundColor="#141414" />
				<Layout style={styles.wrapper}>
					<Image
						source={require("../../assets/images/LightLogo.png")}
						style={styles.appLogo}
					/>
					<Layout style={styles.container}>
						<Text category="h3" style={styles.title}>
							SIGN UP
						</Text>
						<Input
							placeholder="Name"
							size="large"
							value={name}
							onChangeText={setName}
						/>
						<Input
							placeholder="Email"
							textContentType="emailAddress"
							size="large"
							value={email}
							onChangeText={(val) => setEmail(val.trim())}
						/>
						<Input
							placeholder="Roll Number"
							size="large"
							value={rollNumber}
							onChangeText={(val) => setRollNumber(val.toUpperCase())}
						/>
						<Input
							placeholder="Mobile"
							size="large"
							value={mobile}
							onChangeText={setMobile}
						/>
						<Input
							placeholder="Password"
							textContentType="password"
							secureTextEntry
							size="large"
							value={password}
							onChangeText={setPassword}
						/>
						<Select
							selectedIndex={departmentIndex}
							onSelect={(index) => setDepartmentIndex(index as IndexPath)}
							value={
								departmentIndex &&
								deptData.getDepartments[departmentIndex.row].name
							}
							size="large"
						>
							{deptData.getDepartments.map((dept) => (
								<SelectItem title={dept.name} key={dept.id} />
							))}
						</Select>
						<VerticalSpace size="tiny" />
						<Button
							onPress={handleSubmit}
							children={() =>
								loading ? <Spinner status="control" /> : <Text>SIGN UP</Text>
							}
						/>
						<Text style={globalStyles.errorMsg}>{errorMsg}</Text>
						{error && (
							<Text style={globalStyles.errorMsg}>Internal Server Error!</Text>
						)}
						<VerticalSpace />
						<Layout
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						>
							<Text style={globalStyles.text}>Already have an account?</Text>
							<Text
								style={globalStyles.link}
								onPress={() => navigation.navigate("Login")}
							>
								Login
							</Text>
						</Layout>
					</Layout>
				</Layout>
			</SafeAreaView>
		);
	}

	return <LoadingScreen />;
};
