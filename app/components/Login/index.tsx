import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { AsyncStorage, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { refetchMeQuery, useLoginMutation } from "../../generated";
import { AuthContext } from "../../utils/context";
import globalStyles from "../../utils/globalStyles";
import styles from "./styles";

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const LoginScreen = () => {
	const [login, { data, error, loading }] = useLoginMutation({
		refetchQueries: [refetchMeQuery()],
		awaitRefetchQueries: true
	});

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const { setIsLoggedIn } = useContext(AuthContext)!;

	if (data?.login) {
		AsyncStorage.setItem("authToken", data.login).then(() => {
			setIsLoggedIn(true);
		});
	}

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
							loading ? (
								<Spinner status="control" />
							) : (
								<Text style={styles.buttonText}>LOGIN</Text>
							)
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
				</Layout>
			</Layout>
		</SafeAreaView>
	);
};
