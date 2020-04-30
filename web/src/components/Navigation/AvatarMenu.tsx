import { Menu } from "antd";
import React from "react";
import { AvatarHeader } from "../shared/AvatarHeader";

export const AvatarMenu = () => {
	return (
		<Menu>
			<Menu.ItemGroup className="avatar-item-group">
				<div style={{ padding: "5px 20px" }}>
					<AvatarHeader withAvatar />
				</div>
			</Menu.ItemGroup>
			<Menu.Divider />
		</Menu>
	);
};
