import React, { Fragment } from "react";
import { AvatarMenu } from "./AvatarMenu";
import { ChannelsMenu } from "./ChannelsMenu";
import { LinkMenu } from "./LinkMenu";
import { QuickActions } from "./QuickActions";

export const HomeNav = () => {
	return (
		<Fragment>
			<AvatarMenu />
			<QuickActions />
			<LinkMenu />
		</Fragment>
	);
};

export const ChatNav = () => {
	return (
		<Fragment>
			<AvatarMenu />
			<ChannelsMenu />
		</Fragment>
	);
};

export const getSecondaryNav = (pathname: string) => {
	switch (pathname.split("/")[1]) {
		case "":
			return HomeNav;
		case "chat":
			return ChatNav;
		default:
			return HomeNav;
	}
};
