import { ContainerHeader, ItemAvatar } from "@atlaskit/navigation-next";
import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../routes/PrivateRoute";
import { storage } from "../../utils/firebase";

export const NavHeader = () => {
	const user = useContext(UserContext);
	const [src, setSrc] = useState("");

	useEffect(() => {
		if (!!user.profilePic)
			storage
				.child(user.profilePic)
				.getDownloadURL()
				.then(url => setSrc(url));
	}, [user]);

	return (
		<div className="user-section">
			<ContainerHeader
				before={(itemState: any) => (
					<ItemAvatar itemState={itemState} size="large" src={src} />
				)}
				text={<strong className="user-details">{user.name}</strong>}
				subText={
					<strong className="user-details">
						{user.department.name} | {user.role}
					</strong>
				}
			/>
		</div>
	);
};
