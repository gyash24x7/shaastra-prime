import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Image } from "react-native";
import styles from "./styles";

export const LoginScreen = () => {
	return (
		<Layout style={styles.wrapper}>
			<Image
				source={require("../../assets/images/LightLogo.png")}
				style={styles.appLogo}
			/>
			<Layout style={styles.container}>
				<Text category="h3" style={styles.title}>
					LOGIN
				</Text>
				<Input placeholder="Email" textContentType="emailAddress" />
				<Input
					placeholder="Password"
					textContentType="password"
					secureTextEntry
				/>
				<Button children={() => <Text style={styles.buttonText}>LOGIN</Text>} />
			</Layout>
		</Layout>
	);
};
