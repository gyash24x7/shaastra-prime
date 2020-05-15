import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface TagProps {
	color: string;
	text: string;
}

export const Tag = (props: TagProps) => {
	const styles = StyleSheet.create({
		wrapper: {
			backgroundColor: props.color + "6c",
			borderWidth: 1,
			borderColor: props.color,
			borderRadius: 5,
			flex: 1,
			margin: 5
		},
		text: {
			color: props.color,
			fontFamily: "montserrat-bold",
			textAlign: "center",
			margin: 5,
			textTransform: "uppercase",
			fontSize: 13
		}
	});

	return (
		<Layout style={[styles.wrapper]}>
			<Text style={styles.text}>{props.text}</Text>
		</Layout>
	);
};
