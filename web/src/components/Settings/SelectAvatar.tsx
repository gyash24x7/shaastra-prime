import AkButton from "@atlaskit/button";
import { Button, Card, message, Space, Typography } from "antd";
import React, { useState } from "react";
import { refetchMeQuery, useUploadProfilePicMutation } from "../../generated";

const BASE_URL =
	"https://res.cloudinary.com/shaastraprime/image/upload/v1591251681/avatars";

const { Title } = Typography;

export const SelectAvatar = () => {
	const [selectedAvatar, setSelectedAvatar] = useState(0);
	const [uploadProfilePic, { loading, error }] = useUploadProfilePicMutation({
		refetchQueries: [refetchMeQuery()],
		onCompleted() {
			setSelectedAvatar(0);
			message.success("Avatar Updated Successfully!");
		}
	});

	if (error) {
		console.log(error);
		message.error("Some Error Occurred!");
	}

	return (
		<Card title={<Title level={3}>Select Avatar</Title>}>
			<div style={{ overflowX: "scroll", marginBottom: 10 }}>
				<div className="select-avatar-wrapper">
					{[...Array(21)].map((_, i) => (
						<div
							className={
								i + 1 === selectedAvatar
									? "select-avatar-container active"
									: "select-avatar-container"
							}
							key={i}
							onClick={() => setSelectedAvatar(i + 1)}
						>
							<img src={BASE_URL + `/user${i + 1}.svg`} alt="" />
						</div>
					))}
				</div>
			</div>
			<Space size="large">
				<AkButton
					appearance="primary"
					className="button"
					isDisabled={selectedAvatar === 0}
					isLoading={loading}
					onClick={() => {
						uploadProfilePic({
							variables: { profilePic: BASE_URL + `/user${selectedAvatar}.svg` }
						});
					}}
				>
					Select Avatar
				</AkButton>
				<Button className="button" onClick={() => setSelectedAvatar(0)}>
					Cancel
				</Button>
			</Space>
		</Card>
	);
};
