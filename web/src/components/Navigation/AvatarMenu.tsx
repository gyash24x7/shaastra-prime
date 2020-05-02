import { Menu } from "antd";
import React from "react";
import { UserCard } from "../shared/UserCard";

export const AvatarMenu = () => {
	return (
		<Menu>
			<Menu.ItemGroup>
				<div style={{ padding: "5px 20px" }}>
					<UserCard withAvatar />
				</div>
			</Menu.ItemGroup>
			<Menu.Divider />
		</Menu>
	);
};
