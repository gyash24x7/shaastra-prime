import { Button, Divider, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { SvgUri } from "react-native-svg";
import { refetchMeQuery, useUploadProfilePicMutation } from "../../generated";
import globalStyles from "../../utils/globalStyles";
import { VerticalSpace } from "../Shared/VerticalSpace";

const BASE_URL =
	"https://res.cloudinary.com/shaastraprime/image/upload/v1591251681/avatars";

export const SelectAvatar = () => {
	const [selectedAvatar, setSelectedAvatar] = useState(0);

	const [uploadProfilePic, { loading, error }] = useUploadProfilePicMutation({
		refetchQueries: [refetchMeQuery()],
		onCompleted: () => setSelectedAvatar(0)
	});

	return (
		<Layout style={{ width: "100%", padding: 10 }}>
			<Text style={globalStyles.title}> Select Avatar</Text>
			<Divider style={{ backgroundColor: "#303030", marginVertical: 10 }} />
			<Layout
				style={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "row",
					justifyContent: "space-between"
				}}
			>
				{[...Array(12)].map((_, i) => (
					<Layout
						key={i}
						style={[
							{
								padding: 5,
								margin: 2,
								borderRadius: 5,
								backgroundColor:
									i + 10 === selectedAvatar ? "#303030" : "transparent"
							}
						]}
						onTouchEnd={() => setSelectedAvatar(i + 10)}
					>
						<SvgUri
							uri={BASE_URL + `/user${i + 10}.svg`}
							height={60}
							width={60}
						/>
					</Layout>
				))}
			</Layout>
			<VerticalSpace />
			<Layout style={{ display: "flex", flexDirection: "row" }}>
				<Button
					status="primary"
					style={{ flex: 1, marginHorizontal: 5 }}
					children={() =>
						loading ? <Spinner status="control" /> : <Text>SELECT AVATAR</Text>
					}
					disabled={!selectedAvatar}
					onPress={() => {
						uploadProfilePic({
							variables: { profilePic: BASE_URL + `/user${selectedAvatar}.svg` }
						});
					}}
				/>
				<Button
					status="danger"
					style={{ flex: 1, marginHorizontal: 5 }}
					children={() => <Text>CANCEL</Text>}
					onPress={() => setSelectedAvatar(0)}
				/>
			</Layout>
			<VerticalSpace size="tiny" />
			{error && <Text style={globalStyles.errorMsg}>Some Error Occurred!</Text>}
		</Layout>
	);
};
