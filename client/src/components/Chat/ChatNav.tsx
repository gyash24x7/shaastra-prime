import { NavHeader } from "../Navigation/NavHeader";
import { LinkItem } from "../Navigation/LinkItem";
import GroupIcon from "@atlaskit/icon/glyph/people-group";
import React from "react";

export const ChatNav = {
	id : "chat",
	type : "container",
	getItems : () => [
		{
			type : "InlineComponent",
			id : "chat:header",
			component : NavHeader
		},
		{
			type : "MenuSection",
			id : "menu",
			items : [
				{
					type : "SectionHeading",
					id : "channel:header",
					text : "Channels"
				},
				{
					type : "InlineComponent",
					id : "channel",
					text : <div className="montserrat">Core Team</div>,
					to : "/chat/channel/1",
					component : LinkItem,
					before : GroupIcon
				}
			]
		}
	]
};
