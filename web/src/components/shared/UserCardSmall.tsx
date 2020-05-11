import { Tag } from "antd";
import React, { Fragment, useContext } from "react";
import { DrawerContext } from "../../utils/context";
import { ProfileCard } from "../Home/ProfileCard";
import { CommonDrawerTitle } from "./CommonDrawerTitle";

interface UserCardSmallProps {
	onlyName?: boolean;
	noPadding?: boolean;
	user: any;
	noNamePadding?: boolean;
}

export const UserCardSmall = (props: UserCardSmallProps) => {
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
			setChildDrawerComponent(<ProfileCard userId={props.user!.id} />);
		} else {
			setDrawerProps(drawerProps);
			setDrawerComponent(<ProfileCard userId={props.user!.id} />);
		}
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
						{props.user?.department.name}
					</Tag>
					<Tag color="gold" style={props.noPadding ? { padding: 0 } : {}}>
						{props.user?.role}
					</Tag>
				</div>
			)}
		</Fragment>
	);
};
