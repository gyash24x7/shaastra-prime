import { Tag } from "antd";
import React, { Fragment, useContext } from "react";
import { User } from "../../generated";
import { RecursivePartial } from "../../generated/types";
import { DrawerContext } from "../../utils/context";
import { ProfileCard } from "../Home/ProfileCard";

interface UserCardSmallProps {
	onlyName?: boolean;
	noPadding?: boolean;
	user: RecursivePartial<User>;
	noNamePadding?: boolean;
}

export const UserCardSmall = (props: UserCardSmallProps) => {
	const { toggleDrawer } = useContext(DrawerContext)!;

	const handleNameClick = () => {
		toggleDrawer({
			props: {
				className: "no-padding-drawer",
				width: 450,
				title: "User Profile"
			},
			component: <ProfileCard userId={props.user!.id!} />
		});
	};

	let className = !!props.noNamePadding
		? "user-details"
		: "user-details user-name";

	return (
		<Fragment>
			<div className={className} onClick={handleNameClick}>
				<Tag color="cyan">{props.user?.name}</Tag>
			</div>
			{!props.onlyName && (
				<div className="user-details">
					<Tag color="red" style={props.noPadding ? { padding: 0 } : {}}>
						{props.user?.department!.name}
					</Tag>
					<Tag color="gold" style={props.noPadding ? { padding: 0 } : {}}>
						{props.user?.role}
					</Tag>
				</div>
			)}
		</Fragment>
	);
};
