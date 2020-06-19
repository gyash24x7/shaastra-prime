import { Avatar, Divider, Layout } from "@ui-kitten/components";
import React from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";
import { User } from "../../generated";
import { RecursivePartial } from "../../generated/types";
import { Tag } from "./Tag";

interface UserCardProps {
	size: "large" | "small";
	logo?: boolean;
	user: RecursivePartial<User>;
}

export const UserCard = ({ size, logo, user }: UserCardProps) => {
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
			borderBottomWidth: 1
		},

		cover: {
			height: size === "large" ? 200 : 150,
			width: "100%",
			marginBottom: size === "large" ? 40 : 30
		},
		avatar: {
			width: size === "large" ? 80 : 60,
			height: size === "large" ? 80 : 60,
			borderWidth: 1,
			borderColor: "#0052cc"
		}
	});

	return (
		<Layout
			style={
				size === "small"
					? { borderRightColor: "#303030", borderRightWidth: 1 }
					: {}
			}
		>
			<ImageBackground
				source={{ uri: "https://source.unsplash.com/featured/600x300" }}
				style={styles.cover}
			>
				<Layout style={styles.avatarContainer}>
					{logo && (
						<Image
							source={require("../../assets/images/LightLogo.png")}
							style={{
								position: "absolute",
								width: 120,
								resizeMode: "contain",
								top: -90
							}}
						/>
					)}
					{user.profilePic?.split(".").reverse()[0] === "svg" ? (
						<Avatar
							shape="round"
							ImageComponent={() => (
								<SvgUri
									uri={user.profilePic!}
									width={size === "large" ? 80 : 60}
									height={size === "large" ? 80 : 60}
								/>
							)}
						/>
					) : (
						<Avatar
							shape="round"
							source={{
								uri:
									user.profilePic! ||
									"https://source.unsplash.com/featured/200x200"
							}}
							style={styles.avatar}
						/>
					)}
				</Layout>
			</ImageBackground>
			<Layout style={styles.userCard}>
				<Layout style={styles.userDetails}>
					<Tag color="#3ADBE8" text={user.name!} />
				</Layout>
				<Layout style={styles.userDetails}>
					<Tag color="#DE3508" text={user.department?.name!} />
					<Tag color="#FFAB00" text={user.role!} />
				</Layout>
			</Layout>
			<Divider />
		</Layout>
	);
};
