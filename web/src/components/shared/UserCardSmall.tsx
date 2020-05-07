import { Tag } from "antd";
import React, { Fragment, useContext } from "react";
import { DrawerContext } from "../../utils/context";
import { ProfileCard } from "../Home/ProfileCard";
import { CommonDrawerTitle } from "./CommonDrawerTitle";

interface UserCardSmallProps {
	onlyName?: boolean;
	noPadding?: boolean;
	user: any;
}

export const UserCardSmall = ({
	onlyName,
	noPadding,
	user
}: UserCardSmallProps) => {
	const {
		setDrawerComponent,
		isDrawerOpen,
		setDrawerProps,
		setChildDrawerComponent,
		setChildDrawerProps
	} = useContext(DrawerContext)!;

	const handleNameClick = () => {
		const drawerProps = {
			className: "no-padding-drawer",
			width: 450,
			title: (
				<CommonDrawerTitle
					title="User Profile"
					onClose={() => {
						isDrawerOpen
							? setChildDrawerComponent(undefined)
							: setDrawerComponent(undefined);
					}}
				/>
			)
		};

		if (isDrawerOpen) {
			setChildDrawerProps(drawerProps);
			setChildDrawerComponent(<ProfileCard userId={user!.id} />);
		} else {
			setDrawerProps(drawerProps);
			setDrawerComponent(<ProfileCard userId={user!.id} />);
		}
	};

	return (
		<Fragment>
			<div className="user-details user-name" onClick={handleNameClick}>
				<Tag color="cyan">{user?.name}</Tag>
			</div>
			{!onlyName && (
				<div className="user-details">
					<Tag color="red" style={noPadding ? { padding: 0 } : {}}>
						{user?.department.name}
					</Tag>
					<Tag color="gold" style={noPadding ? { padding: 0 } : {}}>
						{user?.role}
					</Tag>
				</div>
			)}
		</Fragment>
	);
};
