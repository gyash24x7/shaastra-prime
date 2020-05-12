import { Avatar, Divider, Layout } from "@ui-kitten/components";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Tag } from "./Tag";

interface UserCardProps {
	size: "large" | "small";
}

export const UserCard = ({ size }: UserCardProps) => {
	const styles = StyleSheet.create({
		userCard: {
			paddingHorizontal: 20,
			paddingVertical: 10
		},

		userDetails: {
			display: "flex",
			flexDirection: "row",
			marginHorizontal: -5
		},

		avatarContainer: {
			display: "flex",
			justifyContent: "center",
			flexDirection: "row",
			width: "100%",
			backgroundColor: "#141414b3",
			zIndex: 10,
			height: size === "large" ? 200 : 150,
			paddingTop: size === "large" ? 160 : 120,
			position: "absolute",
			borderBottomColor: "#0052cc",
			borderBottomWidth: 2
		},

		cover: {
			height: size === "large" ? 200 : 150,
			width: "100%",
			marginBottom: size === "large" ? 40 : 30
		},

		avatar: {
			width: size === "large" ? 80 : 60,
			height: size === "large" ? 80 : 60,
			borderWidth: 2,
			borderColor: "#0052cc"
		}
	});

	return (
		<Layout
			style={
				size === "small"
					? { borderRightColor: "#303030", borderRightWidth: 2 }
					: {}
			}
		>
			<ImageBackground
				source={{ uri: "https://source.unsplash.com/featured/600x300" }}
				style={styles.cover}
			>
				<Layout style={styles.avatarContainer}>
					<Avatar
						source={{ uri: "https://source.unsplash.com/featured/300x300" }}
						shape="round"
						style={styles.avatar}
					/>
				</Layout>
			</ImageBackground>
			<Layout style={styles.userCard}>
				<Layout style={styles.userDetails}>
					<Tag color="#3ADBE8" text="Yash Gupta" />
				</Layout>
				<Layout style={styles.userDetails}>
					<Tag color="#DE3508" text="WebOps" />
					<Tag color="#FFAB00" text="Core" />
				</Layout>
			</Layout>
			<Divider />
		</Layout>
	);
};
