import { Menu } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../../utils/context";
import { UserCard } from "../shared/UserCard";

export const AvatarMenu = () => {
	const { user } = useContext(UserContext);
	return (
		<Menu>
			<Menu.ItemGroup>
				<div style={{ padding: "5px 20px" }}>
					<UserCard withAvatar noPadding user={user!} />
				</div>
			</Menu.ItemGroup>
			<Menu.Divider />
		</Menu>
	);
};
