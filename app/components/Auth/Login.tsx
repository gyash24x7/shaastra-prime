import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { AsyncStorage, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginMutation } from "../../generated";
import { AuthContext } from "../../utils/context";
import globalStyles from "../../utils/globalStyles";
import { VerticalSpace } from "../Shared/VerticalSpace";
import styles from "./styles";

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const LoginScreen = () => {
	const [login, { data, error, loading }] = useLoginMutation({
		async onCompleted(data) {
			if (data.login) {
				await AsyncStorage.setItem("authToken", data.login[0]);
				await AsyncStorage.setItem("verificationToken", data.login[1]);
				setAuthStatus(data.login.map((val) => !!val));
			}
		}
	});

	const navigation = useNavigation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const { setAuthStatus } = useContext(AuthContext)!;

	const handleSubmit = async () => {
		if (email && emailRegex.test(email)) {
			if (password && password.length >= 8) {
				setErrorMsg("");
				login({ variables: { email, password } });
			} else {
				setErrorMsg("Password should be more than 8 characters long!");
			}
		} else {
			setErrorMsg("Please enter a valid email!");
		}
	};

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
						LOGIN
					</Text>
					<Input
						placeholder="Email"
						textContentType="emailAddress"
						size="large"
						value={email}
						onChangeText={(val) => setEmail(val.trim())}
					/>
					<Input
						placeholder="Password"
						textContentType="password"
						secureTextEntry
						size="large"
						value={password}
						onChangeText={setPassword}
					/>
					<Button
						onPress={handleSubmit}
						children={() =>
							loading ? <Spinner status="control" /> : <Text>LOGIN</Text>
						}
					/>
					<Text style={globalStyles.errorMsg}>{errorMsg}</Text>
					{error && (
						<Text style={globalStyles.errorMsg}>Internal Server Error!</Text>
					)}
					{data && !data.login && (
						<Text style={globalStyles.errorMsg}>
							Please Check the Entered Details
						</Text>
					)}
					<Layout
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<Text style={globalStyles.text}>Don't have an account?</Text>
						<Text
							style={globalStyles.link}
							onPress={() => navigation.navigate("Signup")}
						>
							Sign Up
						</Text>
					</Layout>
					<VerticalSpace />
					<Text
						style={[globalStyles.link, { alignSelf: "center" }]}
						onPress={() => navigation.navigate("ForgotPassword")}
					>
						Forgot Password?
					</Text>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
};
