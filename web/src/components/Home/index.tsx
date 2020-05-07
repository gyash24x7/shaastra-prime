import React, { useContext } from "react";
import { UserContext } from "../../utils/context";
import { PrivateLayout } from "../shared/PrivateLayout";
import { ProfileCard } from "./ProfileCard";
import { UserDataCard } from "./UserDataCard";

export const HomeScreen = () => {
	const { user } = useContext(UserContext);

	return (
		<PrivateLayout>
			<div
				className="grid-row"
				style={{ flexDirection: "row-reverse", margin: "0px -5px" }}
			>
				<div className="grid-col">
					<ProfileCard userId={user!.id} />
				</div>
				<div className="grid-col" style={{ flex: 2 }}>
					<UserDataCard />
				</div>
			</div>
		</PrivateLayout>
	);
};
