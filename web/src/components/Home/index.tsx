import React from "react";
import { PrivateLayout } from "../shared/PrivateLayout";
import { ProfileCard } from "./ProfileCard";
import { UserDataCard } from "./UserDataCard";

export const HomeScreen = () => {
	return (
		<PrivateLayout>
			<div
				className="grid-row"
				style={{ flexDirection: "row-reverse", margin: "0px -5px" }}
			>
				<div className="grid-col">
					<ProfileCard />
				</div>
				<div className="grid-col" style={{ flex: 2 }}>
					<UserDataCard />
				</div>
			</div>
		</PrivateLayout>
	);
};
